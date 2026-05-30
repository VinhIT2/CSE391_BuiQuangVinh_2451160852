# PHIẾU BÀI TẬP 09

## PHẦN A

### Câu A1:

```Document
└── html
    └── body
        └── div #app
            ├── header
            │   ├── h1
            │   │   └── text: "Todo App"
            │   └── nav
            │       ├── a .active (href="#")
            │       │   └── text: "All"
            │       ├── a (href="#")
            │       │   └── text: "Active"
            │       └── a (href="#")
            │           └── text: "Completed"
            └── main
                ├── form #todoForm
                │   ├── input #todoInput (type="text")
                │   └── button (type="submit")
                │       └── text: "Add"
                └── ul #todoList
                    ├── li .todo-item
                    │   └── text: "Learn HTML"
                    └── li .todo-item.completed
                        └── text: "Learn CSS"
```

**Các câu lệnh querySelector tương ứng:**
- Chọn thẻ `<h1>`: document.querySelector('h1')

- Chọn input trong form: document.querySelector('#todoInput')

- Chọn tất cả .todo-item: document.querySelectorAll('.todo-item')

- Chọn link đang active: document.querySelector('a.active')

- Chọn `<li>` đầu tiên trong #todoList: document.querySelector('#todoList li')

- Chọn tất cả `<a>` bên trong `<nav>`: document.querySelectorAll('nav a')

### Câu A2:

**Sự khác nhau và Trường hợp sử dụng**

- **innerHTML:** Lấy hoặc thay đổi toàn bộ nội dung HTML (bao gồm cả các thẻ tag) bên trong phần tử. Trình duyệt sẽ parse chuỗi string thành các DOM nodes.

- **Khi nào dùng:** Khi cần chèn hoặc render một cấu trúc HTML mới (ví dụ: chèn một đoạn code có thẻ `<strong>`, `<span>`, `<div>`...).

- **textContent:** Chỉ lấy hoặc thay đổi nội dung văn bản thô bên trong phần tử và tất cả các hậu duệ của nó. Nó tự động chuyển hướng các ký tự đặc biệt thành text thuần.

- **Khi nào dùng:** Khi cần gán nội dung văn bản thô (như tên user, nội dung tin nhắn, số đếm...) để đảm bảo hiệu năng và bảo mật.

**Giải thích bảo mật & Cách sửa lỗ hổng XSS**
> innerHTML có thể gây lỗ hổng XS vì nó chấp nhận chuỗi chứa mã HTML và thực thi script nằm trong chuỗi đó nếu cấu trúc HTML đó kích hoạt một listener (như onerror, onload). Nếu dữ liệu nhập vào từ user không được kiểm duyệt, kẻ tấn công có thể inject mã độc JavaScript để đánh cắp cookie, session hoặc điều hướng trang.

### Câu A3:

Khi click vào button, output ban đầu:

```Plaintext
BUTTON
INNER
OUTER
```
Nếu uncomment e.stopPropagation(), output thay đổi thành:
```Plaintext
BUTTON
```

## PHẦN C

### Câu C1:
**Các lỗi nghiêm trọng được tìm thấy và cách sửa:**
1. Lỗi gán sai API Event listener: addEventListener("onclick", ...) $\rightarrow$ Chữ cái đầu on chỉ dùng cho inline attribute hoặc property assignment. Trong addEventListener, tham số type phải là "click".
2. Lỗi Mutation Variable Thao túng Element: countDisplay = count; $\rightarrow$ countDisplay là một Node instance chứa DOM reference, không thể gán đè trực tiếp bằng kiểu dữ liệu Number. Sửa thành: countDisplay.innerHTML = count;.
3. Lỗi clear nội dung không chuẩn xác: historyList.innerHTML = null; $\rightarrow$ Mặc dù chạy được nhưng gán null cho kiểu chuỗi là bad practice, nên dùng chuỗi rỗng "".
3. Lỗi gọi Method lỏng lẻo: item.remove; $\rightarrow$ Thiếu dấu ngoặc đơn thi hành hàm item.remove(). Đoạn code cũ không chạy vì nó chỉ tham chiếu đến method chứ không thực thi.
4. Lỗi Ép kiểu dữ liệu (Data Type Sync): Khi load từ LocalStorage: count = localStorage.getItem("count"); $\rightarrow$ Hàm này trả về một String. Khi bấm nút incrementBtn (count++), JavaScript sẽ thực hiện tính toán sai lệch hoặc gây bugs logic nếu không cast về số nguyên parseInt().
5. Lỗi Memory Leak trong DOM: li.addEventListener("click", ...) $\rightarrow$ Tạo closure listener riêng biệt cho từng thẻ li trong vòng lặp vô tận khi bấm nút, gây rò rỉ bộ nhớ nghiêm trọng. Nên dùng Event Delegation.
6. Lỗi lưu trữ DOM String Object: localStorage.setItem("history", historyList.innerHTML); $\rightarrow$ Lưu HTML thô vào LocalStorage dễ sinh lỗi XSS hoặc lỗi đồng bộ trạng thái ứng dụng. Dữ liệu mảng logic state nên là Single Source of Truth.

