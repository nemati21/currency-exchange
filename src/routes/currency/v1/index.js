const currencyCtrl = require('../../../services/currency-service');
const { schemaTypes } = require('../../../lib');

const swaggerTag = 'Currency Exchange Service';

const customTypes = {
  currencyType: {
    type: 'string',
    enum: ['USD', 'EUR'],
    example: 'USD',
  },
};

module.exports = (fastify, options, next) => {
  fastify.get('/currency', {
    schema: {
      description: 'Inquiry currency price based on parameters',
      tags: [swaggerTag],
      query: {
        type: 'object',
        properties: {
          symbol: schemaTypes.string,
          start: schemaTypes.number,
          size: schemaTypes.number,
          currencyType: customTypes.currencyType,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            pagination: {
              type: 'object',
              properties: {
                count: schemaTypes.number,
                page: schemaTypes.number,
                pages: schemaTypes.number,
              },
            },
            result: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  symbol: schemaTypes.string,
                  USDPrice: schemaTypes.amount,
                  IRRPrice: schemaTypes.amount,
                  createdts: schemaTypes.utcdatetime,
                  updatedts: schemaTypes.utcdatetime,
                },
              },
            },
          },
        },
      },
    },
  }, currencyCtrl.inquiry);

  fastify.put('/currency/price', {
    schema: {
      description: 'Insert or update the equivalent price of different types of currency in Iranian Rials (IRR)',
      tags: [swaggerTag],
      body: {
        type: 'object',
        required: ['currencyType', 'currencyPrice'],
        properties: {
          currencyType: customTypes.currencyType,
          currencyPrice: schemaTypes.amount,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        ...schemaTypes.swagger204,
      },
    },
  }, currencyCtrl.upsertCurrencyPrice);

  next();
};
