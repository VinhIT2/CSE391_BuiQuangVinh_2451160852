function TodoFilter({ filter, setFilter }) {
    return (
        <div style={{ margin: "10px 0" }}>
            <button onClick={() => setFilter("all")}>Tất cả</button>
            <button onClick={() => setFilter("active")}>Chưa xong</button>
            <button onClick={() => setFilter("completed")}>Đã xong</button>
        </div>
    );
}
export default TodoFilter;