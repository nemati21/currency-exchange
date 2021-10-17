/* eslint-disable no-param-reassign */
const axios = require('axios').default;

const model = require('./model');
const customErrors = require('../../custom-errors');
const config = require('../../config');

// Fetch data (currency symbole, price, etc) using Binance API
const priceInquiry = async () => {
  let result = null;

  try {
    result = await axios.get(config.services.binance.priceUrl);
    result = result.data.filter((p) => p.symbol.substring(p.symbol.length - 4) === 'USDT');
  } catch (err) {
    result = null;
  }

  return result;
};

// Insert currency data in the database
const create = async (currencyList) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const currency of currencyList) {
    const existedCurrency = await model.find(currency.symbol);

    if (!existedCurrency) await model.create(currency);
  }
};

// Update currency data in the database
const update = async (currencyList) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const currency of currencyList) {
    const existedCurrency = await model.find(currency.symbol);

    if (existedCurrency && currency.symbol === existedCurrency.symbol && currency.markPrice !== existedCurrency.USDPrice) {
      await model.update(currency.symbol, currency);
    }
  }
};

// Query on the Binance data (that store in database) based on parameters
const inquiry = async (symbol, start, size, currencyType) => {
  const currencyList = await model.query(symbol, start, size);

  if (currencyList.count) {
    const { result } = currencyList;
    const currency = await model.findCurrency(currencyType);
    if (!currency) throw new customErrors.CurrencyNotFoundError();

    result.forEach((item) => {
      item.IRRPrice = currency.price * parseFloat(item.USDPrice).toFixed(4);
      item.USDPrice = parseFloat(item.USDPrice).toFixed(4);
    });
  }

  return currencyList;
};

// Find a currency based on symbol
const find = async (symbol) => {
  const currency = await model.find(symbol);
  return currency;
};

// Step 2: Insert or Update currency data in the database(use as API)
const upsert = async () => {
  const currencyList = await priceInquiry();

  // eslint-disable-next-line no-restricted-syntax
  for (const currency of currencyList) {
    const existedCurrency = await find(currency.symbol);

    if (existedCurrency && currency.symbol === existedCurrency.symbol && currency.markPrice !== existedCurrency.USDPrice) {
      await model.update(currency.symbol, currency);
    } else if (!existedCurrency) {
      await model.create(currency);
    }
  }
  return true;
};

// Insert or update the equivalent price of different types of currency in Iranian Rials (IRR)
const upsertCurrencyPrice = async (currencyType, currencyPrice) => {
  await model.upsertCurrencyPrice(currencyType, currencyPrice);
  return true;
};

// Find a currency based on type
const findCurrency = async (currencyType) => {
  const currency = await model.findCurrency(currencyType);
  if (!currency) throw new customErrors.CurrencyNotFoundError();

  return currency;
};

module.exports = {
  priceInquiry,
  create,
  update,
  inquiry,
  find,
  upsert,
  upsertCurrencyPrice,
  findCurrency,
};
