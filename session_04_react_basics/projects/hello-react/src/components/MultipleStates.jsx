import { useState } from "react";

function MultipleStates() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [isStudent, setIsStudent] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // Thử thách 1: Thêm trường Email vào form
    const [email, setEmail] = useState("");
    
    function handleSubmit() {
        if (name.trim() === "" || age === "" || email.trim() === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        // Thử thách 2: Validate tuổi phải từ 1 đến 99
        const ageNum = Number(age);
        if (ageNum <= 0 || ageNum >= 100) {
            alert("Tuổi nhập vào không hợp lệ! Phải lớn hơn 0 và nhỏ hơn 100.");
            return;
        }
        setSubmitted(true);
    }
    
    function handleReset() {
        setName("");
        setAge("");
        setEmail("");
        setIsStudent(false);
        setSubmitted(false);
    }
    
    return (
        <div style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}>
            <h2>Bài 4.4 — Form đăng ký kết hợp</h2>
            
            {/* Thử thách 3: Hiển thị xin chào realtime khi đang gõ */}
            {name && <p style={{ color: "#2980b9" }}>✨ Đang nhập: Xin chào {name}!</p>}

            {!submitted ? (
                <div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tên: </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Thử thách 1: Render input email */}
                    <div style={{ marginBottom: "10px" }}>
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>Tuổi: </label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    
                    <div style={{ marginBottom: "10px" }}>
                        <label>
                            <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} />
                            Là sinh viên
                        </label>
                    </div>
                    
                    <button type="button" onClick={handleSubmit}>Đăng ký</button>
                </div>
            ) : (
                <div style={{ background: "#d4edda", padding: "15px", borderRadius: "4px", color: "#155724" }}>
                    <h3>✅ Đăng ký thành công!</h3>
                    <p>Tên: {name}</p>
                    <p>Email: {email}</p>
                    <p>Tuổi: {age}</p>
                    <p>Sinh viên: {isStudent ? "Có" : "Không"}</p>
                    <button type="button" onClick={handleReset}>Đăng ký lại</button>
                </div>
            )}
        </div>
    );
}

export default MultipleStates;