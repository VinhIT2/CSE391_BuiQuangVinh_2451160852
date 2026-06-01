import { useState, useEffect } from "react";

function KeyboardEvents() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [bg, setBg] = useState("white");

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Thử thách 2: Di chuyển
            if (e.key === "ArrowUp") setPos(p => ({ ...p, y: p.y - 10 }));
            if (e.key === "ArrowDown") setPos(p => ({ ...p, y: p.y + 10 }));
            if (e.key === "ArrowLeft") setPos(p => ({ ...p, x: p.x - 10 }));
            if (e.key === "ArrowRight") setPos(p => ({ ...p, x: p.x + 10 }));
            
            // Thử thách 3: Ctrl+D
            if (e.ctrlKey && e.key === "d") setBg(bg === "white" ? "#f1c40f" : "white");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [bg]);

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", margin: "10px 0", backgroundColor: bg }}>
            <h2>Bài 5.3 — Keyboard Events</h2>
            <div style={{ width: "50px", height: "50px", background: "red", transform: `translate(${pos.x}px, ${pos.y}px)` }} />
            <p>Sử dụng phím mũi tên để di chuyển. Ctrl + D để đổi màu.</p>
        </div>
    );
}
export default KeyboardEvents;