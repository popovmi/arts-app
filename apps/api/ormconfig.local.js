const { config } = require('dotenv');
const path = require('path');

config();

module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['apps/api/src/modules/**/*.entity.ts'],
    migrations: ['apps/api/migrations/*.js'],
    cli: {
        entitiesDir: 'apps/api/src/modules/**/*',
        migrationsDir: 'apps/api/migrations',
    },
};
