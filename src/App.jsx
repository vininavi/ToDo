import React, { useState } from "react";
import "./App.css";

const initialTodos = [
  { id: 1, task: "Sample Task", description: "This is a sample task", status: "not completed" },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!task || !description) return;

    const newTodo = {
      id: Date.now(),
      task,
      description,
      status: "not completed",
    };

    setTodos([...todos, newTodo]);
    setTask("");
    setDescription("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, description } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === "not completed" ? "completed" : "not completed" }
        : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.status === "completed";
    if (filter === "not completed") return todo.status === "not completed";
    return true;
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div>
        <label>Filter: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>

      <div className="todos">
        {filteredTodos.map((todo) => (
          <div className="card" key={todo.id}>
            <h3>{todo.task}</h3>
            <p>{todo.description}</p>
            <div>
              <button onClick={() => editTodo(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <select onChange={() => toggleStatus(todo.id)} value={todo.status}>
                <option value="not completed">Not Completed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
