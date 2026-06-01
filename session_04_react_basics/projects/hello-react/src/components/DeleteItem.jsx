import { useState } from "react";

function DeleteItem() {
    const [items, setItems] = useState([{id: 1, name: "Minh"}, {id: 2, name: "An"}]);
    const [deletedItem, setDeletedItem] = useState(null);

    const handleDelete = (id, name) => {
        if (!window.confirm(`Xóa ${name}?`)) return;
        setDeletedItem({ id, name });
        setItems(items.filter(i => i.id !== id));
        setTimeout(() => setDeletedItem(null), 5000);
    };

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd" }}>
            <h2>Xóa sinh viên</h2>
            {items.map(i => (
                <div key={i.id}>{i.name} <button onClick={() => handleDelete(i.id, i.name)}>Xóa</button></div>
            ))}
            {deletedItem && (
                <p>Đã xóa {deletedItem.name}. <button onClick={() => setItems([...items, deletedItem])}>Hoàn tác</button></p>
            )}
        </div>
    );
}
export default DeleteItem;