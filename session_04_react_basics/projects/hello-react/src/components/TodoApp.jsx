import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("all");

    function addTodo() {
        if (inputValue.trim() === "") return;
        setTodos([...todos, { id: Date.now(), text: inputValue, done: false }]);
        setInputValue("");
    }

    function toggleTodo(id) {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }

    function deleteTodo(id) {
        setTodos(todos.filter(t => t.id !== id));
    }

    const filteredTodos = todos.filter(t => {
        if (filter === "active") return !t.done;
        if (filter === "completed") return t.done;
        return true;
    });

    return (
        <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>
            <h1>Todo List</h1>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={addTodo}>Thêm</button>
            <TodoFilter filter={filter} setFilter={setFilter} />
            {filteredTodos.map(t => (
                <TodoItem key={t.id} todo={t} onToggle={toggleTodo} onDelete={deleteTodo} />
            ))}
        </div>
    );
}
export default TodoApp;