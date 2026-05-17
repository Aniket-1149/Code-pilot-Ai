const mongoose = require('mongoose');
const { logger } = require('./logger');

let isConnected = false;

async function connectDatabase() {
  if (isConnected) return mongoose.connection;

  mongoose.set('strictQuery', true);

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');

  await mongoose.connect(uri);
  isConnected = true;

  mongoose.connection.on('connected', () => logger.info('Mongo connected'));
  mongoose.connection.on('error', (err) => logger.error('Mongo error', err));

  return mongoose.connection;
}

module.exports = { connectDatabase };
