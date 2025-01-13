Node/Express/PG tutorial
source - https://www.bezkoder.com/react-node-express-postgresql/
For more - https://bezkoder.com/node-express-sequelize-postgresql/

TODO NEIL:
Here's the paradigm - we're going to have a modular project.
We'll use the ORM as a paradigm.
But here are your other options.
The details aren't as important but here are the major concepts you should internalize.

TODO NEIL:
If you're interested in taking this project further, you can do THIS or you can do THIS to augment your todo list!
- File system

===

CREATE THE PROJECT
INITIALIZE NPM

`package.json` contains the project's name, description, and other metadata that is automatically generated when you type `npm init`. This `TodoApp` project, written in React, already has an existing `package.json`. We will spend a little bit of time in this module installing more packages so that in the next module on Express.js, we can also create Node.js web server.

INSTALL THE PACKAGES...
NOTE TO NEIL - I reviewed README.md and it will need review after the folder structure of the project is finalized.


===

https://github.com/codio-content/web-dev-coursera-2022/blob/main/3.%20Restful%20MVC/3/2.md

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/todo');

mongoose.connect('mongodb://localhost:27017/todomvc_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const BASE_API_ROUTE = '/api/todos';

// add todo
app.post(BASE_API_ROUTE, async (req, res) => {
    const { id, title } = req.body;
    const todo = new Todo({ id, title });
    await todo.save();
    console.log('todo', todo);
    res.json(todo);
});

// get all todos
app.get(BASE_API_ROUTE, async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// edit todo
app.put(`${BASE_API_ROUTE}/:id`, async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const todo = await Todo.findOneAndUpdate({ id }, { $set: { title }});
    // const todos = await Todo.find();
    // console.log('todo', todo);
    if (!todo) {
        res.status(404).send('Todo not found');
    } else {
        todo.title = title;
        await todo.save();
        res.json(todo);
    }
});

app.delete(`${BASE_API_ROUTE}/:id`, async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete(id);

    if (!todo) {
        res.status(404).send('Todo not found');
    } else {
        res.json(todo);
    }
});

app.listen(3000, function () {
    console.log('Todo App listening on port 3000!');
});

TODO NEIL: Put this somewhere in here.
5. Error Handling Middleware in Express.js
In Express, error-handling middleware allows centralized management of errors:
javascript
Copy code
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
By calling next(err), you can pass errors to the middleware for handling in a consistent way.

===

```bash
npm install express pg cors body-parser
```

express: The web server framework.
pg: PostgreSQL client for Node.js.
cors: Middleware to allow cross-origin requests from your frontend.
body-parser: Middleware to parse incoming request bodies in JSON format.

```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
);
```

```bash
node server.js
```