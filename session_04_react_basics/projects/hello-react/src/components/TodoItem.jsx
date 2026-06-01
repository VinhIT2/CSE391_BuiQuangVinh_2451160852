function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
            <span 
                style={{ textDecoration: todo.done ? "line-through" : "none", cursor: "pointer" }}
                onClick={() => onToggle(todo.id)}
            >
                {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>Xóa</button>
        </div>
    );
}
export default TodoItem;