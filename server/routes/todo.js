const { Pool } = require('pg');

// Setup Postgres connection pool
const pool = new Pool({
    user: 'neilthawani',
    host: 'localhost',
    database: 'neilthawani',
    password: 'password',
    port: 5432,
});

const db = require('../models');
const Todo = db.todos

module.exports = {
    create(req, res) {

    },
    retrieveAll(req, res) {
        res.send([
            {
                'id': 1,
                'title': 'Do dishes',
                'description': 'All except pots and pans',
                'completed': false
            },
            {
                'id': 2,
                'title': 'Sweep the floors',
                'description': '',
                'completed': true
            },
            {
                'id': 3,
                'title': 'Mop the floors',
                'description': '',
                'completed': false
            }
        ]);
    },
    update(req, res) {

    },
    remove(req, res) {

    },
    clearCompleted(req, res) {

    }
};