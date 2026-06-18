/* ============================================================
   PROFESSIONAL PORTFOLIO SCRIPTS - GOVARDHAN MANDAL
   Clean, Modern, Optimized JavaScript
   ============================================================ */

// ---- DOM Elements ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const typedText = document.getElementById('typedText');
const scrollIndicator = document.getElementById('scrollIndicator');
const canvas = document.getElementById('bgCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// ---- Navbar Scroll Effect ----
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
}, { passive: true });

// ---- Mobile Hamburger Menu ----
hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ---- Smooth Scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ---- Typing Animation ----
const typingPhrases = [
    'AI Engineering Student',
    'Data Scientist',
    'ML Developer',
    'Full Stack Developer',
    'Problem Solver'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = typingPhrases[phraseIndex];
    const isEnd = charIndex === currentPhrase.length;
    const isStart = charIndex === 0;

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typedText.textContent = currentPhrase.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && isEnd) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && isStart) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        speed = 200;
    }

    setTimeout(typeWriter, speed);
}

setTimeout(() => typeWriter(), 500);

// ---- Canvas Background Animation (Neural Network) ----
if (canvas && ctx) {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    const particles = [];
    const particleCount = 50;
    const connectionDistance = 150;
    const mouseDistance = 140;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function drawMouseConnections() {
        particles.forEach(particle => {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseDistance) {
                const opacity = (1 - distance / mouseDistance) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(10, 14, 39, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        drawMouseConnections();

        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// ---- Contact Form Handling ----
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('.btn-primary');

    if (!name || !email || !message) {
        formMessage.textContent = '⚠️ Please fill all fields';
        formMessage.style.color = '#ff6b6b';
        return;
    }

    const originalText = submitBtn.querySelector('span').textContent;
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    // Simulate API call (replace with actual backend)
    setTimeout(() => {
        formMessage.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        formMessage.style.color = '#34d399';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = originalText;

        setTimeout(() => {
            formMessage.textContent = '';
        }, 3000);
    }, 1500);
});

// ---- Active Navigation Link on Scroll ----
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = '#38bdf8';
        }
    });
}, { passive: true });

// ---- Animate Elements on Scroll (GSAP Alternative) ----
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

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
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}
