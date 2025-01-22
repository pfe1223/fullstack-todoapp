module.exports = {
    HOST: 'localhost',
    USER: 'neilthawani',
    PASSWORD: 'password',
    DB: 'neilthawani',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
