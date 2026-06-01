# Tier 0

1. File .jsx khác gì file .js?
>File .js chỉ chứa mã JavaScript thuần túy. File .jsx cho phép chúng ta viết mã HTML trực tiếp bên trong JavaScript. Nhờ có Vite và Babel biên dịch, cú pháp này giúp viết giao diện trực quan và nhanh hơn.
2. Tại sao phải export default App?
>Để các file khác trong dự án có thể import và sử dụng component App này làm component gốc nhằm hiển thị lên toàn bộ trang web.
3. Thử xóa export default -> Chuyện gì xảy ra?
>Dự án sẽ ngay lập tức bị crash (trắng trang) và xuất hiện thông báo lỗi hệ thống từ Vite: `The requested module '/src/App.jsx' does not provide an export named 'default'`. Điều này là do file main.jsx không thể tìm thấy component mặc định nào được xuất ra từ file App.jsx để khởi chạy ứng dụng.

# Tier 1

1. Tại sao component chỉ render 1 lần?
>Khi trình duyệt tải trang (gọi là quá trình Mount), React chỉ gọi hàm component đúng 1 lần duy nhất để đọc cấu trúc JSX, tạo ra các phần tử DOM và hiển thị giao diện ban đầu lên màn hình.

2. Khi nào nó sẽ render lại?
> Component sẽ render lại (Re-render) khi và chỉ khi Trạng thái (State) của component đó thay đổi (thông qua hàm set của useState, ví dụ: setStep) hoặc khi Props truyền từ component cha vào thay đổi.


