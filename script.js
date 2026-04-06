// Data karakter dengan gambar dari Pinterest
const characters = [
    { name: "Cai Lin / Medusa", desc: "Ratu Suku Ular, Dou Huang, istri pertama Xiao Yan. Kecantikan mematikan.", fav: 1, img: "images/medusa.jpeg" },
    { name: "Xun'er", desc: "Api Emas Klan Gu, setia dan sangat kuat. Memiliki darah dewa.", fav: 2, img: "images/xun'er.jpeg" },
    { name: "Xiao Yi Xian", desc: "Naga Racun Surgawi, evolusi mematikan. Tragis namun luar biasa.", fav: 3, img: "images/xiaoyixian.jpeg" },
    { name: "Xiao Yan", desc: "Protagonis, dari 'sampah' menjadi Dou Di. Api Buddha.", fav: 0, img: "images/xiaoyan.jpeg" },
    { name: "Yao Lao", desc: "Alkemis legendaris, mentor Xiao Yan. Roh dalam cincin.", fav: 0, img: "images/yaolao.jpeg" },
    { name: "Nalan Yanran", desc: "Tunangan yang pernah menghina Xiao Yan, kemudian menyesal.", fav: 0, img: "images/nalan.jpeg" },
    { name: "Yun Yun", desc: "Pemimpin Sekte Yun Lan, hubungan rumit dengan Xiao Yan.", fav: 0, img: "images/yunyun.jpeg" },
    { name: "Hai Bodong", desc: "Dou Huang es, teman setia Xiao Yan di awal cerita.", fav: 0, img: "images/haibodong.jpeg" }
];

// Data galeri
const galleryImages = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg",
    "images/4.jpeg",
    "images/5.jpeg",
    "images/6.jpeg",
    "images/7.jpeg",
    "images/8.jpeg"
];

// Render karakter
const charGrid = document.getElementById('charGrid');
characters.forEach(char => {
    const card = document.createElement('div');
    card.className = 'char-card';
    if (char.fav >= 1) card.setAttribute('data-fav', char.fav);
    let favHtml = '';
    if (char.fav === 1) favHtml = '<div class="fav-badge">⭐ Favorit #1</div>';
    else if (char.fav === 2) favHtml = '<div class="fav-badge">✨ Favorit #2</div>';
    else if (char.fav === 3) favHtml = '<div class="fav-badge">🔥 Favorit #3</div>';
    
    card.innerHTML = `
        <img class="char-img" src="${char.img}" alt="${char.name}" loading="lazy" onerror="this.src='https://placehold.co/400x500/1e1a2e/a855f7?text=${encodeURIComponent(char.name)}'">
        <div class="char-info">
            <div class="char-name">${char.name}</div>
            <div class="char-desc">${char.desc}</div>
            ${favHtml}
            <button class="share-btn" data-name="${char.name}"><i class="fas fa-share-alt"></i> Share</button>
        </div>
    `;
    charGrid.appendChild(card);
});

// Share + Confetti
function shootConfetti() {
    const colors = ['#a855f7', '#7c3aed', '#c084fc', '#e0c3ff'];
    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed';
        conf.style.width = Math.random() * 8 + 4 + 'px';
        conf.style.height = Math.random() * 8 + 4 + 'px';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = (window.innerWidth / 2) + 'px';
        conf.style.top = (window.innerHeight / 2) + 'px';
        conf.style.borderRadius = '50%';
        conf.style.pointerEvents = 'none';
        conf.style.zIndex = '10001';
        conf.style.opacity = '0.8';
        document.body.appendChild(conf);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 3;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity - 5;
        let gravity = 0.2;
        let life = 100;
        
        function animateConfetti() {
            if (life <= 0 || conf.style.opacity === '0') {
                conf.remove();
                return;
            }
            const left = parseFloat(conf.style.left);
            const top = parseFloat(conf.style.top);
            conf.style.left = (left + vx) + 'px';
            conf.style.top = (top + vy) + 'px';
            vy += gravity;
            life--;
            conf.style.opacity = life / 100;
            requestAnimationFrame(animateConfetti);
        }
        animateConfetti();
    }
}

document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = btn.getAttribute('data-name');
        const text = `Karakter favoritku di BTTH adalah ${name}! Yuk lihat website kerennya 🔥`;
        if (navigator.share) {
            navigator.share({ title: 'BTTH Fan Page', text: text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text + ' ' + window.location.href);
            alert('Teks berhasil disalin! Bagikan ke temanmu.');
        }
        shootConfetti();
    });
});

