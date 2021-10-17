const { MongoClient } = require('mongodb');

const config = require('./config');

// Connect to MongoDB
const url = `mongodb://${config.db.username}:${config.db.password}@${config.db.url}`;
const client = new MongoClient(url);

const db = client.db(config.db.name);

module.exports = {
  client,
  db,
};