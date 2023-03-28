import 'dotenv/config.js';
import { Sequelize, Dialect } from 'sequelize';

enum SequelizeDialects {
    postgres = 'postgres',
}

const database = process.env.PG_DATABASE ?? 'my_database';
const user = process.env.PG_USER ?? 'root';
const password = process.env.PG_PASSWORD ?? 'password';
const host = process.env.PG_HOST ?? 'localhost';
const port = parseInt(process.env.PG_PORT ?? '1433');
const dialect = process.env.PG_DIALECT as Dialect || SequelizeDialects.postgres;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: dialect,
    dialectOptions: {},
    pool: {
        max: 10,
        min: 0,
        idle: 200000,
        acquire: 1000000,
    },
    logging: console.log,
});

export default sequelize;
