// mock exchange rate API call
export const exchangeRateApi = async (
  amount: number,
  currencyFrom: string,
  currencyTo: string,
) => {
  // mocking USD to AUD exchange api
  return currencyFrom === 'USD' && currencyTo === 'AUD' ? 1.57 : 1;
};
