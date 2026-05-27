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