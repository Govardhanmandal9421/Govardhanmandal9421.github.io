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

// ---- Hero Canvas - Premium Particle Network ----
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 150;
const MOUSE_DIST = 120;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Create particles
let particles = [];

function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.6 ? '#818cf8' : '#38bdf8'
        });
    }
}
createParticles();

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background overlay
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
    );
    gradient.addColorStop(0, 'rgba(14, 30, 64, 0.3)');
    gradient.addColorStop(1, 'rgba(5, 11, 24, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DIST) {
                const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }

        // Mouse connection
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_DIST) {
            const alpha = (1 - mDist / MOUSE_DIST) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // Draw particles
    particles.forEach(p => {
        // Glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, p.color.replace(')', `, ${p.opacity})`).replace('rgb', 'rgba'));
        glow.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Move
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
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