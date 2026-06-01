import { useState } from "react";
// Bài 0.1: Component UserProfile
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện" />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// Bài 0.2: Component ProductInfo
function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button type="button">Mua ngay</button>
        </div>
    );
}

function LifecycleDemo() {
    console.log("1️⃣ Component được gọi!");
    return (
        <div style={{ padding: "20px", border: "2px solid #3498db", margin: "10px 0" }}>
            <h2>Lifecycle Demo</h2>
            <p>Mở Console (F12) để xem log</p>
            <p>Component này chỉ render MỘT lần</p>
        </div>
    );
}

function FlowDemo() {
    console.log("🔄 Component render!");
    const [step, setStep] = useState(1);

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0" }}>
            <h2>Luồng hoạt động</h2>
            <p>Bước hiện tại: {step}</p>
            <button type="button" onClick={() => setStep(step + 1)}>
                Bước tiếp theo →
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ marginLeft: "10px" }}>
                Quay lại đầu
            </button>
            <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
                {step === 1 && <p>👋 Bước 1: Xin chào!</p>}
                {step === 2 && <p>📖 Bước 2: Đang học React</p>}
                {step === 3 && <p>🎯 Bước 3: Hiểu useState</p>}
                {step === 4 && <p>🎉 Bước 4: Hoàn thành!</p>}
            </div>
        </div>
    );
}

// Bài 2.1: Hiển thị biến đơn giản
function SimpleVariables() {
    const ten = "Nguyễn Văn Minh";
    const tuoi = 20;
    const laSinhVien = true;
    const monHoc = ["HTML", "CSS", "JS", "React"];
    
    return (
        <div style={{ padding: "20px", border: "1px solid #eee", margin: "10px 0", borderRadius: "5px" }}>
            <h2>Xin chào {ten}!</h2>
            <p>Tuổi: {tuoi}</p>
            <p>Năm sau: {tuoi + 1}</p>
            <p>Sinh viên: {laSinhVien ? "Có" : "Không"}</p>
            <h3>Môn học yêu thích:</h3>
            <p>{monHoc.join(", ")}</p>
        </div>
    );
}

// Bài 2.2 & Thử thách: Vòng lặp map() và Tính toán điều kiện giá trị
function ListRendering() {
    const products = [
        { id: 1, name: "Ốp lưng chống sốc", price: 150000 },
        { id: 2, name: "Sạc dự phòng Anker 20W", price: 650000 },
        { id: 3, name: "Tai nghe AirPods Pro 2", price: 5990000 },  // > 1 triệu -> Đỏ
        { id: 4, name: "Chuột không dây Logitech", price: 2450000 }, // > 1 triệu -> Đỏ
        { id: 5, name: "Cáp sạc nhanh Type-C", price: 95000 }
    ];

    // Thử thách 3: Tính tổng giá tất cả sản phẩm bằng JS (.reduce)
    const totalCartPrice = products.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{ padding: "20px", border: "1px solid #ccc", margin: "10px 0", borderRadius: "5px" }}>
            <h2>Danh sách sản phẩm (Thử thách Tier 2)</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {products.map((product) => (
                    <li key={product.id} style={{ padding: "8px 0", borderBottom: "1px dashed #ddd" }}>
                        <span>{product.name} - </span>
                        <span style={{ 
                            color: product.price > 1000000 ? "red" : "black", 
                            fontWeight: product.price > 1000000 ? "bold" : "normal" 
                        }}>
                            {product.price.toLocaleString()}đ
                        </span>
                    </li>
                ))}
            </ul>
            
            <div style={{ marginTop: "15px", padding: "10px", background: "#e8f8f5", borderRadius: "4px" }}>
                <strong>💰 Tổng giá trị giỏ hàng: {totalCartPrice.toLocaleString()}đ</strong>
            </div>
        </div>
    );
}

// Component chính
export default function App() {
    return (
        <div>
            <h1>Bùi Quang Vinh - 2451160852</h1>
            <UserProfile />
            <ProductInfo />
        </div>
    );
}