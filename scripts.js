/* ============================================================
   PREMIUM PORTFOLIO SCRIPTS - GOVARDHAN MANDAL
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Mobile Hamburger Menu ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close menu on navigation link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // ---- Typing Effect Pipeline ----
    const phrases = [
        'AI Engineering Student',
        'Machine Learning Developer',
        'Data Scientist',
        'Django Framework Specialist',
        'Technical Problem Solver'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedEl = document.getElementById('typedText');

    function typeWriter() {
        if (!typedEl) return;
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2200; // Hold phrase visible
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 300;
        }

        setTimeout(typeWriter, speed);
    }

    // Initiate typewriter effect
    if (typedEl) setTimeout(typeWriter, 1000);

    // ---- GSAP Scroll Animations Setup ----
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Standard fade animations for metrics and structural elements
        gsap.from('#heroName, #heroDesc, #heroButtons, #heroStats, #heroBadge', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Scroll triggering for generalized sections
        document.querySelectorAll('[data-gsap]').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // ---- NEURAL NETWORK CANVAS INTUITIVE ENGINE ----
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let neurons = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Neuron definition blueprint
        class Neuron {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.r = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
                ctx.fill();
            }
        }

        // Initialize node pool
        function initNetwork() {
            neurons = [];
            const count = Math.min(60, Math.floor(canvas.width / 20));
            for (let i = 0; i < count; i++) {
                neurons.push(new Neuron());
            }
        }
        initNetwork();

        // Render looping mechanism
        function animateNetwork() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            neurons.forEach(n => {
                n.update();
                n.draw();
            });

            // Connect lines logic based on relative Euclidean proximity
            for (let i = 0; i < neurons.length; i++) {
                for (let j = i + 1; j < neurons.length; j++) {
                    const dist = Math.hypot(neurons[i].x - neurons[j].x, neurons[i].y - neurons[j].y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(neurons[i].x, neurons[i].y);
                        ctx.lineTo(neurons[j].x, neurons[j].y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateNetwork);
        }
        animateNetwork();
    }
});
