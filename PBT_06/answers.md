# PHIẾU BÀI TẬP 06

## PHẦN A

### Câu A1:

#### 1. Bảng phân tích cấu trúc Layout

| Kích thước          | `< 768px` (Mobile)                             | `768px - 991px` (Tablet)                        | `≥ 992px` (Desktop)                                    |
| :------------------ | :--------------------------------------------- | :---------------------------------------------- | :----------------------------------------------------- |
| **Số cột hiển thị** | 1 cột / hàng                                   | 2 cột / hàng                                    | 4 cột / hàng                                           |
| **Box Layout**      | 4 dòng xếp chồng dọc. Mỗi Box chiếm 12/12 cột. | 2 dòng, mỗi dòng 2 cột. Mỗi Box chiếm 6/12 cột. | 1 dòng duy nhất chứa cả 4 Box. Mỗi Box chiếm 3/12 cột. |

#### 2. Câu hỏi thêm

- `col-md-6`: Nghĩa là trên các thiết bị có kích thước màn hình từ mức **Medium trở lên (≥768px)**, phần tử này sẽ chiếm kích rải là **6/12 cột** (tương đương 50% chiều rộng của hàng chứa nó).
- **Tại sao không cần viết `col-sm-12`?** Vì Bootstrap vận hành theo tư duy ưu tiên thiết bị di động trước (Mobile-First). Lớp cơ sở `col-12` đã khai báo phần tử chiếm trọn vẹn 100% chiều rộng từ kích thước nhỏ nhất (`xs`). Do đó, trạng thái này sẽ tự động kế thừa lên mức màn hình `sm` mà không cần viết lại mã thừa.

### Câu A2:

#### 1. Lớp `d-none d-md-block`

- **Ẩn khi nào:** Ẩn hoàn toàn trên các màn hình có độ rộng nhỏ hơn 768px (`xs` và `sm`). Do đặc tính của thuộc tính `d-none` hoạt động từ mốc cơ sở.
- **Hiển thị khi nào:** Bắt đầu hiển thị bình thường dưới dạng phần tử khối (`display: block`) khi màn hình đạt kích thước từ **768px trở lên (≥768px)** nhờ lớp ghi đè `d-md-block`.

#### 2. Danh sách 5 Spacing Utilities phổ biến

- `mt-3`: Cài đặt `margin-top` ở mức số 3 (Mặc định bằng `1rem` hay `16px` theo cấu hình Bootstrap).
- `px-4`: Cài đặt đồng thời cả `padding-left` và `padding-right` ở mức số 4 (`1.5rem` hay `24px`).
- `mb-auto`: Cài đặt `margin-bottom: auto`. Thường dùng trong Flexbox để đẩy phần tử kế tiếp xuống đáy.
- `ms-2`: Cài đặt `margin-left` (Margin Start) ở mức số 2 (`0.5rem` hay `8px`).
- `pb-5`: Cài đặt `padding-bottom` ở mức số 5 mức tối đa (`3rem` hay `48px`).

#### 3. Phân biệt các lớp Container

- `.container`: Cài đặt chiều rộng tối đa (`max-width`) cố định thay đổi nhảy bậc theo từng mốc Breakpoint (`sm`, `md`, `lg`, `xl`, `xxl`).
- `.container-fluid`: Cố định luôn chiếm toàn bộ không gian **chiều rộng 100%** ở mọi cấu hình màn hình thiết bị.
- `.container-md`: Trải phẳng chiếm 100% chiều rộng khi ở màn hình nhỏ hơn 768px, và bắt đầu thu hẹp giữ cố định `max-width` từ mốc màn hình `md` (768px) trở lên.


