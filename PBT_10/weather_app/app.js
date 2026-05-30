const form = document.querySelector('#searchForm');
const cityInput = document.querySelector('#cityInput');
const historyList = document.querySelector('#historyList');

const loadingState = document.querySelector('#loadingState');
const errorState = document.querySelector('#errorState');
const successState = document.querySelector('#successState');

let searchHistory = JSON.parse(localStorage.getItem('weather_history')) || [];

function saveHistory(city) {
    city = city.trim();
    if (!city) return;
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== city.toLowerCase());
    searchHistory.unshift(city);
    if (searchHistory.length > 5) searchHistory.pop();
    localStorage.setItem('weather_history', JSON.stringify(searchHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    searchHistory.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'hist-btn';
        btn.textContent = city;
        btn.addEventListener('click', () => fetchWeather(city));
        historyList.appendChild(btn);
    });
}

async function fetchWeather(city) {
    if (!city.trim()) return;
    
    // Switch state sang Loading
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    successState.classList.add('hidden');

    try {
        // Dùng wttr.in format JSON v2 ổn định
        const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!res.ok) throw new Error('Không thể tìm thấy thông tin thành phố');
        
        const data = await res.json();
        
        // Cập nhật giao diện Success
        document.querySelector('#cityName').textContent = data.nearest_area[0].areaName[0].value;
        document.querySelector('#tempDisplay').textContent = `${data.current_condition[0].temp_C}°C`;
        document.querySelector('#weatherDesc').textContent = data.current_condition[0].lang_vnm?.[0]?.value || data.current_condition[0].weatherDesc[0].value;
        document.querySelector('#humidityDisplay').textContent = `${data.current_condition[0].humidity}%`;
        
        // Chuyển đổi icon cơ bản
        const code = data.current_condition[0].weatherCode;
        document.querySelector('#weatherIcon').textContent = code === "113" ? "☀️" : "☁️";

        loadingState.classList.add('hidden');
        successState.classList.remove('hidden');
        saveHistory(city);
    } catch (err) {
        loadingState.classList.add('hidden');
        errorState.classList.remove('hidden');
        errorState.querySelector('.error-txt').textContent = !navigator.onLine ? 'Mất kết nối Internet.' : err.message;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchWeather(cityInput.value);
    cityInput.value = '';
});

// Initial
renderHistory();
if(searchHistory.length > 0) fetchWeather(searchHistory[0]);
