function PriceTag({ originalPrice, salePrice }) {
    return (
        <div style={{ margin: "10px", padding: "10px", border: "1px dashed #e67e22", display: "inline-block" }}>
            <span style={{ textDecoration: "line-through", color: "#999", marginRight: "10px" }}>{originalPrice}đ</span>
            <span style={{ color: "#e74c3c", fontWeight: "bold" }}>{salePrice}đ</span>
        </div>
    );
}

export default PriceTag;