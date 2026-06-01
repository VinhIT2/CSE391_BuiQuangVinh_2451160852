function UserCard({ name, email, avatar }) {
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", margin: "10px", width: "180px", textAlign: "center" }}>
            <img src={avatar} alt={name} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
            <h3>{name}</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>{email}</p>
        </div>
    );
}

export default UserCard;