import { useState } from "react";

function ClickEvents() {
    const [bgColor, setBgColor] = useState("#ffffff");
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    // Thử thách 1: Đổi màu ngẫu nhiên
    const changeColor = () => {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        setBgColor(randomColor);
    };

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", margin: "10px 0", backgroundColor: bgColor }}>
            <h2>Bài 5.1 — Click Events</h2>
            <button onClick={changeColor}>Đổi màu nền</button>
            
            <div style={{ margin: "10px 0" }}>
                <button onClick={() => setCountA(countA + 1)}>Nút A: {countA}</button>
                <button onClick={() => setCountB(countB + 1)} style={{ marginLeft: "10px" }}>Nút B: {countB}</button>
            </div>

            {/* Thử thách 3: Like */}
            <button onClick={() => setIsLiked(!isLiked)} style={{ fontSize: "24px", border: "none", background: "none" }}>
                {isLiked ? "❤️" : "🤍"}
            </button>
        </div>
    );
}
export default ClickEvents;