# PHẦN A: ĐỌC HIỂU

__Câu A1:__

I. 5 bước xảy ra khi truy cập https://shopee.vn (theo đúng thứ tự):
- Dựa trên quy trình "Cuộc hành trình 0.3 giây" và kiến trúc "Nhà hàng Online" trong tài liệu (Introduction và phần 1), các bước diễn ra là:

1. Gửi Request (DNS Lookup & Kết nối): Trình duyệt (Client) tiếp nhận URL, tìm địa chỉ IP của server Shopee và gửi yêu cầu (HTTP Request) qua Internet (đi qua router, nhà mạng, cáp quang...).

2. Server xử lý: Server của Shopee nhận được yêu cầu, "đầu bếp" (Server) sẽ xử lý logic, truy xuất dữ liệu (ví dụ: các mặt hàng sale, giỏ hàng của cậu).

3. Gửi Response: Server phản hồi (HTTP Response) bằng cách gửi các file cần thiết (HTML, CSS, JS) ngược trở lại cho trình duyệt qua "anh shipper" Internet.

4. Parse & Execute (Phân tích mã): Trình duyệt nhận file, bắt đầu đọc bản vẽ kiến trúc (Parse HTML), đọc thiết kế nội thất (Parse CSS) và lắp đặt hệ thống tương tác (Execute JS).

5. Paint & Render (Hiển thị): Trình duyệt hoàn thiện việc vẽ các điểm ảnh lên màn hình để cậu thấy giao diện trang chủ Shopee.
- Mở một trình duyệt web trang shopee và đánh giá kết quả tab Network:

![AnhDevtools](./assets/image-3.png)

__Câu A2:__

- Tại sao Google đánh giá thấp?

Google đọc HTML để **hiểu cấu trúc và nội dung** trang. Khi toàn bộ dùng `<div>`, Google không phân biệt được đâu là header, đâu là nội dung chính, đâu là sản phẩm → không index tốt → SEO kém.

---

❌ 4 Lỗi Semantic (+ bonus)

**Lỗi 1 — Thiếu `<header>`**  
`<div class="header">` không cho Google biết đây là phần đầu trang.

**Lỗi 2 — Thiếu `<nav>`**  
`<div class="menu">` không có tín hiệu điều hướng → Google không nhận ra đây là menu.

**Lỗi 3 — Thiếu `<main>` và `<article>`**  
`<div class="main">` và `<div class="product">` không thể hiện đây là nội dung chính và đơn vị sản phẩm độc lập.

**Lỗi 4 — `<img>` thiếu `alt`**  
Thiếu `alt` → Google Images không index được, vi phạm accessibility.

**Lỗi 5 (bonus) — Thiếu heading tag**  
`<div class="title">` nên là `<h2>` để Google hiểu mức độ quan trọng của tiêu đề sản phẩm.

---

## ✅ Code đã sửa

```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <article>
        <h2>iPhone 16 Pro</h2>
        <p class="price">25.990.000đ</p>
        <figure>
            <img src="iphone.jpg" alt="iPhone 16 Pro" loading="lazy">
            <figcaption>iPhone 16 Pro</figcaption>
        </figure>
    </article>
</main>

<footer>© 2026 ShopTLU</footer>
```

---

## 📋 Bảng tóm tắt

| # | Lỗi | Cũ | Sửa |
|---|---|---|---|
| 1 | Header | `<div class="header">` | `<header>` |
| 2 | Navigation | `<div class="menu">` | `<nav>` |
| 3 | Nội dung chính | `<div class="main">` | `<main>` |
| 4 | Sản phẩm | `<div class="product">` | `<article>` |
| 5 | Tiêu đề | `<div class="title">` | `<h2>` |
| 6 | Ảnh | `<img src="...">` | thêm `alt`, `loading="lazy"`, bọc `<figure>` |

__Câu A3:__


```
┌─────────────────────────────────────┐
│ Hộp 1                               │  ← <div> chiếm cả dòng
└─────────────────────────────────────┘
[Text A][Text B]                          ← <span> nằm cạnh nhau
┌─────────────────────────────────────┐
│ Hộp 2                               │  ← <div> chiếm cả dòng
└─────────────────────────────────────┘
[Text C][Text D]                          ← <span> + <strong> cùng dòng
┌─────────────────────────────────────┐
│ Hộp 3                               │  ← <div> chiếm cả dòng
└─────────────────────────────────────┘
```

---

## Giải thích

**`<div>` là block element** → tự động chiếm toàn bộ chiều ngang, phần tử tiếp theo bị đẩy xuống dòng mới. Vì vậy 3 hộp luôn đứng riêng từng dòng.

**`<span>` và `<strong>` là inline element** → chỉ chiếm đúng phần nội dung, các inline element kế tiếp tự động nằm cùng dòng. Đó là lý do:
- `Text A` + `Text B` nằm cạnh nhau
- `Text C` + `Text D` nằm cạnh nhau

