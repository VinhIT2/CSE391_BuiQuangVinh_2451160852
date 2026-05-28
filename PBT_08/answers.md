# PHIẾU BÀI TẬP 08

## PHẦN A

### Câu A1:
**3 cách viết:**
```js
// 1. Function Declaration
function tinhThueBaoHiemDeclaration(luong) {
    const thueRate = luong > 11000000 ? 0.1 : 0;
    const thue = luong * thueRate;
    return { thue, thuc_nhan: luong - thue };
}
// 2. Function Expression
const tinhThueBaoHiemExpression = function(luong) {
    const thueRate = luong > 11000000 ? 0.1 : 0;
    const thue = luong * thueRate;
    return { thue, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiemArrow = (luong) => {
    const thueRate = luong > 11000000 ? 0.1 : 0;
    const thue = luong * thueRate;
    return { thue, thuc_nhan: luong - thue };
};
```     
**Ba cách này có sự khác biệt rất lớn về cơ chế Hoisting:**

**Function Declaration:** Được hoisted hoàn toàn (cả tên và phần thân định nghĩa hàm). Bạn có thể gọi hàm trước khi khai báo.

**Function Expression & Arrow Function:** Không được hoisted theo cách đó. Chúng được gán vào các biến (const/let). Bản thân các biến này nằm trong Temporal Dead Zone (TDZ) trước khi dòng khai báo chạy qua. Nếu gọi trước, chương trình ném lỗi ReferenceError.
```js
// Ví dụ cụ thể:
console.log(tinhThueBaoHiemDeclaration(15000000)); // HỢP LỆ -> Trả về kết quả

console.log(tinhThueBaoHiemExpression(15000000));  // LỖI: ReferenceError
console.log(tinhThueBaoHiemArrow(15000000));       // LỖI: ReferenceError

function tinhThueBaoHiemDeclaration(luong) {}
const tinhThueBaoHiemExpression = function(luong) {};
const tinhThueBaoHiemArrow = (luong) => {};
```

### Câu A2:
**Dự đoán Output**
- Đoạn 1:

```Plaintext
1
2
3
2
2
```
- Đoạn 2 (Sau 200ms):

```Plaintext
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```
**Giải thích chi tiết**
- Đoạn 1: Hàm counter() tạo ra một môi trường ngữ cảnh (Lexical Environment) chứa biến count. Khối đối tượng trả về chứa 3 hàm closure tham chiếu trực tiếp đến cùng một biến count trong bộ nhớ, giúp duy trì và cập nhật giá trị qua từng lần gọi.

- Đoạn 2: * Vòng lặp var sử dụng biến có phạm vi hàm/toàn cục (function/global scope). Cả 3 hàm callback của setTimeout đều tham chiếu tới cùng một biến i duy nhất. Khi các hàm này thực thi (sau 100ms), vòng lặp đã kết thúc và biến i dùng chung đó đã mang giá trị 3.

- Vòng lặp let sử dụng phạm vi khối (block scope). Tại mỗi vòng lặp (iteration), JavaScript sinh ra một biến j hoàn toàn mới trong bộ nhớ. Mỗi hàm callback giữ một liên kết closure riêng biệt tới biến j của vòng lặp tương ứng, bảo toàn giá trị 0, 1, 2.

### Câu A3:
```JavaScript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const triples = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const totalSum = nums.reduce((acc, cur) => acc + cur, 0);

// 4. Tìm số đầu tiên > 7
const firstGreaterThan7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasGreaterThan10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const descriptions = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse();
```
### Câu A4:
**Dự đoán Output**
```JavaScript
// Destructuring
console.log(name, price, ram, color);  // Output: "iPhone 16" 25990000 8 "Titan"
console.log(specs);                    // Output: ReferenceError: specs is not defined

// Spread
console.log(updated.price);            // Output: 23990000
console.log(updated.sale);             // Output: true
console.log(product.price);            // Output: 25990000 (Mảng/Object gốc không đổi)

// Spread gotcha
console.log(product.specs.ram);        // Output: 16
```
**Giải thích tại sao product.specs.ram đổi thành 16**

> Toán tử spread (...) chỉ thực hiện Shallow Copy (sao chép nông). Nó chỉ nhân bản các thuộc tính ở lớp bề mặt (top-level properties). Đối với các thuộc tính là Object lồng nhau như specs, copy.specs và product.specs vẫn cùng trỏ về một địa chỉ vùng nhớ (reference) giống nhau. Do đó, thay đổi giá trị bên trong copy.specs sẽ trực tiếp tác động và làm thay đổi object gốc product.
