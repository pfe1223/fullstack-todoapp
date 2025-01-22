const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// initialize Express.js web server
const app = express();

// define CORS options
var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse requests of Content-Type: application/json
app.use(bodyParser.json());

// parse requests of Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to your todoapp\'s Express.js web server.' });
});

const todos = require('./routes/todo');
const BASE_URL = '/api/todos';

app.get(BASE_URL, todos.retrieveAll);
app.post(BASE_URL, todos.create);
app.put(`${BASE_URL}/completed`, todos.clearCompleted);
app.put(`${BASE_URL}/:id`, todos.update);
app.delete(`${BASE_URL}/:id`, todos.remove);

// set backend port, set up server to listen for requests
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});