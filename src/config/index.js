const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

['NODE_ENV', 'PORT', 'MONGO_URL', 'MONGO_USERNAME', 'MONGO_PASSWORD', 'MONGO_DB_NAME', 'LOG_FILE', 'LOG_LEVEL', 'BINANCE_BASE_URL', 'PROXY_URL', 'INTERVAL_TIME'].forEach((name) => {
  if (Object.keys(process.env).indexOf(name) < 0) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV.toLowerCase(),
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    file: path.join(__dirname, '..', (process.env.LOG_FILE || './service.log')),
  },
  services: {
    binance: {
      priceUrl: `${process.env.BINANCE_BASE_URL}/fapi/v1/premiumIndex`,
    },
  },
  intervalTime: Number(process.env.INTERVAL_TIME),
  proxy: process.env.PROXY_URL || null,
  documentation: {
    swagger: {
      info: {
        title: 'Currency Service Swagger',
        description: 'Currency Service Documentation',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  },
  server: {
    port: Number(process.env.PORT),
  },
  db: {
    url: process.env.MONGO_URL,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    name: process.env.MONGO_DB_NAME,
  },
};

module.exports = config;
