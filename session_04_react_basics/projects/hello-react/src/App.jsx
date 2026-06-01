function UserProfile() {
    return (
        <div className="profile" style={{ border: "1px solid #ddd", padding: "15px", margin: "10px 0", borderRadius: "5px" }}>
            <h1>Hồ sơ cá nhân</h1>
            <img src="https://via.placeholder.com/100" alt="Ảnh đại diện" />
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

function ProductInfo() {
    return (
        <div className="product" style={{ border: "1px solid #ddd", padding: "15px", margin: "10px 0", borderRadius: "5px" }}>
            <h2>iPhone 15</h2>
            <p className="price" style={{ fontWeight: "bold", color: "#2ecc71" }}>25.000.000đ</p>
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            <button type="button">Mua ngay</button>
        </div>
    );
}

export default function App() {
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Bùi Quang Vinh</h1>
            <UserProfile />
            <ProductInfo />
        </div>
    );
}