**Đoạn code đã refactor sạch lỗi:**
```JavaScript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = parseInt(localStorage.getItem("count")) || 0;

// Khởi tạo trạng thái ban đầu
countDisplay.textContent = count;
const savedHistory = localStorage.getItem("history_data");
if (savedHistory) {
    JSON.parse(savedHistory).forEach(text => createHistoryItem(text));
}

function createHistoryItem(text) {
    const li = document.createElement("li");
    li.textContent = text;
    historyList.append(li);
}

// Sử dụng Event Delegation cho list lịch sử để tối ưu bộ nhớ
historyList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.remove();
    }
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    createHistoryItem("Count changed to " + count);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    historyList.innerHTML = "";
});

// Đồng bộ lưu trữ State sạch bằng JSON array thay vì innerHTML string
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    const itemsText = Array.from(historyList.querySelectorAll("li")).map(li => li.textContent);
    localStorage.setItem("history_data", JSON.stringify(itemsText));
});
```

### Câu C2:
**Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?**
- **Tốn dung lượng bộ nhớ (Memory Overhead):** Mỗi function handler tạo ra là một Object độc lập chiếm bộ nhớ Heap. Nhân lên 1000 lần gây lãng phí RAM, dẫn tới suy giảm hiệu năng trên thiết bị cấu hình thấp.

- **Khó quản lý và rò rỉ bộ nhớ (Memory Leak):** Khi các phần tử DOM này bị xoá động, nếu lập trình viên quên gỡ bỏ event listeners (removeEventListener), các hàm handler vẫn nằm trong bộ nhớ và không được giải phóng bởi Garbage Collector.

- **Giải pháp từ Event Delegation:** Tận dụng cơ chế Event Bubbling (Sự kiện nổi bọt). Chỉ cần đăng ký một listener duy nhất trên phần tử cha đại diện. Khi bất kỳ phần tử con nào kích hoạt sự kiện, sự kiện sẽ tự động lan truyền ngược lên cha. Từ đó, dùng thuộc tính e.target để xác định chính xác thẻ con nào vừa tương tác.

**Refactor mã nguồn tối ưu với DocumentFragment:**
```JavaScript
// Khởi tạo một Node Fragment ảo trong bộ nhớ đệm (bản chất nằm ngoài DOM Tree)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // Gán vào fragment chỉ tiêu tốn memory footprint nội bộ, không gây render lại giao diện
    fragment.appendChild(div); 
}

// Bơm toàn bộ 1000 phần tử vào DOM cùng một lúc -> Chỉ kích hoạt 1 lần Reflow và Repaint duy nhất
document.body.appendChild(fragment);
```
**Giải thích cơ chế tối ưu:** Khi chèn trực tiếp từng element vào document.body trong vòng lặp 1000 lần, trình duyệt buộc phải tính toán lại kích thước hình học (Layout/Reflow) và vẽ lại pixel hình ảnh (Repaint) 1000 lần liên tiếp, gây nghẽn UI Thread (giật lag khung hình). DocumentFragment đóng vai trò như một chiếc giỏ lưu tạm trên RAM, giúp gom cụm tác vụ ghi hàng loạt thành một transaction duy nhất, tăng tốc độ xử lý lên gấp hàng chục lần.
