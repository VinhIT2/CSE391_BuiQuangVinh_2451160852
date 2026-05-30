const form = document.getElementById('regForm');
const fields = {
    username: { el: document.getElementById('username'), valid: false },
    email: { el: document.getElementById('email'), valid: false },
    password: { el: document.getElementById('password'), valid: false },
    confirmPassword: { el: document.getElementById('confirmPassword'), valid: false },
    phone: { el: document.getElementById('phone'), valid: false }
};
const submitBtn = document.getElementById('submitBtn');

function setStatus(field, isValid, msg = '') {
    field.valid = isValid;
    const parent = field.el.closest('.form-group');
    const errEl = parent.querySelector('.error-msg');
    const iconEl = parent.querySelector('.status-icon');
    
    if (isValid) {
        field.el.classList.remove('invalid');
        field.el.classList.add('valid');
        if(errEl) errEl.textContent = '';
        iconEl.textContent = '✅';
    } else {
        field.el.classList.remove('valid');
        field.el.classList.add('invalid');
        if(errEl) errEl.textContent = msg;
        iconEl.textContent = '❌';
    }
    checkFormValidity();
}

function checkFormValidity() {
    const allValid = Object.values(fields).every(f => f.valid);
    submitBtn.disabled = !allValid;
}

// 1. Username
fields.username.el.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) setStatus(fields.username, true);
    else setStatus(fields.username, false, 'Tên phải từ 2 đến 50 ký tự');
});

// 2. Email
fields.email.el.addEventListener('input', (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(e.target.value)) setStatus(fields.email, true);
    else setStatus(fields.email, false, 'Email không hợp lệ');
});

// 3. Password Strength
fields.password.el.addEventListener('input', (e) => {
    const val = e.target.value;
    const bar = document.getElementById('strengthBar');
    const txt = document.getElementById('strengthText');
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if(val.length === 0) { bar.style.width = '0'; txt.textContent=''; setStatus(fields.password, false); }
    else if(val.length < 8) { bar.style.width = '33%'; bar.style.background = '#ef4444'; txt.textContent='Yếu'; setStatus(fields.password, false); }
    else if(score <= 2) { bar.style.width = '66%'; bar.style.background = '#eab308'; txt.textContent='Trung bình'; setStatus(fields.password, true); }
    else { bar.style.width = '100%'; bar.style.background = '#22c55e'; txt.textContent='Mạnh'; setStatus(fields.password, true); }

    // Trigger check lại confirm password khi đổi pass chính
    fields.confirmPassword.el.dispatchEvent(new Event('input'));
});

// 4. Confirm Password
fields.confirmPassword.el.addEventListener('input', (e) => {
    if (e.target.value === fields.password.el.value && e.target.value !== '') setStatus(fields.confirmPassword, true);
    else setStatus(fields.confirmPassword, false, 'Mật khẩu không khớp');
});

// 5. Phone Autocomplete Format
fields.phone.el.addEventListener('input', (e) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 10) raw = raw.substring(0, 10);
    
    let formatted = "";
    if (raw.length > 7) formatted = `${raw.slice(0,4)}-${raw.slice(4,7)}-${raw.slice(7)}`;
    else if (raw.length > 4) formatted = `${raw.slice(0,4)}-${raw.slice(4)}`;
    else formatted = raw;

    e.target.value = formatted;
    if(raw.length === 10) setStatus(fields.phone, true);
    else setStatus(fields.phone, false, 'Số điện thoại cần đủ 10 chữ số');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Đăng ký thành công!\nTên: ${fields.username.el.value}\nEmail: ${fields.email.el.value}`);
});