import { useState } from "react";

function ListBasics() {
    const [students] = useState([
        { id: 1, name: "Minh", age: 20 },
        { id: 2, name: "An", age: 21 },
        { id: 3, name: "Linh", age: 19 }
    ]);
    
    const avgAge = (students.reduce((sum, s) => sum + s.age, 0) / students.length).toFixed(1);

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", margin: "10px 0" }}>
            <h2>Danh sách sinh viên (Trung bình: {avgAge})</h2>
            {students.map((s, index) => (
                <div key={s.id} style={{ color: s.age >= 20 ? "green" : "black" }}>
                    {index + 1}. {s.name} - {s.age} tuổi
                </div>
            ))}
        </div>
    );
}
export default ListBasics;