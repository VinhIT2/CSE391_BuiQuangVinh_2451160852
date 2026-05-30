const widgets = [
    {
        url: "https://jsonplaceholder.typicode.com/users?_limit=3",
        render: (data, container) => {
            container.innerHTML = data.map(u => `<p style="margin:6px 0;"><strong>${u.name}</strong> (${u.email})</p>`).join('');
        }
    },
    {
        url: "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true",
        render: (data, container) => {
            const cw = data.current_weather;
            container.innerHTML = `<h2 style="margin:0; color:#4f46e5;">${cw.temperature}°C</h2><p style="margin:4px 0;">Tốc độ gió: ${cw.windspeed} km/h</p>`;
        }
    },
    {
        url: "https://dog.ceo/api/breeds/image/random",
        render: (data, container) => {
            container.innerHTML = `<img src="${data.message}" class="dog-img" alt="Lucky Dog">`;
        }
    }
];

async function loadDashboard() {
    const startTime = Date.now();
    document.querySelector('#loadTimeDisplay').textContent = "Đang đồng bộ dữ liệu...";

    // Đưa tất cả các widget về trạng thái Loading riêng biệt ban đầu
    widgets.forEach((_, idx) => {
        document.querySelector(`#widget-${idx} .widget-content`).innerHTML = '<div class="w-loading">Đang nạp dữ liệu...</div>';
    });

    // Thực hiện gọi các API song song độc lập hoàn toàn với Promise.allSettled
    const results = await Promise.allSettled(
        widgets.map(w => fetch(w.url).then(r => {
            if(!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        }))
    );

    // Duyệt qua kết quả trả về để map chính xác vào UI từng block
    results.forEach((result, index) => {
        const container = document.querySelector(`#widget-${index} .widget-content`);
        if (result.status === "fulfilled") {
            widgets[index].render(result.value, container);
        } else {
            container.innerHTML = `<div class="w-error">❌ Lỗi kết nối dữ liệu<br><small>${result.reason.message}</small></div>`;
        }
    });

    document.querySelector('#loadTimeDisplay').textContent = `Thời gian tải: ${Date.now() - startTime} ms`;
}

document.querySelector('#refreshAllBtn').addEventListener('click', loadDashboard);

// Khởi chạy hệ thống dashboard lần đầu
loadDashboard();
