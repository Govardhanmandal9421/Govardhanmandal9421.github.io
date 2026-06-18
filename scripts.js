/* ============================================================
   PREMIUM PORTFOLIO SCRIPTS - GOVARDHAN MANDAL
   ============================================================ */

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---- Mobile Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ---- Typing Effect ----
const phrases = [
    'AI Engineering Student',
    'Machine Learning Developer',
    'Data Scientist',
    'Django Developer',
    'Problem Solver'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(typeWriter, speed);
}

// Start typing after page load animation
setTimeout(typeWriter, 1200);

// ---- GSAP Scroll Animations ----
gsap.registerPlugin(ScrollTrigger);

// Set initial state via GSAP (overrides CSS)
gsap.set('[data-gsap]', { opacity: 0, y: 40 });

document.querySelectorAll('[data-gsap]').forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Stagger project cards
gsap.set('.project-card', { opacity: 0, y: 50 });
gsap.to('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 85%'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// ---- Skill Bars Animation ----
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ---- NEURAL NETWORK CANVAS - AI VISUALIZATION ----
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const AI_LABELS = ['CNN', 'RNN', 'GPT', 'SVM', 'NLP', 'GAN', 'DL', 'ML', 'ANN', 'LLM', 'ELU', 'BERT'];
const CONN_DIST = 155;
const MOUSE_DIST = 140;
const N_COUNT = 70;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

class Neuron {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 2.2 + 1.1;
        this.baseOpacity = Math.random() * 0.4 + 0.2;
        this.opacity = this.baseOpacity;
        this.fireStrength = 0;
        this.vx = (Math.random() - 0.5) * 0.22;
        this.vy = (Math.random() - 0.5) * 0.22;
        this.color = Math.random() > 0.55 ? '#38bdf8' : (Math.random() > 0.5 ? '#818cf8' : '#34d399');
        this.rgb = this.color === '#38bdf8' ? '56,189,248' : this.color === '#818cf8' ? '129,140,248' : '52,211,153';
        this.label = Math.random() > 0.86 ? AI_LABELS[Math.floor(Math.random() * AI_LABELS.length)] : null;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.018 + Math.random() * 0.015;
    }
    fire() { this.fireStrength = 1; }
    update() {
        this.pulsePhase += this.pulseSpeed;
        this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * 0.12;
        if (this.fireStrength > 0) this.fireStrength -= 0.022;
        if (this.fireStrength < 0) this.fireStrength = 0;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        const fr = this.fireStrength;
        const glowR = fr > 0 ? this.r * (4 + fr * 9) : this.r * 5;
        const glowA = fr > 0 ? fr * 0.75 : this.opacity * 0.22;
        // Glow halo
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowR);
        grd.addColorStop(0, `rgba(${this.rgb},${glowA})`);
        grd.addColorStop(1, `rgba(${this.rgb},0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, fr > 0 ? this.r + fr * 3.5 : this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = fr > 0 ? 0.95 : this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
        // AI label tag
        if (this.label) {
            ctx.font = '8px Space Grotesk, monospace';
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity * 0.65;
            ctx.fillText(this.label, this.x + this.r + 5, this.y + 3);
            ctx.globalAlpha = 1;
        }
    }
}

class Signal {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.progress = 0;
        this.speed = 0.004 + Math.random() * 0.007;
        this.done = false;
        this.rgb = from.rgb;
    }
    update() {
        this.progress += this.speed;
        if (this.progress >= 1) { this.done = true; this.to.fire(); }
    }
    draw() {
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = this.from.y + (this.to.y - this.from.y) * this.progress;
        // Glow trail
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grd.addColorStop(0, `rgba(${this.rgb},0.85)`);
        grd.addColorStop(0.5, `rgba(${this.rgb},0.2)`);
        grd.addColorStop(1, `rgba(${this.rgb},0)`);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        // White hot core
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

let neurons = [];
let signals = [];

function initNeurons() {
    neurons = Array.from({ length: N_COUNT }, () => new Neuron());
    signals = [];
}
initNeurons();

// Random neural firing cascade
function randomFire() {
    if (neurons.length) neurons[Math.floor(Math.random() * neurons.length)].fire();
    setTimeout(randomFire, 280 + Math.random() * 720);
}
setTimeout(randomFire, 900);

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle center glow on black
    const bgGrd = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.75
    );
    bgGrd.addColorStop(0, 'rgba(8,15,35,0.35)');
    bgGrd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw synaptic connections
    for (let i = 0; i < neurons.length; i++) {
        const ni = neurons[i];
        for (let j = i + 1; j < neurons.length; j++) {
            const nj = neurons[j];
            const dx = ni.x - nj.x, dy = ni.y - nj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONN_DIST) {
                const baseA = (1 - dist / CONN_DIST) * 0.1;
                const boost = (ni.fireStrength + nj.fireStrength) * 0.4;
                ctx.beginPath();
                ctx.moveTo(ni.x, ni.y);
                ctx.lineTo(nj.x, nj.y);
                ctx.strokeStyle = `rgba(56,189,248,${baseA + boost})`;
                ctx.lineWidth = boost > 0.05 ? 0.9 : 0.35;
                ctx.stroke();
                // Spawn traveling signals
                if (ni.fireStrength > 0.55 && Math.random() < 0.004 && signals.length < 35) {
                    signals.push(new Signal(ni, nj));
                }
                if (nj.fireStrength > 0.55 && Math.random() < 0.004 && signals.length < 35) {
                    signals.push(new Signal(nj, ni));
                }
            }
        }
        // Mouse attractor lines
        const mdx = ni.x - mouse.x, mdy = ni.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_DIST) {
            const alpha = (1 - mDist / MOUSE_DIST) * 0.5;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(129,140,248,${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            if (mDist < 65 && Math.random() < 0.018) ni.fire();
        }
    }

    // Update & draw signals
    signals = signals.filter(s => !s.done);
    signals.forEach(s => { s.update(); s.draw(); });

    // Update & draw neurons
    neurons.forEach(n => { n.update(); n.draw(); });

    requestAnimationFrame(drawFrame);
}

drawFrame();

window.addEventListener('resize', () => {
    resizeCanvas();
    initNeurons();
});

// ---- Scroll Indicator Hide on Scroll ----
const scrollInd = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollInd.style.opacity = '0';
    } else {
        scrollInd.style.opacity = '1';
    }
}, { passive: true });

// ---- Contact Form ----
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();

    if (!name || !email || !message) {
        formNote.textContent = '⚠️ Please fill all fields.';
        formNote.style.color = '#f87171';
        return;
    }

    // Simulate sending (replace with actual form submission / EmailJS etc.)
    const btn = document.getElementById('formSubmitBtn');
    btn.querySelector('span').textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        formNote.textContent = '✅ Message sent! I\'ll get back to you soon.';
        formNote.style.color = '#34d399';
        form.reset();
        btn.querySelector('span').textContent = 'Send Message';
        btn.disabled = false;
    }, 1500);
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id], header[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
            current = sec.getAttribute('id');
        }
    });

    navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#38bdf8';
        }
    });
}, { passive: true });

// ---- Card Tilt Effect ----
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ---- AI Monitor Live Updates ----
const aiStatuses = ['Analyzing...', 'Processing', 'Training...', 'Predicting', 'Optimizing', 'Computing', 'Learning...', 'Inferencing'];
const aiMeterFill = document.getElementById('aiMeterFill');
const aiLiveStatus = document.getElementById('aiLiveStatus');

if (aiLiveStatus && aiMeterFill) {
    setInterval(() => {
        aiLiveStatus.textContent = aiStatuses[Math.floor(Math.random() * aiStatuses.length)];
        aiMeterFill.style.width = (25 + Math.random() * 70) + '%';
    }, 1800);
}

// ---- Floating Neural Keyword Chips (Hero) ----
const CHIP_WORDS = ['NEURAL NET', 'DEEP LEARN', 'BACKPROP', 'GRADIENT', 'EPOCH', 'LOSS: 0.02', 'ACC: 98%', 'BATCH 64', 'DROPOUT', 'SOFTMAX', 'RELU', 'ADAM OPT'];
const heroEl = document.querySelector('.hero');

function spawnChip() {
    if (!heroEl) return;
    const chip = document.createElement('div');
    chip.className = 'neural-chip';
    chip.textContent = CHIP_WORDS[Math.floor(Math.random() * CHIP_WORDS.length)];
    const left = 5 + Math.random() * 88;
    const bottom = 5 + Math.random() * 40;
    const duration = 5 + Math.random() * 6;
    chip.style.cssText = `left:${left}%;bottom:${bottom}%;animation-duration:${duration}s;`;
    heroEl.appendChild(chip);
    setTimeout(() => chip.remove(), duration * 1000);
}

// Spawn chips periodically
const chipInterval = setInterval(spawnChip, 1400);
setTimeout(spawnChip, 500);

// ---- Advanced Profile Scroll Following (Y-axis only to prevent overlap) ----
window.addEventListener('scroll', () => {
    const pWrap = document.getElementById('profileWrapper');
    if (pWrap && !pWrap.classList.contains('expanded')) {
        // ONLY apply follow logic on Desktop
        if (window.innerWidth > 992) {
            const scrollOffset = window.scrollY;

            // Move strictly vertically to stay in viewport
            // 0.95 factor makes it "float" along with user
            gsap.to(pWrap, {
                y: scrollOffset * 0.92,
                scale: scrollOffset > 100 ? 0.8 : 1,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        } else {
            // Reset for mobile
            gsap.set(pWrap, { y: 0, scale: 1 });
        }
    }
});

// ---- Profile Hologram Expand Logic ----
const pWrapper = document.getElementById('profileWrapper');
const cPortal = document.getElementById('closePortal');

if (pWrapper) {
    pWrapper.addEventListener('click', (e) => {
        if (!e.target.classList.contains('close-portal')) {
            pWrapper.classList.add('expanded');
            document.body.style.overflow = 'hidden';
            gsap.set(pWrapper, { clearProps: "all" }); // Clear GSAP styles when expanded
        }
    });
}

if (cPortal) {
    cPortal.onclick = function (e) {
        e.stopPropagation();
        pWrapper.classList.remove('expanded');
        document.body.style.overflow = 'auto';
        // Re-enable visibility check
        if (window.scrollY > 300) pWrapper.classList.add('visible');
    };
}


// Close on 'Escape' key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileWrapper.classList.contains('expanded')) {
        profileWrapper.classList.remove('expanded');
        document.body.style.overflow = 'auto';
    }
});
