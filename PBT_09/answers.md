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

### PHẦN C