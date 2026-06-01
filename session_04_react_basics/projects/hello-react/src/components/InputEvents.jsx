import { useState } from "react";

function InputEvents() {
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", margin: "10px 0" }}>
            <h2>Bài 5.2 — Input Events</h2>
            
            <input placeholder="Nhập email..." onChange={(e) => setEmail(e.target.value)} />
            <p style={{ color: email.includes("@") ? "green" : "red" }}>{email.includes("@") ? "✓ Hợp lệ" : "✗ Thiếu @"}</p>

            <textarea placeholder="Nhập văn bản..." onChange={(e) => setText(e.target.value)} />
            <p>Số từ: {wordCount}</p>
            <p>Preview: {text}</p>
        </div>
    );
}
export default InputEvents;