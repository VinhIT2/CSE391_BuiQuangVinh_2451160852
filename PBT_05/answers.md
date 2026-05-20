# PHIẾU BÀI TẬP 05

## PHẦN A

### Câu A1:

1. Thẻ `<meta viewport>` chuẩn:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
> `width=device-width`: Đặt chiều rộng của viewport bằng chiều rộng màn hình thiết bị

> `iinitial-scale=1.0`: Thiết lập mức độ thu phóng ban đầu là 100% khi tải trang

2. Trình duyệt giả lập là một màn hình desktop, rồi ép nhỏ toàn bộ giao diện lại để vừa với màn hình điện thoại. Chữ và nút bấm sẽ cực kỳ nhỏ cho nên người dùng rất khó đọc và thao tác

3. Mobile-first thiết kế và lập trình cho màn hình nhỏ (Mobile) trước. Sau đó dùng Media Queries để thêm tính năng, mở rộng giao diện cho màn hình lớn (Desktop). Desktop-first thiết kế và lập trình cho màn hình lớn (Desktop) trước. Sau đó dùng Media Queries để thu gọn, ẩn bớt hoặc sắp xếp lại giao diện cho màn hình nhỏ (Mobile).

**Ví dụ:**
```css
/* Code mặc định cho Mobile (Màn hình < 768px) */
.container {
  display: flex;
  flex-direction: column;
}

.item {
  width: 100%;
}

/* Điều kiện cho Desktop (Màn hình từ 768px trở lên) */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }

  .item {
    width: 33.33%;
  }
}
```
**Mobile first được khuyên dùng hơn vì:**

- **Tối ưu hiệu năng:** Mobile có phần cứng yếu và mạng chậm hơn Desktop. Viết code Mobile-First giúp thiết bị di động tải ít CSS hơn, không phải ghi đè (override) các thuộc tính nặng của Desktop. 

- **60% lưu lượng truy cập:** Phần lớn người dùng hiện nay lướt web bằng điện thoại. Thiết kế ưu tiên Mobile giúp tiếp cận khách hàng tốt hơn.

- **Tốt cho SEO:** Google áp dụng thuật toán Mobile-First Indexing. Họ sẽ dùng giao diện Mobile của website để đánh giá và xếp hạng trên kết quả tìm kiếm.

### Câu A2:
| Tên | Kích thước | Số lượng cột | Thiết bị |
| :--- | :--- | :--- | :--- |
| **xs** | < 576px | 1 cột | Điện thoại dọc |
| **sm** | ≥ 576px | 2 cột | Điện thoại ngang |
| **md** | ≥ 768px | 3 cột | Tablet |
| **lg** | ≥ 992px | 4 cột | Desktop nhỏ |
| **xl** | ≥ 1200px | 6 hoặc 12 cột | Desktop lớn |

### Câu A3:

| Chiều rộng màn hình | .container width | Giải thích |
| :--- | :--- | :--- |
| **375px** (iPhone SE) | **100%** | Nhỏ hơn 576px, nhận giá trị mặc định bên ngoài media query. |
| **600px** | **540px** | Nằm trong khoảng từ 576px đến 767px, thỏa mãn điều kiện `min-width: 576px`. |
| **800px** | **720px** | Nằm trong khoảng từ 768px đến 991px, thỏa mãn điều kiện `min-width: 768px`. |
| **1000px** | **960px** | Nằm trong khoảng từ 992px đến 1199px, thỏa mãn điều kiện `min-width: 992px`. |
| **1400px** | **1140px** | Lớn hơn 1200px, thỏa mãn điều kiện cuối cùng `min-width: 1200px`. |


### Câu A4:

1. **Variables:** Lưu trữ các giá trị sử dụng nhiều lần (màu sắc, font, spacing) để dễ quản lý, thay đổi một nơi là thay đổi toàn bộ.

**Ví dụ:**
```scss
$primary-color: #3498db;
button { color: $primary-color; }
```
2. **Nesting (CSS Lồng nhau):** Viết các selector lồng nhau theo cấu trúc phân cấp của HTML, giúp code gọn gàng, rõ ràng.

**Ví dụ:**
```scss  
nav {
    ul { list-style: none; }
    li { display: inline-block; }
}
```

3. **Mixins (Hàm tái sử dụng):** Gom một cụm thuộc tính CSS lại thành một hàm, có thể truyền tham số vào để tái sử dụng linh hoạt.

**Ví dụ:**
```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.box { @include flex-center; }
```

4. **@extend / Inheritance (Kế thừa):** Cho phép một selector chia sẻ/kế thừa toàn bộ thuộc tính CSS của một selector khác nhằm tránh trùng lặp code.

**Ví dụ:**
```scss
    .error-base { border: 1px solid red; color: red; }
    .critical-error { @extend .error-base; font-weight: bold; }
```

**Tại sao trình duyệt KHÔNG đọc được file .scss? Cần bước gì để chuyển SCSS → CSS?**
> Trình duyệt web chỉ hiểu và biên dịch được file định dạng `.css` tiêu chuẩn theo đặc tả của W3C. File `.scss` chứa các cú pháp nâng cao (biến, lồng, hàm) nằm ngoài đặc tả này.

> **Giải pháp:** Cần sử dụng một công cụ biên dịch như `Sass CSS Compiler` (Extension VS Code) hoặc cài đặt gói `sass` qua npm để biên dịch tệp `.scss` thành tệp `.css` thuần trước khi nhúng vào HTML.

## PHẦN C

### Câu C1:

