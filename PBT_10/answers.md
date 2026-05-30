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

1. Chiến lược xử lý mất mạng đột ngột (Network errors)Khi mất mạng, đối tượng fetch sẽ tự động quăng ra một lỗi kết nối vật lý (reject Promise). Ta nên dùng thuộc tính toàn cục navigator.onLine để kiểm tra tức thời, thông báo giao diện thân thiện thay vì hiển thị log kỹ thuật thô.
2. Lỗi nghiệp vụ từ Server (500, 404, 429)404: Tài nguyên không tồn tại $\rightarrow$ Ẩn form hoặc điều hướng hiển thị giao diện báo trống.429 (Too Many Requests): Client gọi API vượt quá giới hạn $\rightarrow$ Kích hoạt bộ đếm thời gian hoãn thực thi (Cool down), tạm khoá chức năng click gửi request trong $N$ giây.500: Lỗi hệ thống nội bộ 
máy chủ $\rightarrow$ Hiển thị thông báo xin lỗi người dùng hệ thống đang bảo trì, đồng thời log chi tiết lỗi ra file tập trung.
3. Viết code Hàm Fetch có ràng buộc thời gian (Timeout)
```JavaScript
function fetchWithTimeout(url, options = {}, ms = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);

    return fetch(url, { ...options, signal: controller.signal })
        .then(response => {
            clearTimeout(id);
            return response;
        })
        .catch(error => {
            clearTimeout(id);
            if (error.name === 'AbortError') {
                throw new Error(`Yêu cầu bị huỷ bỏ do vượt quá thời gian phản hồi cho phép ${ms}ms`);
            }
            throw error;
        });
}
```
4. Viết code Quy trình tự động thử lại nhiều lần (Retry Logic)
```JavaScript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return await response.json();
            
            // Nếu gặp lỗi giới hạn 429 hoặc 5xx thì nên thử lại, 404 thì dừng ngay lập tức
            if (response.status === 404) throw new Error("Không tìm thấy tài nguyên (404)");
            
            console.warn(`Yêu cầu thất bại lần thứ ${i + 1}. Thử lại...`);
        } catch (error) {
            if (i === maxRetries - 1) throw new Error(`Đã thử lại ${maxRetries} lần nhưng vẫn thất bại: ${error.message}`);
        }
    }
}
```
### Câu C2:
### Bảng so sánh các phương thức xử lý Promise

| Phương thức | Khi nào Resolve? | Khi nào Reject? | Trường hợp sử dụng thực tế (Use case) |
| :--- | :--- | :--- | :--- |
| **`Promise.all()`** | Khi **tất cả** các Promise trong mảng đều thành công (`fulfilled`). Trả về mảng kết quả theo đúng thứ tự. | Ngay khi có **ít nhất 1** Promise trong mảng thất bại (`rejected`). | **Đồng bộ dữ liệu phụ thuộc:** Tải thông tin đơn hàng đi kèm chi tiết các mặt hàng. Mất 1 trong 2 thông tin là màn hình lỗi hoàn toàn, không thể hiển thị. |
| **`Promise.allSettled()`** | Khi **tất cả** các Promise hoàn thành việc xử lý (Bất kể thành công hay thất bại). | **Không bao giờ** rơi vào trạng thái `rejected`. | **Đồng bộ dữ liệu độc lập:** Nạp các widget trên trang Dashboard. Một block API (ví dụ: Tỷ giá) bị lỗi không được phép làm sập các block khác (ví dụ: Biểu đồ doanh thu). |
| **`Promise.race()`** | Khi có **1 Promise đầu tiên** trong mảng hoàn thành xử lý và thành công (`fulfilled`). | Khi có **1 Promise đầu tiên** trong mảng xử lý xong nhưng thất bại (`rejected`). | **Kiểm tra giới hạn thời gian (Timeout):** Tạo cuộc đua giữa một Request mạng và một hàm `setTimeout` tạo lỗi để ngắt kết nối nếu server phản hồi quá chậm. |
| **`Promise.any()`** | Khi có **1 Promise đầu tiên** trong mảng thành công (`fulfilled`). | Khi **tất cả** các Promise trong mảng đều thất bại hoàn toàn (`rejected`). Trả về một `AggregateError`. | **Hệ thống dự phòng (Redundancy):** Gọi dữ liệu từ 3 máy chủ sao lưu (CDN) khác nhau cùng lúc. Chỉ cần máy chủ nào phản hồi file thành công nhanh nhất là lấy dữ liệu luôn. |

---

1. Kịch bản `Promise.all`
```javascript
async function loadProductPage(productId) {
    try {
        // Cần cả thông tin gốc lẫn bình luận mới dựng được trang sản phẩm chỉnh chu
        const [productInfo, comments] = await Promise.all([
            fetch(`/api/products/${productId}`).then(res => res.json()),
            fetch(`/api/products/${productId}/comments`).then(res => res.json())
        ]);
        console.log("Render trang sản phẩm hoàn chỉnh:", productInfo, comments);
    } catch (error) {
        console.error("Xảy ra lỗi nghiêm trọng, hủy dựng trang:", error);
    }
}
```
2. Kịch bản `Promise.allSettled`
```JavaScript
async function syncDashboardWidgets() {
    const widgets = [
        { id: 'weather', url: '/api/weather' },
        { id: 'news', url: '/api/news' },
        { id: 'stocks', url: '/api/stocks' }
    ];

    const results = await Promise.allSettled(widgets.map(w => fetch(w.url).then(r => r.json())));

    results.forEach((result, index) => {
        const widgetId = widgets[index].id;
        if (result.status === "fulfilled") {
            renderWidgetSuccess(widgetId, result.value);
        } else {
            renderWidgetError(widgetId, "Không thể kết nối dữ liệu");
        }
    });
}
```
3. Kịch bản `Promise.race`
```JavaScript
async function requestWithTimeout(apiUrl) {
    const timeoutTrigger = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Kết nối mạng quá tải, mạng chậm!")), 5000)
    );

    try {
        // Cuộc đua xem API phản hồi trước hay bộ đếm 5 giây hết giờ trước
        const data = await Promise.race([
            fetch(apiUrl).then(res => res.json()),
            timeoutTrigger
        ]);
        console.log("Xử lý dữ liệu nhận được thành công:", data);
    } catch (error) {
        console.error("Lỗi chặn trạng thái:", error.message);
    }
}
```
4. Kịch bản `Promise.any`
```JavaScript
async function fetchImageFromFastestCDN(imageId) {
    const cdns = [
        `https://cdn-asia.example.com/images/${imageId}`,
        `https://cdn-europe.example.com/images/${imageId}`,
        `https://cdn-us.example.com/images/${imageId}`
    ];

    try {
        // Chỉ cần 1 trong các server phân giải file thành công nhanh nhất là lấy luôn
        const fastestResponse = await Promise.any(cdns.map(url => fetch(url).then(res => {
            if (!res.ok) throw new Error();
            return res.blob();
        })));
        
        const imgUrl = URL.createObjectURL(fastestResponse);
        document.querySelector('#main-banner').src = imgUrl;
    } catch (aggregateError) {
        console.error("Tất cả các server CDN dự phòng đều mất kết nối!", aggregateError.errors);
    }
}
```