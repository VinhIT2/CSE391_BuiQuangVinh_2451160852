let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const todoCount = document.querySelector('#todoCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompletedBtn');

function saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
    todoList.innerHTML = '';
    
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// Add Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    
    todos.push({ id: Date.now(), text, completed: false });
    todoInput.value = '';
    saveToStorage();
    render();
});

// Event Delegation cho #todoList
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = parseInt(li.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        saveToStorage();
        render();
    } else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveToStorage();
        render();
    }
});

// Double Click để Edit
todoList.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('todo-text')) return;
    const li = e.target.closest('.todo-item');
    const id = parseInt(li.dataset.id);
    const todo = todos.find(t => t.id === id);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = todo.text;

    li.replaceChild(input, e.target);
    input.focus();

    const saveEdit = () => {
        const newValue = input.value.trim();
        if (newValue) {
            todo.text = newValue;
            saveToStorage();
        } else {
            todos = todos.filter(t => t.id !== id);
            saveToStorage();
        }
        render();
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') saveEdit();
    });
});

// Filters
document.querySelector('.filters').addEventListener('click', (e) => {
    if (!e.target.classList.contains('filter-btn')) return;
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    render();
});

// Clear Completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveToStorage();
    render();
});

// Initial Render
render();