// Render galeri
const galleryGrid = document.getElementById('galleryGrid');
galleryImages.forEach(src => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${src}" alt="gallery" loading="lazy" onerror="this.src='https://placehold.co/400x300/1e1a2e/a855f7?text=BTTH'">`;
    galleryGrid.appendChild(item);
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.querySelector('.close');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });
}

const allGalleryImgs = document.querySelectorAll('.gallery-item img');
allGalleryImgs.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
});

// Partikel ungu (canvas)
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 4 + 1;
            this.speedY = Math.random() * 0.8 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.color = `rgba(168, 85, 247, ${Math.random() * 0.5 + 0.2})`;
        }
        update() {
            this.x += this.speedX;
            this.y -= this.speedY;
            if (this.y < 0) this.y = height;
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Smooth scroll & active nav
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Easter Egg
let secretWord = '';
window.addEventListener('keydown', (e) => {
    secretWord += e.key.toLowerCase();
    if (secretWord.includes('dou di') || secretWord.includes('yanyan')) {
        const toast = document.getElementById('easterEggToast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
        secretWord = '';
    }
    if (secretWord.length > 10) secretWord = secretWord.slice(-5);
});

// Typing effect
const textArray = ["Kisah kebangkitan dari yang terbuang menjadi legenda", "Api Buddha yang membakar langit", "Perjalanan menuju puncak Dou Di"];
let textIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    if (!typingElement) return;
    if (charIndex < textArray[textIndex].length) {
        typingElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    if (!typingElement) return;
    if (charIndex > 0) {
        typingElement.innerHTML = textArray[textIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(eraseEffect, 40);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeEffect, 500);
    }
}
if (typingElement) typeEffect();

// Scroll reveal (fade-up)
const fadeElements = document.querySelectorAll('.char-card, .gallery-item, .sinopsis-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
fadeElements.forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// Back to Top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Morphing Background
const morphDiv = document.createElement('div');
morphDiv.classList.add('morphing-bg');
document.body.insertBefore(morphDiv, document.body.firstChild);

// Particle Explosion on Card Click
function createParticleExplosion(x, y) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 8 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = `hsl(${Math.random() * 60 + 260}, 80%, 65%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10001';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;
        let life = 1;
        let opacity = 1;
        
        function animateParticle() {
            if (life <= 0) {
                particle.remove();
                return;
            }
            const left = parseFloat(particle.style.left);
            const top = parseFloat(particle.style.top);
            particle.style.left = (left + vx) + 'px';
            particle.style.top = (top + vy) + 'px';
            vy += 0.15;
            life -= 0.02;
            opacity -= 0.02;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${life})`;
            requestAnimationFrame(animateParticle);
        }
        animateParticle();
    }
}

document.querySelectorAll('.char-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        createParticleExplosion(centerX, centerY);
    });
});

// Card Tilt 3D
const cards = document.querySelectorAll('.char-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Ripple Effect on Click
document.body.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
});

// Smoke Trail
let lastX = 0, lastY = 0;
document.body.addEventListener('mousemove', (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    if (distance > 15) {
        const smoke = document.createElement('div');
        smoke.classList.add('smoke-particle');
        smoke.style.left = e.clientX + 'px';
        smoke.style.top = e.clientY + 'px';
        document.body.appendChild(smoke);
        setTimeout(() => smoke.remove(), 800);
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

// Mouse Follower
const follower = document.createElement('div');
follower.classList.add('mouse-follower');
document.body.appendChild(follower);
document.addEventListener('mousemove', (e) => {
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});
const hoverElements = document.querySelectorAll('.char-card, .btn, .gallery-item, .nav-links a');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
});

// Rotate Particle Background
let rotation = 0;
setInterval(() => {
    rotation = (rotation + 0.2) % 360;
    if (canvas) {
        canvas.style.transform = `rotate(${rotation}deg)`;
        canvas.style.transition = 'transform 0.1s linear';
    }
}, 100);

// Loading Bar
const loadingBar = document.createElement('div');
loadingBar.classList.add('loading-bar');
document.body.appendChild(loadingBar);
let widthLoading = 0;
const interval = setInterval(() => {
    if (widthLoading >= 100) {
        clearInterval(interval);
        setTimeout(() => loadingBar.style.opacity = '0', 500);
    } else {
        widthLoading += Math.random() * 15;
        if (widthLoading > 100) widthLoading = 100;
        loadingBar.style.width = widthLoading + '%';
    }
}, 200);

// Parallax Hero
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrollY * 0.3 + 'px';
    }
});

