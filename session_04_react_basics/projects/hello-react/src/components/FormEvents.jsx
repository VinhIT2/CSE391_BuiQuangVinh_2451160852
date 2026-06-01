import { useState } from "react";

function FormEvents() {
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", margin: "10px 0" }}>
            <h2>Bài 5.4 — Form Events</h2>
            <input type="password" placeholder="Mật khẩu" onChange={(e) => setPass(e.target.value)} />
            <input type="password" placeholder="Xác nhận" onChange={(e) => setConfirm(e.target.value)} />
            {pass !== confirm && <p style={{ color: "red" }}>Mật khẩu không khớp!</p>}
        </div>
    );
}
export default FormEvents;