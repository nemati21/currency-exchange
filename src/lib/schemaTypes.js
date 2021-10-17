/* version 1.4 */

const general = {
  responseCode: {
    type: 'number',
    min: 1101,
    max: 1199,
    example: 1102,
  },
  msisdn: {
    type: 'string',
    pattern: '^9[0-9]{9}$',
    example: '9024499606',
  },
  email: {
    type: 'string',
    pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    example: 'test@example.com',
  },
  datetime: {
    type: 'string',
    pattern: '^[0-9]{4}-([0][0-9]|[1][0-2])-([0-2][0-9]|[3][0-1])T([0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9]$',
    example: '2020-01-01T00:00:00',
  },
  utcdatetime: {
    type: 'string',
    pattern: '^[0-9]{4}-([0][0-9]|[1][0-2])-([0-2][0-9]|[3][0-1])T([0-1][0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9].[0-9]{3}Z$',
    example: '2020-01-01T00:00:00.000Z',
  },
  uuid: {
    type: 'string',
    format: 'uuid',
    description: 'uuid',
  },
  nationalCode: {
    type: 'string',
    minLength: 10,
    maxLength: 10,
    pattern: '^[0-9]{10}$',
    example: '0070000001',
  },
  string: {
    type: 'string',
  },
  number: {
    type: 'number',
  },
  boolean: {
    type: 'boolean',
  },
  amount: {
    type: 'number',
    min: 0,
    example: 10000,
  },
};

general.swaggerErrorTypes = {
  500: {
    description: 'Internal exception happened',
    type: 'object',
    properties: {
      code: {
        type: 'number',
        min: 1101,
        max: 1199,
        example: 1001,
      },
      message: {
        type: 'string',
        example: 'Internal error',
      },
    },
  },
  400: {
    description: 'Request is rejected due to other issues',
    type: 'object',
    properties: {
      code: general.responseCode,
      message: general.string,
    },
  },
  404: {
    description: 'URL is not defined',
    type: 'object',
    properties: {
      code: {
        type: 'number',
        min: 1001,
        max: 1099,
        example: 1098,
      },
      message: {
        type: 'string',
        example: 'Not found',
      },
    },
  },
  406: {
    description: 'Request is rejected due to input validations or provider error',
    type: 'object',
    properties: {
      code: general.responseCode,
      message: general.string,
    },
  },
};

general.swagger204 = {
  204: {
    description: 'Successful response with no body',
    type: 'string',
    example: '',
  },
};

module.exports = general;
