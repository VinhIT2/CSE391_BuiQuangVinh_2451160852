import { useState } from "react";

function NumberState() {
    const [count, setCount] = useState(0);
    
    // Tính toán trạng thái dựa vào count (Thử thách 2)
    let checkNumber = "Số bằng 0";
    if (count > 0) checkNumber = "Số dương";
    if (count < 0) checkNumber = "Số âm";

    // Thay đổi màu sắc chữ (Thử thách 3)
    let countColor = "black";
    if (count > 0) countColor = "green";
    if (count < 0) countColor = "red";

    return (
        <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}>
            <h2>Bài 4.1 — Bộ đếm: <span style={{ color: countColor }}>{count}</span></h2>
            <p>Trạng thái: <strong>{checkNumber}</strong></p>
            
            <button type="button" onClick={() => setCount(count + 1)}>Tăng (+1)</button>
            <button type="button" onClick={() => setCount(count - 1)} style={{ marginLeft: "5px" }}>Giảm (-1)</button>
            <button type="button" onClick={() => setCount(0)} style={{ marginLeft: "5px" }}>Reset</button>
            <button type="button" onClick={() => setCount(count * 2)} style={{ marginLeft: "5px" }}>Nhân đôi</button>
            
            {/* Thử thách 1 */}
            <button type="button" onClick={() => setCount(count + 5)} style={{ marginLeft: "5px", background: "#3498db", color: "white" }}>
                Tăng (+5)
            </button>
        </div>
    );
}

export default NumberState;