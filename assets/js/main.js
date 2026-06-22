// --- 1. JS INTERSECTION OBSERVER (Pengganti animasi CSS berat) ---
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    hiddenElements.forEach((el) => observer.observe(el));
});

// --- 2. SCRIPT COVER & AUDIO ---
window.onbeforeunload = function () { window.scrollTo(0, 0); };

function openEnvelopeFlap() { document.getElementById('cover-screen').classList.add('envelope-opened'); }

// --- 1. FUNGSI KLIK AMPLOP ---
function enterWebsite() {
    let screen = document.getElementById('cover-screen');
    if (screen) {
        screen.classList.add('fade-out-cover');
        setTimeout(() => { screen.style.display = 'none'; }, 1200);
    }
    
    document.body.style.overflowY = 'auto'; 
    
    let musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.style.opacity = '1'; 
        musicBtn.style.pointerEvents = 'auto';
        musicBtn.classList.remove("paused"); 
    }
    
    let audio = document.getElementById("bgMusic");
    if (audio) {
        audio.play().catch(e => console.log("Auto-play prevented by browser."));
    }
    
    isPlaying = true;
    
    // --- INI KUNCI ANIMASINYA! (Menembakkan class start-anim) ---
    setTimeout(() => {
        let hero = document.getElementById('main-content');
        if (hero) hero.classList.add('start-anim');
    }, 500); 
}

// --- 2. KODE PELINDUNG (BUAT TESTING) ---
// Kalau Raka lagi menyembunyikan amplop depan buat ngetes, animasi tetap otomatis jalan!
document.addEventListener("DOMContentLoaded", function() {
    let screen = document.getElementById('cover-screen');
    // Ngecek kalau amplopnya dihapus atau di-display: none
    if (!screen || window.getComputedStyle(screen).display === 'none' || screen.classList.contains('fade-out-cover')) {
        
        // MUNCULKAN TOMBOL MUSIK
        let musicBtn = document.getElementById('musicBtn');
        if (musicBtn) {
            musicBtn.style.opacity = '1'; 
            musicBtn.style.pointerEvents = 'auto';
            // Sengaja tidak di-play otomatis di sini, karena browser sering memblokir autoplay tanpa interaksi user.
            // Biarkan user mengklik play sendiri.
        }

        setTimeout(() => {
            let hero = document.getElementById('main-content');
            if (hero) hero.classList.add('start-anim');
        }, 500);
    }
});

var myAudio = document.getElementById("bgMusic"); var isPlaying = false;
function toggleAudio() { var btn = document.getElementById("musicBtn"); if (isPlaying) { myAudio.pause(); btn.classList.add("paused"); btn.innerHTML = '<i class="fas fa-play"></i>'; } else { myAudio.play(); btn.classList.remove("paused"); btn.innerHTML = '<i class="fas fa-compact-disc"></i>'; } isPlaying = !isPlaying; }

// --- 3. COPY REKENING ---
function copyRekening(id) {
    var r = document.createRange(); r.selectNode(document.getElementById(id)); window.getSelection().removeAllRanges(); window.getSelection().addRange(r); document.execCommand('copy'); window.getSelection().removeAllRanges(); alert('Nomor rekening berhasil disalin!');
}

// --- 5. COUNTDOWN TANGGAL KHITAN ---
// Countdown diubah ke tanggal Syukuran (4 Juli 2026, pukul 11:00)
var countDownDate = new Date("Jul 04, 2026 11:00:00").getTime(); 
var x = setInterval(function() {
    var now = new Date().getTime(); var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24)); var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerHTML = days < 10 ? '0'+days : days; 
    document.getElementById("hours").innerHTML = hours < 10 ? '0'+hours : hours; 
    document.getElementById("minutes").innerHTML = minutes < 10 ? '0'+minutes : minutes; 
    document.getElementById("seconds").innerHTML = seconds < 10 ? '0'+seconds : seconds;
    
    if (distance < 0) { clearInterval(x); document.getElementById("countdown").innerHTML = "<h3 class='font-serif'>Acara Sedang Berlangsung</h3>"; }
}, 1000);

// --- SCRIPT CATEGORY LIGHTBOX GALLERY ---
const galleryCategories = {
    'masa_kecil': [
        { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000", caption: "Masa Kecil - Lincah & Menggemaskan" },
        { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000", caption: "Masa Kecil - Canda Tawa" }
    ],
    'hobi': [
        { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000", caption: "Hobi Rasya - Merakit Mainan" },
        { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000", caption: "Hobi Rasya - Berpetualang" }
    ],
    'keluarga': [
        { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000", caption: "Keluarga - Harmonis" },
        { src: "https://images.unsplash.com/photo-1505902722411-e630cbde6862?q=80&w=1000", caption: "Keluarga - Penuh Kasih Sayang" }
    ],
    'senyum': [
        { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000", caption: "Senyum Ceria - Hari Ini" },
        { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000", caption: "Senyum Ceria - Bahagia" }
    ]
};

let activeGallery = [];
let currentImageIndex = 0;

function openLightbox(categoryKey) { 
    activeGallery = galleryCategories[categoryKey];
    currentImageIndex = 0; 
    updateLightboxContent(); 
    document.getElementById('lightbox').classList.add('show'); 
    document.body.style.overflow = 'hidden'; 
}

function closeLightbox(event) { 
    if (event.target.id === 'lightbox' || event.target.classList.contains('close-lightbox')) { 
        document.getElementById('lightbox').classList.remove('show'); 
        document.body.style.overflow = 'auto'; 
    } 
}

function changeImage(step, event) { 
    event.stopPropagation(); 
    let imgEl = document.getElementById('lightbox-img'); 
    imgEl.style.animation = 'none'; 
    imgEl.offsetHeight; 
    imgEl.style.animation = null; 
    
    currentImageIndex += step; 
    if (currentImageIndex >= activeGallery.length) currentImageIndex = 0; 
    if (currentImageIndex < 0) currentImageIndex = activeGallery.length - 1; 
    
    updateLightboxContent(); 
}

function updateLightboxContent() { 
    document.getElementById('lightbox-img').src = activeGallery[currentImageIndex].src; 
    document.getElementById('lightbox-caption').innerText = activeGallery[currentImageIndex].caption; 
    document.getElementById('lightbox-counter').innerText = `Foto ${currentImageIndex + 1} dari ${activeGallery.length}`;
}

// --- SCRIPT AUTO-FOCUS KARTU GALERI SAAT DI-SCROLL ---
document.addEventListener("DOMContentLoaded", function() {
    // Margin dipersempit menjadi -45% agar ketrigger PAS di tengah layar
    const cardOptions = {
        root: null,
        rootMargin: "-49% 0px -49% 0px", // Dipersempit jadi 49% atas dan bawah
        threshold: 0
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('focus-card');
            } else {
                entry.target.classList.remove('focus-card');
            }
        });
    }, cardOptions);

    const cards = document.querySelectorAll('.stack-card-wrapper');
    cards.forEach((card) => {
        cardObserver.observe(card);
    });
});