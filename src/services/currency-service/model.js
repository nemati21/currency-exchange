const { db } = require('../../database');

const create = async (currency) => {
  await db.collection('currency').insertOne({
    symbol: currency.symbol,
    USDPrice: currency.markPrice,
    createdts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
    updatedts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
  });

  return true;
};

const find = async (symbol) => {
  let currency = null;

  try {
    currency = await db.collection('currency').findOne({ symbol }, { projection: { _id: 0 } });
  } catch (err) {
    currency = null;
  }

  return currency;
};

const query = async (symbol, start = 0, size = 10) => {
  let count = 0;
  let result = null;

  try {
    if (symbol) {
      result = await db.collection('currency').find({ symbol: { $regex: `${symbol}.*` } }, { projection: { _id: 0 } })
        .skip(((start + 1) * size) - size)
        .limit(size)
        .toArray();
      count = await db.collection('currency').find({ symbol: { $regex: `${symbol}.*` } }).count();
    } else {
      result = await db.collection('currency').find({}, { projection: { _id: 0 } })
        .skip(((start + 1) * size) - size)
        .limit(size)
        .toArray();
      count = await db.collection('currency').find({}).count();
    }
  } catch (err) {
    count = 0;
    result = null;
  }

  return { count, page: start + 1, pages: Math.ceil(count / size), result };
};

const update = async (symbol, currency) => {
  const now = new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString();

  await db.collection('currency').updateOne({ symbol },
    {
      $set:
      {
        USDPrice: currency.markPrice,
        updatedts: now,
      },
    });

  return true;
};

const upsertCurrencyPrice = async (currencyType, currencyPrice) => {
  const now = new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString();

  await db.collection('prices').updateOne({ type: currencyType },
    {
      $set:
      {
        type: currencyType,
        price: currencyPrice,
        createdts: now,
        updatedts: now,
      },
    }, { upsert: true });

  return true;
};

const findCurrency = async (currencyType = 'USD') => {
  let price = null;

  try {
    price = await db.collection('prices').findOne({ type: currencyType }, { projection: { _id: 0 } });
  } catch (err) {
    price = null;
  }

  return price;
};

module.exports = {
  create,
  find,
  query,
  update,
  upsertCurrencyPrice,
  findCurrency,
};
