import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo, removeCompletedTodos } from '../api/todo'; // import the API helpers

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [editedTodo, setEditedTodo] = useState(null);
    
    const loadTodos = async () => {
        const todos = await fetchTodos();
        // console.log('TodoApp::useEffect todos', todos);
        setTodos(todos);
    };

    // Load todos from the server
    useEffect(() => {
        // loadTodos();
    }, []);

    const handleAddTodo = async () => {
        if (newTodoTitle.trim()) {
            const newTodo = await addTodo(newTodoTitle.trim());
            // console.log('handleAddTodo retrieved newTodo', newTodo);

            if (newTodo) {
                setTodos([...todos, newTodo]);
            }

            setNewTodoTitle('');
        }
    };

    const handleToggleTodo = async (todo) => {
        console.log('handleToggleTodo', todo);
        // const updatedTodo = 
        await updateTodo(todo.id, todo.title, !todo.completed);
        // console.log('updatedTodo is now', updatedTodo);
        // const newTodos = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
        // setTodos(newTodos);
        loadTodos();
    };

    const handleEditTodo = async (todo, newTitle) => {
        console.log('handleEditTodo', todo, newTitle);
        if (newTitle.trim()) {
            const updatedTodo = await updateTodo(todo.id, newTitle, todo.completed);
            console.log('updatedTodo is now', updatedTodo);
            // setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
            setEditedTodo(null); // Exit editing mode
        }
        loadTodos();
    };

    const handleDeleteTodo = async (id) => {
        console.log('handleDeleteTodo', id);
        await deleteTodo(id);
        loadTodos();
        // setTodos(todos.filter((t) => t.id !== id));
    };

    const handleRemoveCompletedTodos = async () => {
        await removeCompletedTodos();
        // setTodos(todos.filter((t) => !t.completed));
        loadTodos();
    };

    // console.log('TodoApp todos', todos);

    return (
        <div className="todoapp">
            <header>
                <h1>Todos</h1>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    onKeyUp={(e) => (e.key === 'Enter' ? handleAddTodo() : null)}
                    placeholder="What needs to be done?"
                />
            </header>
            <ul>
                {todos?.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo)}
                        />
                        {editedTodo?.id === todo.id ? (
                            // Inline editing mode
                            <input
                                type="text"
                                value={editedTodo.title}
                                onChange={(e) =>
                                    setEditedTodo({ ...editedTodo, title: e.target.value })
                                }
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') handleEditTodo(editedTodo, editedTodo.title);
                                }}
                                onBlur={() => handleEditTodo(editedTodo, editedTodo.title)}
                            />
                        ) : (
                            <span onDoubleClick={() => setEditedTodo(todo)}>
                                {todo.title}
                            </span>
                        )}
                        <div>
                            {editedTodo?.id !== todo.id ? 
                            <button onClick={() => setEditedTodo(todo)}>Edit</button>
                            : ''}
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <footer>
                <button onClick={handleRemoveCompletedTodos}>Clear completed</button>
            </footer>
        </div>
    );
};

export default TodoApp;
