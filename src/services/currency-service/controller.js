const service = require('./service');
const customErrors = require('../../custom-errors');

const inquiry = async (req, res) => {
  const { symbol, start, size, currencyType } = req.query;

  const currencyList = await service.inquiry(symbol, start, size, currencyType);

  return res.send({ pagination: { count: currencyList.count || 0, page: currencyList.page || 1, pages: currencyList.pages || 0 }, result: currencyList.result || [] });
};

const upsertCurrencyPrice = async (req, res) => {
  const { currencyType, currencyPrice } = req.body;

  if (currencyPrice < 0 || currencyPrice > 1000000) throw new customErrors.InvalidCurrencyPriceError();

  await service.upsertCurrencyPrice(currencyType, currencyPrice);

  res.code(204).send('');
};

module.exports = {
  inquiry,
  upsertCurrencyPrice,
};
