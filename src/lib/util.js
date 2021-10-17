const { db } = require('../database');
const service = require('../services/currency-service/service');
const config = require('../config');

const autoUpdatePrices = async () => {
  const currencyCount = await db.collection('currency').find({}).count();

  if (currencyCount) {
    setInterval(async () => {
      const result = await service.priceInquiry();
      if (result) await service.update(result);
    }, config.intervalTime);
  } else {
    const result = await service.priceInquiry();
    if (result) await service.create(result);
  }
};


module.exports = {
  autoUpdatePrices,
};