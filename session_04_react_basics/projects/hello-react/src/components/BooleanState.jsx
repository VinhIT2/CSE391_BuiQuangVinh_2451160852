import { useState } from "react";

function BooleanState() {
    const [isVisible, setIsVisible] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Thử thách 1: Hiện/Ẩn mật khẩu độc lập
    const [passText, setPassText] = useState("");
    const [isHide, setIsHide] = useState(true);

    // Thử thách 2: State cho Accordion
    const [isOpenAccordion, setIsOpenAccordion] = useState(false);

    // Thử thách 3: State cho bóng đèn
    const [isLightOn, setIsLightOn] = useState(false);
    
    const themeStyle = {
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#333",
        padding: "20px",
        minHeight: "200px",
        border: "1px solid #ccc",
        margin: "10px 0"
    };
    
    return (
        <div style={themeStyle}>
            <h2>Bài 4.3 — Toggle Demo</h2>
            
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Ẩn nội dung" : "Hiện nội dung"}
            </button>
            
            {isVisible && (
                <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd" }}>
                    <p>Đây là nội dung có thể ẩn/hiện!</p>
                </div>
            )}
            
            <hr />
            <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
            
            <hr />
            <button type="button" onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
            </button>

            <hr />
            <h3>Khu vực Thử thách 4.3</h3>

            {/* Thử thách 1 */}
            <div style={{ marginBottom: "15px" }}>
                <input type={isHide ? "password" : "text"} value={passText} onChange={(e) => setPassText(e.target.value)} placeholder="Nhập pass..." />
                <button type="button" onClick={() => setIsHide(!isHide)} style={{ marginLeft: "5px" }}>
                    {isHide ? "Hiện mật khẩu" : "Ẩn mật khẩu"}
                </button>
            </div>

            {/* Thử thách 2 */}
            <div style={{ border: "1px solid #aaa", borderRadius: "4px", marginBottom: "15px" }}>
                <div 
                    onClick={() => setIsOpenAccordion(!isOpenAccordion)} 
                    style={{ background: "#eee", padding: "10px", cursor: "pointer", color: "#333", fontWeight: "bold" }}
                >
                    {isOpenAccordion ? "▼ Tiêu đề Accordion (Bấm để đóng)" : "► Tiêu đề Accordion (Bấm để mở)"}
                </div>
                {isOpenAccordion && (
                    <div style={{ padding: "10px", background: "#fff", color: "#333" }}>
                        Đây là nội dung chi tiết nằm bên trong Accordion!
                    </div>
                )}
            </div>

            {/* Thử thách 3 */}
            <div>
                <button type="button" onClick={() => setIsLightOn(!isLightOn)} style={{ padding: "8px 15px", fontSize: "16px" }}>
                    {isLightOn ? "💡 BẬT" : "🔌 TẮT"}
                </button>
                <span style={{ marginLeft: "10px" }}>
                    Trạng thái đèn: <strong>{isLightOn ? "Đèn đang sáng lung linh!" : "Đèn đã tắt tối thui!"}</strong>
                </span>
            </div>
        </div>
    );
}

export default BooleanState;