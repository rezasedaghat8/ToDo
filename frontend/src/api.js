import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/todos/";

// Fetch all todos
export const getTodos = () => axios.get(BASE_URL);

// Create a new todo
export const createTodo = (todo) => axios.post(BASE_URL, todo);

// Update a todo by ID
export const updateTodo = (id, updatedTodo) =>
  axios.patch(`${BASE_URL}${id}/`, updatedTodo);

// Delete a todo by ID
export const deleteTodo = (id) => axios.delete(`${BASE_URL}${id}/`);
