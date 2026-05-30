const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 26990000, category: "phone", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 3, name: "MacBook Air M3", price: 27990000, category: "laptop", image: "https://placehold.co/200", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 13", price: 34500000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: false },
    { id: 5, name: "iPad Pro M4", price: 25490000, category: "tablet", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 6, name: "Galaxy Tab S9", price: 16990000, category: "tablet", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 7, name: "Sony WH-1000XM5", price: 6890000, category: "audio", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 8, name: "AirPods Pro 2", price: 5990000, category: "audio", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 9, name: "Google Pixel 9", price: 19800000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 10, name: "Asus ROG Zephyrus", price: 41900000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 11, name: "Marshall Motif II", price: 4990000, category: "audio", image: "https://placehold.co/200", rating: 4.3, inStock: false },
    { id: 12, name: "Xiaomi Pad 6", price: 7490000, category: "tablet", image: "https://placehold.co/200", rating: 4.5, inStock: true }
];

let cartCount = 0;
let searchKeyword = "";
let selectedCategory = "all";
let activeSort = "default";

const productGrid = document.querySelector("#productGrid");
const searchBar = document.querySelector("#searchBar");
const sortSelect = document.querySelector("#sortSelect");
const categoryFilters = document.querySelector("#categoryFilters");
const cartBadge = document.querySelector("#cartBadge");
const themeToggle = document.querySelector("#themeToggle");
const modal = document.querySelector("#productModal");

function renderProducts() {
    productGrid.innerHTML = "";
    
    let displayProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (selectedCategory === "all" || p.category === selectedCategory)
    );

    if (activeSort === "price-asc") displayProducts.sort((a,b) => a.price - b.price);
    else if (activeSort === "price-desc") displayProducts.sort((a,b) => b.price - a.price);
    else if (activeSort === "name-asc") displayProducts.sort((a,b) => a.name.localeCompare(b.name));
    else if (activeSort === "rating-desc") displayProducts.sort((a,b) => b.rating - a.rating);

    displayProducts.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <div class="price">${p.price.toLocaleString('vi-VN')} đ</div>
            <div>⭐ ${p.rating} | ${p.inStock ? 'Còn hàng' : 'Hết hàng'}</div>
            <button class="add-to-cart" ${!p.inStock ? 'disabled' : ''} data-id="${p.id}">Thêm giỏ</button>
        `;
        card.addEventListener('click', (e) => {
            if(e.target.tagName !== 'BUTTON') showModal(p);
        });
        productGrid.appendChild(card);
    });
}

// Event Delegation cho Thêm giỏ hàng
productGrid.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-to-cart')) {
        cartCount++;
        cartBadge.textContent = cartCount;
    }
});

function showModal(product) {
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${product.name}</h3>
            <img src="${product.image}" style="max-width:100%">
            <p>Phân loại: ${product.category.toUpperCase()}</p>
            <p>Đánh giá: ${product.rating} / 5.0</p>
            <p class="price">Giá: ${product.price.toLocaleString('vi-VN')} đ</p>
        </div>
    `;
    modal.classList.remove('hidden');
    modal.querySelector('.close-modal').addEventListener('click', () => modal.classList.add('hidden'));
}

searchBar.addEventListener('input', (e) => { searchKeyword = e.target.value; renderProducts(); });
sortSelect.addEventListener('change', (e) => { activeSort = e.target.value; renderProducts(); });
categoryFilters.addEventListener('click', (e) => {
    if(!e.target.classList.contains('cat-btn')) return;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    selectedCategory = e.target.dataset.cat;
    renderProducts();
});

themeToggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
window.addEventListener('click', (e) => { if(e.target === modal) modal.classList.add('hidden'); });

renderProducts();