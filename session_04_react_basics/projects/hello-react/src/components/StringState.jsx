import { useState } from "react";

function StringState() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // Thử thách 3: State cho mật khẩu và ẩn/hiện
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    // Thử thách 2: Kiểm tra email hợp lệ chứa "@"
    const isEmailValid = email.includes("@");

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}>
            <h2>Bài 4.2 — Nhập thông tin</h2>
            
            <div style={{ marginBottom: "10px" }}>
                <label>Tên: </label>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên..."
                    maxLength={100}
                />
                {/* Thử thách 1: Hiển thị độ dài kí tự X/100 */}
                <span style={{ marginLeft: "10px", fontSize: "12px", color: "#666" }}>
                    {name.length}/100
                </span>
            </div>
            
            <div style={{ marginBottom: "10px" }}>
                <label>Email: </label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email..."
                />
                {/* Thử thách 2: Hiển thị check email */}
                {email && (
                    <span style={{ marginLeft: "10px", fontSize: "13px", color: isEmailValid ? "green" : "red" }}>
                        {isEmailValid ? "✓ Email hợp lệ" : "✗ Email không hợp lệ (thiếu @)"}
                    </span>
                )}
            </div>

            {/* Thử thách 3: Ô nhập mật khẩu */}
            <div style={{ marginBottom: "10px" }}>
                <label>Mật khẩu: </label>
                <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: "5px" }}>
                    {showPassword ? "Ẩn" : "Hiện"}
                </button>
            </div>
            
            <h3>Thông tin đã nhập:</h3>
            <p>Tên: {name || "(chưa nhập)"}</p>
            <p>Email: {email || "(chưa nhập)"}</p>
            
            {name && (
                <p style={{ background: "#f0f0f0", padding: "10px" }}>
                    Xin chào <strong>{name}</strong>! Email của bạn là {email}
                </p>
            )}
        </div>
    );
}

export default StringState;