// Click Burst (extra)
document.body.addEventListener('click', (e) => {
    for (let i = 0; i < 12; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.width = '4px';
        dot.style.height = '4px';
        dot.style.backgroundColor = '#c084fc';
        dot.style.borderRadius = '50%';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '10000';
        dot.style.opacity = '0.8';
        document.body.appendChild(dot);
        
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 3 + 1;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;
        let life = 30;
        
        function moveDot() {
            if (life <= 0) { dot.remove(); return; }
            let left = parseFloat(dot.style.left);
            let top = parseFloat(dot.style.top);
            dot.style.left = (left + vx) + 'px';
            dot.style.top = (top + vy) + 'px';
            life--;
            dot.style.opacity = life / 30;
            requestAnimationFrame(moveDot);
        }
        moveDot();
    }
});

// ========== FITUR BARU: Timeline, VS Mode, Credits, Splash, Share Website ==========

// 1. Splash Screen
const splash = document.getElementById('splashScreen');
if (splash) {
    setTimeout(() => {
        splash.classList.add('hide');
        setTimeout(() => splash.remove(), 500);
    }, 2000);
}

// 2. Tombol Share Website (opsional, jika ada di HTML)
const shareSiteBtn = document.getElementById('shareSiteBtn');
if (shareSiteBtn) {
    shareSiteBtn.addEventListener('click', () => {
        const url = window.location.href;
        const text = 'Lihat website keren Battle Through the Heavens ini! 🔥';
        if (navigator.share) {
            navigator.share({ title: 'BTTH Fan Page', text: text, url: url });
        } else {
            navigator.clipboard.writeText(text + ' ' + url);
            alert('Link website disalin! Bagikan ke temanmu.');
        }
    });
}

// 3. VS Mode: Data kekuatan karakter
const powerStats = {
    "Cai Lin / Medusa": { level: "Dou Huang", element: "Api Ular", skill: "Mata Medusa", power: 88 },
    "Xiao Xun'er": { level: "Dou Zun", element: "Api Emas", skill: "Palm of Golden Flame", power: 92 },
    "Xiao Yi Xian": { level: "Dou Zong", element: "Racun", skill: "Naga Racun Abadi", power: 85 },
    "Xiao Yan": { level: "Dou Di", element: "Api Buddha", skill: "Flame Emperor", power: 100 },
    "Yao Lao": { level: "Dou Zun", element: "Alkimia", skill: "Bone Chilling Flame", power: 94 },
    "Nalan Yanran": { level: "Dou Wang", element: "Angin", skill: "Feng Li Sword", power: 75 },
    "Yun Yun": { level: "Dou Huang", element: "Angin", skill: "Yun Zhi Secret Art", power: 80 },
    "Hai Bodong": { level: "Dou Huang", element: "Es", skill: "Mysterious Ice Art", power: 82 }
};

function renderCompare(char1Name, char2Name) {
    const char1 = powerStats[char1Name];
    const char2 = powerStats[char2Name];
    const vsChar1Div = document.getElementById('vsChar1Info');
    const vsChar2Div = document.getElementById('vsChar2Info');
    if (vsChar1Div && vsChar2Div && char1 && char2) {
        vsChar1Div.innerHTML = `
            <h3>${char1Name}</h3>
            <p>Level: ${char1.level}</p>
            <p>Elemen: ${char1.element}</p>
            <p>Skill: ${char1.skill}</p>
            <div class="char-power">Power: ${char1.power} / 100</div>
            <progress value="${char1.power}" max="100" style="width:100%; height:8px; border-radius:10px;"></progress>
        `;
        vsChar2Div.innerHTML = `
            <h3>${char2Name}</h3>
            <p>Level: ${char2.level}</p>
            <p>Elemen: ${char2.element}</p>
            <p>Skill: ${char2.skill}</p>
            <div class="char-power">Power: ${char2.power} / 100</div>
            <progress value="${char2.power}" max="100" style="width:100%; height:8px; border-radius:10px;"></progress>
        `;
    }
}

const char1Select = document.getElementById('char1Select');
const char2Select = document.getElementById('char2Select');
const compareBtn = document.getElementById('compareBtn');
if (compareBtn && char1Select && char2Select) {
    compareBtn.addEventListener('click', () => {
        const char1 = char1Select.value;
        const char2 = char2Select.value;
        renderCompare(char1, char2);
    });
    renderCompare(char1Select.value, char2Select.value);
}

// 4. Timeline: efek scroll reveal untuk timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    timelineObserver.observe(item);
});