export type Asset = {
  currency: { symbol: string; name: string };
  profitOrLoss: number;
  quantity: number;
};

export type Portfolio = {
  assets: Asset[];
};

export type TickerPair = {
  last?: string;
  quantity?: number;
  name?: string;
  balanceInLocalCurrency?: number;
  lastUpdated?: string;
};

export type TickerPairList = Record<string, TickerPair>;

export type AccountBalance = {
  rewards: number;
  totalInLocalCurrency: number;
};

export type RealtimeTrackerState = {
  isLoading: boolean;
  hasError: boolean;
};

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Accounts: undefined;
};
