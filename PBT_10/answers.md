# PHIẾU BÀI TẬP 10

## PHẦN A

### Câu A1:

**Thứ tự Output dự kiến:**
```Plaintext
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
5 - Timeout 100ms
7 - Nested timeout
```
**Giải thích cơ chế Event Loop hoạt động:**

- **Call Stack (Đồng bộ - Sync):** Ghi nhận và thực thi mã tuần tự. 1 - Start và 4 - End được đẩy vào Call Stack và in ra màn hình ngay lập tức. Các tác vụ bất đồng bộ được đẩy qua Web APIs để xử lý.

- **Microtask Queue (Hàng đợi ưu tiên):** Chứa các callback xử lý của Promise.resolve().then(), queueMicrotask hoặc MutationObserver. Ngay khi Call Stack trống, Event Loop sẽ vét sạch toàn bộ các tác vụ trong Microtask Queue trước khi chuyển qua Macrotask Queue. Do đó, 3 - Promise và 6 - Promise 2 được thực thi trước.

- **Macrotask Queue / Task Queue (Hàng đợi tác vụ):** Chứa các callback từ setTimeout, setInterval, I/O, UI rendering.
    - 2 - Timeout 0ms lọt vào Macrotask Queue trước.
    - Khi 6 - Promise 2 chạy, nó đẩy 7 - Nested timeout vào cuối hàng đợi Macrotask Queue.
    - Sau khi giải phóng Microtask, Event Loop bốc tác vụ đầu tiên của Macrotask là 2 - Timeout 0ms. Tiếp theo, sau khoảng 100ms, 5 - Timeout 100ms đủ điều kiện chạy trước 7 - Nested timeout (do 7 - Nested timeout chỉ vừa mới được đưa vào queue sau khi call stack xử lý xong promise).

### Câu A2:

1. await fetch(...): Hàm fetch() trả về một Promise chứa thực thể Response (chưa chứa dữ liệu thô ngay lập tức mà chỉ chứa thông tin HTTP headers, status code). Cần await để dừng tạm thời việc thực thi hàm async, đợi Promise đó chuyển sang trạng thái Fulfilled để lấy thực thể Response.

2. response.ok: Trả về false khi mã trạng thái HTTP (Status code) nằm ngoài khoảng 200 - 299. Ví dụ 3 mã tương ứng:

    - 404 Not Found (Không tìm thấy tài nguyên).

    - 500 Internal Server Error (Lỗi hệ thống máy chủ).

    - 403 Forbidden (Bị từ chối truy cập).

3. response.json(): Tiếp tục trả về một Promise. Trình duyệt cần thời gian đọc luồng dữ liệu stream từ HTTP body và phân tích cú pháp (parse) chuỗi JSON thành JavaScript Object, do đó phải sử dụng await lần thứ hai.

4. try...catch:
    - Bắt các lỗi Network error (Mất kết nối mạng, DNS fail, CORS chặn).

    - Bắt các lỗi JSON parse error nếu server trả về dữ liệu không đúng định dạng JSON (ví dụ trả về HTML lỗi).

    - Lưu ý: fetch() không tự động quăng lỗi (throw error) khi gặp mã lỗi HTTP 404 hoặc 500. Đoạn code trên bắt được lỗi 404 là nhờ có câu lệnh chủ động kiểm tra if (!response.ok) { throw new Error(...) }.
### Câu A3:
**Sơ đồ trạng thái của Promise:**
```Plaintext
                  ┌────────────────────────┐
                  │        PENDING         │
                  │  (Trạng thái ban đầu)  │
                  └───────────┬────────────┘
                              │
              ┌───────────────┴───────────────┐
              ▼                               ▼
    [Thực thi resolve()]            [Thực thi reject()]
              │                               │
   ┌──────────┴──────────┐         ┌──────────┴──────────┐
   │      FULFILLED      │         │      REJECTED       │
   │ (Thành công: .then) │         │  (Thất bại: .catch) │
   └─────────────────────┘         └─────────────────────┘
```
**Callback Hell và Giải pháp Refactor:** Callback Hell là hiện tượng các hàm bất đồng bộ lồng nhau quá nhiều tầng, tạo thành cấu trúc mã hình kim tự tháp (Pyramid of Doom), khiến mã nguồn cực kỳ khó đọc, bảo trì và xử lý ngoại lệ.

Ví dụ 4 cấp Callback Hell:
```JavaScript
getDataUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetail(orders[0].id, (detail) => {
            getShippingStatus(detail.shippingId, (status) => {
                console.log("Trạng thái giao hàng:", status);
            });
        });
    });
});
```
**Refactor sạch sẽ với Async/Await:**
```JavaScript
async function getShippingInfo(userId) {
    try {
        const user = await getDataUser(userId);
        const orders = await getOrders(user.id);
        const detail = await getOrderDetail(orders[0].id);
        const status = await getShippingStatus(detail.shippingId);
        console.log("Trạng thái giao hàng:", status);
    } catch (error) {
        console.error("Lỗi quy trình lấy thông tin:", error);
    }
}
```
## PHẦN C

### Câu C1:

