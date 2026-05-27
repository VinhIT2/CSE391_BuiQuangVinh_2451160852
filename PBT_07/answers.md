# PHIẾU BÀI TẬP 07

## PHẦN A

### Câu A1:

- Đoạn 1: undefined (Do cơ chế hoisting của var chỉ khởi tạo biến lên đầu scope).

- Đoạn 2: ReferenceError: Cannot access 'y' before initialization (Do hoisting của let nằm trong Temporal Dead Zone - TDZ).

- Đoạn 3: TypeError: Assignment to constant variable (Do không thể gán lại giá trị cho hằng số const).

- Đoạn 4: [1, 2, 3, 4] (Hằng số const với kiểu dữ liệu tham chiếu như Array/Object chỉ chặn gán lại reference, không chặn mutation nội dung bên trong).

- Đoạn 5: Trong block: 2, Ngoài block: 1 (Do let có block scope, biến a bên trong che khuất biến a bên ngoài).

### Câu A2:

```js
console.log(typeof null);              // "object" (Lỗi lịch sử của JavaScript)
console.log(typeof undefined);         // "undefined"
console.log(typeof NaN);              // "number"
console.log("5" + 3);                 // "53"
console.log("5" - 3);                 // 2
console.log("5" * "3");              // 15
console.log(true + true);            // 2 (true ép kiểu thành 1)
console.log([] + []);                // "" (Mảng rỗng ép kiểu thành chuỗi rỗng)
console.log([] + {});                // "[object Object]"
console.log({} + []);                // "[object Object]" (hoặc 0 tùy thuộc vào context của console engine)
```
**Giải thích sự khác biệt giữa "5" + 3 và "5" - 3**

- Toán tử + bị quá tải (overloaded). Khi một trong hai toán hạng là String, JavaScript sẽ ưu tiên ép kiểu toán hạng còn lại thành String và thực hiện nối chuỗi. Do đó "5" + 3 thành "5" + "3" = "53".

- Toán tử - chỉ tồn tại cho các phép toán số học. JavaScript sẽ bắt buộc ép kiểu cả hai toán hạng về kiểu Number. Do đó "5" - 3 thành 5 - 3 = 2.

### Câu A3:

```js
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);             // false (NaN không bao giờ bằng chính nó)
console.log(0 == false);             // true
console.log(0 === false);            // false
console.log("" == false);            // true
```
- Luôn luôn sử dụng === và !==. Không sử dụng == ngoại trừ trường hợp muốn kiểm tra nhanh một giá trị có phải là null hoặc undefined hay không (value == null). Việc dùng === giúp tránh lỗi logic nghiêm trọng do cơ chế tự động ép kiểu phức tạp của ==.

### Câu A4:
**Danh sách các giá trị Falsy trong JavaScript**

- `false`, `0`, `""`, `null`, `undefined`, và `NaN`.

```js
if ("0") console.log("A");           // có in
if ("") console.log("B");            // không in
if ([]) console.log("C");            // có in
if ({}) console.log("D");            // có in
if (null) console.log("E");          // không in
if (0) console.log("F");             // không in
if (-1) console.log("G");            // có in
if (" ") console.log("H");           // có in
```
### Câu A5:
```js
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = 
`<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

## PHẦN C

### Câu C1

**Danh sách các lỗi phát hiện và cách sửa**

Lỗi 1 — if (giaSauGiam = 0) → dùng `=` thay vì `===`, phép gán không phải so sánh.
Lỗi 2 — tinhGiaGiamGia("100000", 20) → truyền `string` thay vì `number`.
Lỗi 3 — Thiếu validate giaBan → không kiểm tra kiểu/giá trị âm.
Lỗi 4 — var giamGia → biến không đổi nên dùng const.
Lỗi 5 — Thiếu `;` ở nhiều dòng → có thể gây lỗi ASI edge case.
Lỗi 6 (ẩn) — for (var i = 0; ...) + closure trong setTimeout, var là function scope, tất cả callback dùng chung i=5 khi chạy. Dùng let tạo block scope riêng từng vòng → In đúng 0-4.
```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (typeof giaBan !== 'number' || giaBan < 0) {
        return "Giá bán không hợp lệ";
    }
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    const giamGia = giaBan * phanTramGiam / 100;
    const giaSauGiam = giaBan - giamGia;

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```