**`<div>Hộp 2</div>` chen vào giữa** → làm Text A/B và Text C/D bị tách ra hai nhóm riêng biệt — `<div>` luôn "ngắt dòng" dù nằm giữa các inline element.

---

## Bảng tóm tắt

| Thẻ | Loại | Chiếm chỗ | Xuống dòng? |
|---|---|---|---|
| `<div>` | Block | Cả dòng ngang | Có |
| `<span>` | Inline | Vừa nội dung | Không |
| `<strong>` | Inline | Vừa nội dung | Không |

__Câu A4:__

1. Phân biệt `<thead>`, `<tbody>`, `<tfoot>`

| Thẻ | Vai trò | Nội dung |
|---|---|---|
| `<thead>` | Header bảng | Tiêu đề các cột (`<th>`) |
| `<tbody>` | Thân bảng | Dữ liệu chính (`<td>`) |
| `<tfoot>` | Footer bảng | Tổng kết, tổng cộng (`<td>`) |

**Ví dụ minh họa:**

```html
<table>
    <thead>                          <!-- Tiêu đề cột -->
        <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Tồn kho</th>
        </tr>
    </thead>
    <tbody>                          <!-- Dữ liệu -->
        <tr>
            <td>iPhone 15</td>
            <td>25.990.000đ</td>
            <td>15</td>
        </tr>
    </tbody>
    <tfoot>                          <!-- Tổng kết -->
        <tr>
            <td colspan="2">Tổng</td>
            <td>23</td>
        </tr>
    </tfoot>
</table>
```

---

2. Tại sao KHÔNG dùng `<table>` để layout trang web?

**Lý do 1 — Sai ngữ nghĩa (Semantic)**
`<table>` sinh ra để chứa *dữ liệu dạng bảng*, không phải để chia cột layout. Google và screen reader đọc `<table>` = "đây là bảng dữ liệu" → hiểu sai cấu trúc trang → SEO kém, accessibility kém.

**Lý do 2 — Khó responsive**
Table mặc định có chiều rộng cố định theo nội dung, rất khó co giãn trên màn hình điện thoại. CSS Grid/Flexbox có thể `wrap`, `stack`, ẩn/hiện cột linh hoạt — table thì không.

**Lý do 3 — Code rối, khó bảo trì**
Layout bằng table phải lồng nhiều `<tr>`, `<td>` chỉ để chia cột → HTML phình to, khó đọc, khó sửa. Dùng CSS Grid chỉ cần vài dòng CSS là xong.

**Lý do 4 — Load chậm hơn**
Trình duyệt phải đọc *toàn bộ* table trước khi render (vì cần tính độ rộng từng cột). Layout CSS render từng phần tử ngay lập tức → trang hiển thị nhanh hơn.

---

## Tóm tắt

> `<table>` = dùng cho **dữ liệu** (danh sách sản phẩm, bảng so sánh, thống kê).  
> Layout trang web = dùng **CSS Grid / Flexbox**.

# PHẦN B: THỰC HÀNH

__Câu B1:__

![alt text](/todo-app-btl/assets/image.png)

__Câu B2:__

![alt text](./assets/image-0.png)
![alt text](./assets/image-1.png)
![alt text](./assets/image-2.png)

__Câu B3:__

![alt text](./assets/img1.png)

Lỗi 1: Dòng 1 <!DOCTYPE> thiếu "html" — Sửa thành <!DOCTYPE html>

Lỗi 2: Dòng 5 Thẻ `<title>` chưa đóng — Thêm `</title>`

Lỗi 3: Dòng 6 charset="utf8" sai chuẩn — Sửa thành UTF-8

Lỗi 4: Dòng 9 Thẻ `<h1>` không đóng đúng — Sửa `</h1>`

Lỗi 5: Dòng 13 Thẻ `<a>` không đóng — Sửa `</a>`

Lỗi 6: Dòng 18 img thiếu dấu ngoặc kép và thiếu alt — Sửa src="iphone.jpg" và thêm alt

Lỗi 7: Dòng 20 Thẻ `<b>` đóng sai vị trí — Đổi thành `<strong>` và đóng đúng thứ tự

Lỗi 8: Dòng 26 Table header dùng `<td>` thay vì `<th>`Sửa thành `<th>`

Lỗi 9: Dòng 36 Dùng 2 thẻ `<main>` là sai semantic — Đổi cái thứ 2 thành `<aside>`

Lỗi 10: Dòng 41 Thẻ `<p>` trong footer chưa đóng — Thêm `</p>`

Lỗi 11: Thiếu thuộc tính lang trong `<html>` Thêm lang="vi"

Lỗi 12: Heading nhảy cấp (h1 → h3) Sửa h3 thành h2 cho đúng semantic

__Câu B4:__
