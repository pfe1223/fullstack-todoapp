const BASE_URL = 'http://localhost:8000/api/todos';

export const fetchTodos = async () => {
  const response = await fetch(BASE_URL);
  const todos = await response.json();
  return todos;
};

export const addTodo = async (title) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify({ title }),
  });

  const newTodo = await response.json();
  if (response.status === 400) {
     return null;
  }
  
  return newTodo;
};

export const updateTodo = async (id, title, completed) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed }),
  });
  
  const updatedTodo = await response.json();
  return updatedTodo.todo;
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return response;
};

export const removeCompletedTodos = async () => {
  await fetch(`${BASE_URL}/completed`, {
    method: 'PUT',
  });
};