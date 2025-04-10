import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoList from "./TodoList";

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <TodoList />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
