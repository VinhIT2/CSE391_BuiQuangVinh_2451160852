const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if(!res.ok) throw new Error("Không thể tải danh sách users");
        return res.json();
    },
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if(!res.ok) throw new Error("Lỗi khi tạo user");
        return res.json();
    },
    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if(!res.ok) throw new Error("Lỗi khi cập nhật user");
        return res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, { method: 'DELETE' });
        if(!res.ok) throw new Error("Lỗi khi xóa user");
        return true;
    }
};

const ui = {
    container: document.querySelector('#userContainer'),
    modal: document.querySelector('#userModal'),
    form: document.querySelector('#userForm'),
    toast: document.querySelector('#toast'),
    
    showLoading() {
        this.container.innerHTML = Array(6).fill('<div class="skeleton"></div>').join('');
    },
    showToast(msg, type = 'success') {
        this.toast.textContent = msg;
        this.toast.className = `toast ${type}`;
        setTimeout(() => this.toast.className = 'toast hidden', 3000);
    },
    renderUsers(usersToRender) {
        this.container.innerHTML = '';
        usersToRender.forEach(u => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.dataset.id = u.id;
            card.innerHTML = `
                <h4>${u.name}</h4>
                <p>✉️ ${u.email}</p>
                <div class="card-actions">
                    <button class="btn-edit">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    }
};

let localUsers = [];

// Load App Data
async function initApp() {
    ui.showLoading();
    try {
        localUsers = await api.getUsers();
        ui.renderUsers(localUsers);
    } catch (err) {
        ui.showToast(err.message, 'error');
    }
}

// Event Delegation Xử lý Sửa / Xóa
ui.container.addEventListener('click', async (e) => {
    const card = e.target.closest('.user-card');
    if(!card) return;
    const id = parseInt(card.dataset.id);

    if (e.target.classList.contains('btn-delete')) {
        if(confirm("Bạn có chắc chắn muốn xóa user này?")) {
            try {
                await api.deleteUser(id);
                localUsers = localUsers.filter(u => u.id !== id);
                ui.renderUsers(localUsers);
                ui.showToast("Xóa thành công!");
            } catch(err) { ui.showToast(err.message, 'error'); }
        }
    } else if (e.target.classList.contains('btn-edit')) {
        const targetUser = localUsers.find(u => u.id === id);
        document.querySelector('#modalTitle').textContent = "Cập nhật User";
        document.querySelector('#userIdField').value = targetUser.id;
        document.querySelector('#formName').value = targetUser.name;
        document.querySelector('#formEmail').value = targetUser.email;
        ui.modal.classList.remove('hidden');
    }
});

// Submit Form (Cả Add và Edit)
ui.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.querySelector('#userIdField').value;
    const name = document.querySelector('#formName').value;
    const email = document.querySelector('#formEmail').value;
    const payload = { name, email };

    try {
        if(id) { // Case Update
            await api.updateUser(id, payload);
            const userIndex = localUsers.findIndex(u => u.id === parseInt(id));
            localUsers[userIndex] = { ...localUsers[userIndex], ...payload };
            ui.showToast("Cập nhật thông tin thành công!");
        } else { // Case Create
            const newUser = await api.createUser(payload);
            // JSONPlaceholder luôn trả về id 11 do fake database
            newUser.id = Date.now(); 
            localUsers.unshift(newUser);
            ui.showToast("Thêm mới thành công!");
        }
        ui.renderUsers(localUsers);
        ui.modal.classList.add('hidden');
        ui.form.reset();
    } catch(err) { ui.showToast(err.message, 'error'); }
});

// Search realtime
document.querySelector('#searchUser').addEventListener('input', (e) => {
    const kw = e.target.value.toLowerCase();
    const filtered = localUsers.filter(u => u.name.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw));
    ui.renderUsers(filtered);
});

// Trạng thái hiển thị đóng mở Modal cơ bản
document.querySelector('#openAddModalBtn').addEventListener('click', () => {
    document.querySelector('#modalTitle').textContent = "Thêm Người Dùng";
    document.querySelector('#userIdField').value = "";
    ui.form.reset();
    ui.modal.classList.remove('hidden');
});
document.querySelector('#closeModalBtn').addEventListener('click', () => ui.modal.classList.add('hidden'));

initApp();