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