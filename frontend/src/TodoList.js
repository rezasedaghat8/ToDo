import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (error) {
      toast.error("Failed to fetch todos.");
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const res = await createTodo({ title: newTodo, completed: false });
      setTodos([...todos, res.data]);
      setNewTodo("");
      toast.success("Todo added successfully!");
    } catch (error) {
      toast.error("Failed to add todo.");
    }
  };

  const handleUpdateTitle = async (id) => {
    try {
      await updateTodo(id, { title: editText });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: editText } : todo
        )
      );
      setEditingId(null);
      setEditText("");
      toast.success("Todo updated!");
    } catch (error) {
      toast.error("Failed to update todo.");
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
   
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todoToDelete);
      setTodos(todos.filter((todo) => todo.id !== todoToDelete));
      toast.success("Todo deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete todo.");
    } finally {
      setShowConfirm(false);
      setTodoToDelete(null);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-900"
      } min-h-screen p-4 transition-colors duration-300`}
    >
      <div className="max-w-xl mx-auto p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">🌟 Todo App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow px-3 py-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded"
            >
              <div className="flex items-center gap-3 w-full">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id, todo.completed)}
                  className="form-checkbox h-5 w-5 text-green-500"
                />
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-grow px-2 py-1 rounded text-gray-900 dark:text-white bg-white dark:bg-gray-600"
                  />
                ) : (
                  <span
                    className={`flex-grow text-gray-200 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                {editingId === todo.id ? (
                  <button
                    onClick={() => handleUpdateTitle(todo.id)}
                    className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditText(todo.title);
                    }}
                    className="text-sm px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowConfirm(true);
                    setTodoToDelete(todo.id);
                  }}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Delete Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-sm w-full text-center">
              <p className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Are you sure you want to delete this todo?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
