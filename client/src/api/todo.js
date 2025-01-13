// import { create, retrieveAll, update, remove, removeCompleted } from '../routes/todo';
// import { BASE_URL } from '../../server/server';

const BASE_URL = 'http://localhost:8805/api/todos';

export const fetchTodos = async () => {
  const response = await fetch(BASE_URL);
  const todos = await response.json();
  return todos;
};

export const addTodo = async (title) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    // headers: { TODO PATRICK: I don't think we need this, but it's here just in case.
    //   'Content-Type': 'application/json',
    // },
    body: JSON.stringify({ title }),
  });

  const newTodo = await response.json();
  if (response.status === 400) {
     return null;
  }
  
  return newTodo;
};

export const updateTodo = async (id, title, completed) => {
  console.log('updateTodo', id, title, completed);
  // return [];
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed }),
  });
  const updatedTodo = await response.json();
  console.log('updatedTodo', updatedTodo);
  return updatedTodo.todo;
};

export const deleteTodo = async (id) => {
  // return false;
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return response;
};

export const removeCompletedTodos = async () => {
  // return false;
  await fetch(`${BASE_URL}/completed`, {
    method: 'PUT',
  });
};