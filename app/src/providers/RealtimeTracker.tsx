import { useEffect, useContext } from 'react';
import currency from 'currency.js';

import { AccountSettingsContext } from '@src/contexts/AccountSettingsContext';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import { EXCHANGE_API } from '@src/config/settings';
import { useQueryClient } from '@tanstack/react-query';
import {
  Portfolio,
  TickerPairList,
  AccountBalance,
  RealtimeTrackerState,
} from '@src/common/types';
import {
  getSymbolFromTickerPair,
  FIAT_LIST,
  calculateTotalAssetBalance,
} from '@src/utils/portfolioUtils';
import { exchangeRateApi } from '@src/services/exchangeRateApi';

type RealtimeTrackerProps = {
  children?: React.ReactNode;
};

type Data = {
  portfolio: Portfolio;
  rewards: number;
};

export const AccountBalanceQueryKey = ['AccountBalance'];
export const PortfolioQueryKey = ['PortfolioQueryKey'];
export const ExchangeRateQueryKey = ['ExchangeRateQueryKey'];
export const RealTimeTrackerStateQueryKey = ['RealTimeTrackerStateQueryKey'];

const HEARTBEAT_DURATION = 40000;
const EXCHANGE_RATE_STALE_TIME = 35000;

const query = graphql`
  query RealtimeTrackerQuery {
    rewards
    portfolio {
      assets {
        quantity
        profitOrLoss
        currency {
          symbol
          name
        }
      }
    }
  }
`;

export default function RealTimeTracker({ children }: RealtimeTrackerProps) {
  const { data, error, retry, isLoading } = useQuery(query);
  const { state } = useContext(AccountSettingsContext) || {};
  const queryClient = useQueryClient();

  if (isLoading) {
    queryClient.setQueryData(RealTimeTrackerStateQueryKey, () => ({
      isLoading: true,
      hasError: false,
    }));
  }

  if (error) {
    queryClient.setQueryData(RealTimeTrackerStateQueryKey, () => ({
      isLoading: false,
      hasError: true,
    }));
  }

  const subscribeToTickerPair = (pair: string, websocket?: WebSocket) => {
    websocket?.send(
      JSON.stringify({
        topic: `ticker:${pair}`,
        event: 'phx_join',
        payload: {},
        ref: 0,
      }),
    );
  };

  const calculateUpdatedExchangeRates = async (portfolio: Portfolio) => {
    const fiatAssets = portfolio.assets.filter(asset =>
      FIAT_LIST.includes(asset.currency.symbol),
    );

    try {
      await Promise.all(
        fiatAssets.map(async ({ currency: { symbol, name }, quantity }) => {
          const exchangeRate = await queryClient.fetchQuery({
            queryKey: [
              ...ExchangeRateQueryKey,
              quantity,
              symbol,
              state!.currency,
            ],
            queryFn: () => exchangeRateApi(quantity, symbol, state!.currency),
            staleTime: EXCHANGE_RATE_STALE_TIME,
          });

          queryClient.setQueryData(
            PortfolioQueryKey,
            (prevData: TickerPairList = {}) => {
              const newData = {
                ...prevData,
                [symbol]: {
                  name,
                  quantity,
                  last: exchangeRate.toString(),
                  balanceInLocalCurrency:
                    currency(quantity).multiply(exchangeRate).value,
                  lastUpdated: new Date().toISOString(),
                },
              };
              return newData;
            },
          );
        }),
      );
    } catch (e) {
      queryClient.setQueryData(RealTimeTrackerStateQueryKey, () => ({
        isLoading: false,
        hasError: true,
      }));
    }
    return;
  };

  const updateTotalBalance = (portfolio?: TickerPairList) => {
    const totalInLocalCurrency = calculateTotalAssetBalance(portfolio);

    if (totalInLocalCurrency !== undefined) {
      queryClient.setQueryData(
        AccountBalanceQueryKey,
        (prevData: AccountBalance) => ({
          ...prevData,
          totalInLocalCurrency,
        }),
      );
    }
  };

  useEffect(() => {
    let websocket: WebSocket | undefined;
    let heartbeat: ReturnType<typeof setTimeout> | undefined;

    if (data) {
      const { portfolio, rewards } = data as Data;

      queryClient.setQueryData(
        AccountBalanceQueryKey,
        (prevData: AccountBalance) => ({
          ...prevData,
          rewards,
        }),
      );

      websocket = new WebSocket(EXCHANGE_API);

      heartbeat = setInterval(async () => {
        websocket?.send(
          JSON.stringify({
            topic: 'phoenix',
            event: 'heartbeat',
            payload: {},
            ref: 0,
          }),
        );

        // get updated currency exchange rates as websockets do not have fiat pairs
        await calculateUpdatedExchangeRates(portfolio);
        updateTotalBalance(queryClient.getQueryData(PortfolioQueryKey));
      }, HEARTBEAT_DURATION);

      websocket.onopen = () => {
        const portfolioState = portfolio.assets.reduce(
          (acc, { currency: { symbol } }) => {
            acc[symbol] = {};
            return acc;
          },
          {} as TickerPairList,
        );

        queryClient.setQueryData(PortfolioQueryKey, () => ({
          ...portfolioState,
        }));
        calculateUpdatedExchangeRates(portfolio);
        portfolio.assets.forEach(({ currency: { symbol }, quantity }) => {
          if (!FIAT_LIST.includes(symbol)) {
            subscribeToTickerPair(`${symbol}${state?.currency}`, websocket);
          }
        });

        queryClient.setQueryData(
          RealTimeTrackerStateQueryKey,
          (prevData: RealtimeTrackerState) => ({
            ...prevData,
            isLoading: false,
          }),
        );
      };

      websocket.onmessage = event => {
        const data = JSON.parse(event.data);
        if (data.event === 'init' || data.event === 'update') {
          const symbol = getSymbolFromTickerPair(data.topic, state!.currency);
          if (symbol) {
            const asset = portfolio.assets.find(
              asset => asset.currency.symbol === symbol,
            );
            queryClient.setQueryData(
              PortfolioQueryKey,
              (prevData: TickerPairList = {}) => {
                const newData = {
                  ...prevData,
                  [symbol]: {
                    quantity: asset?.quantity,
                    name: asset?.currency.name,
                    last: data.payload.last,
                    balanceInLocalCurrency:
                      asset && asset.quantity
                        ? currency(data.payload.last).multiply(asset.quantity)
                            .value
                        : 0,
                    lastUpdated: data.payload.current_time,
                  },
                };
                return newData;
              },
            );

            updateTotalBalance(queryClient.getQueryData(PortfolioQueryKey));
          }
        }
      };

      websocket.onerror = event => {
        queryClient.setQueryData(RealTimeTrackerStateQueryKey, () => ({
          isLoading: false,
          hasError: true,
        }));
      };
    }

    return () => {
      websocket && websocket.close();
      clearInterval(heartbeat);
    };
  }, [data]);

  return children;
}
