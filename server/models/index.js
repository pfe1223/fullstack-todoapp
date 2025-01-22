const dbConfig = require('../config/db.js');
const Sequelize = require('sequelize');

const dbInstance = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false, // Disable the usage of Sequelize's legacy string-based operators (now deprecated) - TODO PATRICK - DO WE NEED THIS? ASK QA.

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.dbInstance = dbInstance;
db.todos = require('./todo.js')(dbInstance, Sequelize);

module.exports = db;