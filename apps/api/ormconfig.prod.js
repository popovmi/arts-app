const { config } = require('dotenv');
const path = require('path');

config();

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};
