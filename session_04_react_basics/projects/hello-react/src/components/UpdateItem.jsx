import { useState } from "react";

function UpdateItem() {
    const [items, setItems] = useState([{ id: 1, name: "Minh", age: 20 }]);
    const [edit, setEdit] = useState(null);

    const save = (id, name, age) => {
        if (!name) return;
        setItems(items.map(i => i.id === id ? { ...i, name, age } : i));
        setEdit(null);
        alert("Đã lưu!");
    };

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd" }}>
            {items.map(i => edit === i.id ? (
                <div key={i.id}>
                    <input defaultValue={i.name} onBlur={(e) => save(i.id, e.target.value, i.age)} autoFocus />
                </div>
            ) : (
                <div key={i.id} onClick={() => setEdit(i.id)} style={{ cursor: "pointer", background: "#f0f0f0" }}>
                    {i.name} (Click để sửa)
                </div>
            ))}
        </div>
    );
}
export default UpdateItem;