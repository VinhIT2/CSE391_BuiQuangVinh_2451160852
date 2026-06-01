import { useState, useRef } from "react";

function CreateItem() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");
    const inputRef = useRef(null);

    function handleAdd() {
        if (!name.trim()) return alert("Vui lòng nhập tên!");
        setItems([...items, { id: Date.now(), name }]);
        setName("");
        setMsg("Đã thêm thành công!");
        inputRef.current.focus();
        setTimeout(() => setMsg(""), 2000);
    }

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd" }}>
            <h2>Thêm môn học</h2>
            <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
            <button onClick={handleAdd}>Thêm</button>
            <p style={{ color: "green" }}>{msg}</p>
            {items.map(i => <div key={i.id}>{i.name}</div>)}
        </div>
    );
}
export default CreateItem;