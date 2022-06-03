const { config } = require('dotenv');
const { DataSource } = require('typeorm');

config();

const datasource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrations: ['migrations/*.js'],
});

exports.postgres = datasource;
