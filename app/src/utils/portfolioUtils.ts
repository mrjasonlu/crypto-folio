import { Portfolio, TickerPairList } from '@src/common/types';
import currency from 'currency.js';

export const FIAT_LIST = ['AUD', 'USD'];

export const calculateTotalAssetBalance = (
  tickerPairList?: TickerPairList,
  errorCallBack?: () => void,
) => {
  const assets = tickerPairList ? Object.keys(tickerPairList) : [];

  if (!tickerPairList || !assets.length) {
    return;
  }

  if (assets.some(symbol => !tickerPairList[symbol].lastUpdated)) {
    errorCallBack?.();
    return;
  }

  const total = assets.reduce((acc, symbol) => {
    return currency(acc).add(
      tickerPairList[symbol].balanceInLocalCurrency as number,
    ).value;
  }, 0);
  return total;
};

export const getSymbolFromTickerPair = (ticker: string, currency: string) => {
  const symbol = ticker.match(new RegExp('ticker:' + '(.*)' + currency));
  if (symbol && symbol.length > 1) {
    return symbol[1];
  }
  return;
};

export const replaceBalanceWithAsterisk = (balance?: number | string) => {
  return balance?.toString().replace(/./g, '*');
};
