const images = [
    { id: 10, alt: "Mountain landscape" }, { id: 20, alt: "Dry balance leaf" },
    { id: 30, alt: "Keyboards tech" }, { id: 40, alt: "Cats profile" },
    { id: 50, alt: "Ocean sea depth" }
];
let currentIndex = 0;
let slideshowInterval = null;

const commands = [
    { name: "Switch to Dark Mode", action: () => document.body.classList.add('dark-mode') },
    { name: "Switch to Light Mode", action: () => document.body.classList.remove('dark-mode') },
    { name: "Next Image", action: () => navigateGallery(1) },
    { name: "Previous Image", action: () => navigateGallery(-1) },
    { name: "Reset Gallery Index", action: () => jumpToImage(0) }
];

const imgEl = document.getElementById('galleryImg');
const indicatorsContainer = document.getElementById('indicators');
const palette = document.getElementById('palette');
const paletteInput = document.getElementById('paletteInput');
const commandList = document.getElementById('commandList');
let selectedCommandIndex = 0;

// Setup UI Components
images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => jumpToImage(i));
    indicatorsContainer.appendChild(dot);
});

function updateGallery() {
    imgEl.src = `https://picsum.photos/id/${images[currentIndex].id}/500/300`;
    imgEl.alt = images[currentIndex].alt;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function navigateGallery(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    updateGallery();
}

function jumpToImage(idx) {
    if(idx >= 0 && idx < images.length) { currentIndex = idx; updateGallery(); }
}

// Global Hotkeys
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
    }
    if (palette.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') navigateGallery(1);
        if (e.key === 'ArrowLeft') navigateGallery(-1);
        if (e.key === ' ') { e.preventDefault(); toggleSlideshow(); }
        if (e.key >= '1' && e.key <= '9') jumpToImage(parseInt(e.key) - 1);
    } else {
        if (e.key === 'Escape') closePalette();
        if (e.key === 'ArrowDown') movePaletteSelect(1);
        if (e.key === 'ArrowUp') movePaletteSelect(-1);
        if (e.key === 'Enter') { e.preventDefault(); executeSelectedCommand(); }
    }
});

function toggleSlideshow() {
    if (slideshowInterval) { clearInterval(slideshowInterval); slideshowInterval = null; } 
    else { slideshowInterval = setInterval(() => navigateGallery(1), 2000); }
}

// Palette Mechanics
function openPalette() {
    palette.classList.remove('hidden'); paletteInput.value = ""; paletteInput.focus(); renderCommands();
}
function closePalette() { palette.classList.add('hidden'); }

function renderCommands() {
    commandList.innerHTML = "";
    const filter = paletteInput.value.toLowerCase();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(filter));
    
    filtered.forEach((cmd, idx) => {
        const li = document.createElement('li');
        li.className = `command-item ${idx === selectedCommandIndex ? 'selected' : ''}`;
        li.textContent = cmd.name;
        li.addEventListener('click', () => { cmd.action(); closePalette(); });
        commandList.appendChild(li);
    });
}

function movePaletteSelect(dir) {
    const items = commandList.querySelectorAll('.command-item');
    if (!items.length) return;
    selectedCommandIndex = (selectedCommandIndex + dir + items.length) % items.length;
    renderCommands();
}

function executeSelectedCommand() {
    const filter = paletteInput.value.toLowerCase();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(filter));
    if (filtered[selectedCommandIndex]) { filtered[selectedCommandIndex].action(); closePalette(); }
}

paletteInput.addEventListener('input', () => { selectedCommandIndex = 0; renderCommands(); });
palette.addEventListener('click', (e) => { if (e.target === palette) closePalette(); });