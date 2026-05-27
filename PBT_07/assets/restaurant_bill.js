function printBill(order, isWednesday, hasTip = true) {
    let subtotal = 0;
    for (let i = 0; i < order.length; i++) {
        subtotal += order[i].price * order[i].quantity;
    }

    let discountPercent = 0;
    if (subtotal > 1000000) discountPercent = 15;
    else if (subtotal > 500000) discountPercent = 10;
    if (isWednesday) discountPercent += 5;

    const discountAmount = subtotal * (discountPercent / 100);
    const afterDiscount = subtotal - discountAmount;
    
    const vatAmount = afterDiscount * 0.08;
    const tipAmount = hasTip ? afterDiscount * 0.05 : 0;
    const totalPayment = afterDiscount + vatAmount + tipAmount;
    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG              ║");
    console.log("╠══════════════════════════════════════╣");
    for (let i = 0; i < order.length; i++) {
        const item = order[i];
        const lineText = `${i + 1}. ${item.name.padEnd(10)} x${item.quantity}  @${item.price / 1000}k  = ${ (item.price * item.quantity) / 1000 }k`;
        console.log(`║ ${lineText.padEnd(36)} ║`);
    }
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ Tổng cộng:${String(subtotal.toLocaleString() + 'đ').padStart(25)} ║`);
    console.log(`║ Giảm giá (${discountPercent}%):${String(discountAmount.toLocaleString() + 'đ').padStart(21)} ║`);
    console.log(`║ VAT (8%):${String(vatAmount.toLocaleString() + 'đ').padStart(26)} ║`);
    console.log(`║ Tip (5%):${String(tipAmount.toLocaleString() + 'đ').padStart(26)} ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:${String(Math.round(totalPayment).toLocaleString() + 'đ').padStart(24)} ║`);
    console.log("╚══════════════════════════════════════╝");
}

const currentOrder = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 }
];
printBill(currentOrder, false, true);