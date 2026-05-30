let page = 1;
const limit = 20;
const grid = document.querySelector('#imageGrid');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightboxImg');

async function loadMorePhotos() {
    try {
        // Sử dụng API Lorem Picsum thật cho chất lượng hình ảnh ổn định
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error();
        const photos = await res.json();
        
        photos.forEach(photo => {
            const card = document.createElement('div');
            card.className = 'img-card';
            
            // Dùng thuộc tính data-src để hỗ trợ cơ chế Lazy Load
            const img = document.createElement('img');
            img.dataset.src = `https://picsum.photos/id/${photo.id}/600/600`;
            img.alt = `Photo by ${photo.author}`;
            
            card.appendChild(img);
            grid.appendChild(card);
            
            // Đăng ký quan sát phần tử ảnh cho mục đích Lazy Load
            lazyObserver.observe(img);
        });
        page++;
    } catch (err) {
        console.error("Không thể tải thêm hình ảnh.");
    }
}

// 1. Intersection Observer cho Lazy Loading hình ảnh
const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.addEventListener('load', () => img.style.opacity = '1');
            observer.unobserve(img); // Huỷ quan sát khi đã tải xong
        }
    });
});

// 2. Intersection Observer cho Infinite Scroll kích hoạt ở đáy trang
const infiniteObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, { rootMargin: '200px' }); // Load trước khi chạm đáy hẳn 200px

infiniteObserver.observe(document.querySelector("#load-trigger"));

// 3. Lightbox Interaction View
grid.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('.img-card img');
    if(!clickedImg) return;
    lightboxImg.src = clickedImg.src;
    lightbox.classList.remove('hidden');
});

lightbox.querySelector('.close-light').addEventListener('click', () => lightbox.classList.add('hidden'));
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.add('hidden'); });