function createCart() {
    let items = [];
    let discount = { type: "none", value: 0 };
    
    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(item => item.id === productId);
            if (item) item.quantity = newQuantity;
        },
        
        getTotal() {
            const rawTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (discount.type === "percentage") {
                return rawTotal * (1 - discount.value);
            } else if (discount.type === "fixed") {
                return Math.max(0, rawTotal - discount.value);
            }
            return rawTotal;
        },
        
        applyDiscount(code) {
            if (code === "SALE10") discount = { type: "percentage", value: 0.1 };
            else if (code === "SALE20") discount = { type: "percentage", value: 0.2 };
            else if (code === "FREESHIP") discount = { type: "fixed", value: 30000 };
            else discount = { type: "none", value: 0 };
        },
        
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá      │ Tổng         │");
            items.forEach((item, index) => {
                const idx = String(index + 1).padEnd(2);
                const name = item.name.padEnd(13);
                const qty = String(item.quantity).padStart(2);
                const price = item.price.toLocaleString("vi-VN").padStart(12);
                const total = (item.price * item.quantity).toLocaleString("vi-VN").padStart(12);
                console.log(`│ ${idx}│ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });
            console.log("├──────────────────────────────────────────────┤");
            console.log(`│ Tổng thanh toán: ${this.getTotal().toLocaleString("vi-VN").padStart(24)}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            discount = { type: "none", value: 0 };
        }
    };
}

// === CHẠY KIỂM THỬ (TEST) ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();
cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); 
cart.removeItem(3);
console.log("Sau xóa id 3, số SP:", cart.getItemCount());