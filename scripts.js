document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       Preloader Logic
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    let progress = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.classList.remove('loading');
                triggerInitialReveals();
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${progress}%`;
    }, 150);

    /* ==========================================================================
       Custom Cursor & Magnetic Effect
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorGlow = document.getElementById('cursor-glow');
    const magnetics = document.querySelectorAll('.magnetic');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Request animation frame for smooth cursor
    const renderCursor = () => {
        // Dot follows fast
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        // Glow follows slow
        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Magnetic elements hover logic
    magnetics.forEach(el => {
        el.addEventListener('mouseenter', () => cursorDot.classList.add('expand'));
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('expand');
            el.style.transform = '';
        });
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            
            // Move the element slightly towards mouse
            el.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
        });
    });

    /* ==========================================================================
       Theme Switcher
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check local storage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }

    /* ==========================================================================
       Scroll Progress Bar & Navigation Blur
       ========================================================================== */
    const scrollProgress = document.getElementById('scroll-progress');
    const nav = document.querySelector('.premium-nav');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;

        // Nav Glassmorphism
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Dynamic Typing Effect
       ========================================================================== */
    const dynamicText = document.getElementById('dynamic-text');
    const roles = ["AI Engineer", "Data Scientist", "Full-Stack Dev", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            dynamicText.innerText = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            dynamicText.innerText = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }
    type();

    /* ==========================================================================
       Intersection Observer for Scroll Reveals
       ========================================================================== */
    const reveals = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            // Check if it's a progress bar to animate
            if(entry.target.classList.contains('tech-item')){
                const levelFill = entry.target.querySelector('.level-fill');
                if(levelFill) {
                    levelFill.style.width = levelFill.style.width; // Trigger transition
                }
            }
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => revealObserver.observe(reveal));

    function triggerInitialReveals() {
        // Trigger reveals for elements already in viewport after load
        reveals.forEach(reveal => {
            const rect = reveal.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                reveal.classList.add('active');
            }
        });
    }

    /* ==========================================================================
       Intersection Observer for Statistics Counters
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / 100; // Speed

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                counted = true;
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ==========================================================================
       Filtering Logic (Tech Stack & Projects)
       ========================================================================== */
    // Tech Filtering
    const techBtns = document.querySelectorAll('#tech-stack .filter-btn');
    const techItems = document.querySelectorAll('.tech-item');

    techBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active
            techBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            
            techItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'flex';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Project Filtering
    const projBtns = document.querySelectorAll('.proj-filter');
    const projItems = document.querySelectorAll('.project-card');

    projBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    /* ==========================================================================
       GitHub Heatmap Generator (Simulated)
       ========================================================================== */
    const heatmapContainer = document.getElementById('heatmap-container');
    if(heatmapContainer) {
        // Generate 52 weeks * 7 days = 364 cells
        for (let i = 0; i < 364; i++) {
            const cell = document.createElement('div');
            cell.classList.add('heatmap-cell');
            
            // Randomly assign activity levels favoring lower activity to look realistic
            const rand = Math.random();
            if (rand > 0.9) cell.classList.add('level-4');
            else if (rand > 0.75) cell.classList.add('level-3');
            else if (rand > 0.6) cell.classList.add('level-2');
            else if (rand > 0.4) cell.classList.add('level-1');
            else cell.classList.add('level-0');
            
            heatmapContainer.appendChild(cell);
        }
    }

    /* ==========================================================================
       Vanilla JS Particle Background
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 50; // Keep it low for premium subtle feel

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    /* ==========================================================================
       Konami Code Easter Egg
       ========================================================================== */
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    window.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex] || e.key.toLowerCase() === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0; // Reset
            }
        } else {
            konamiIndex = 0; // Reset if wrong key
        }
    });

    function activateEasterEgg() {
        const hint = document.getElementById('easter-egg-hint');
        hint.innerText = "Developer Mode Unlocked: You found the secret!";
        hint.style.color = "var(--accent-2)";
        hint.style.opacity = "1";
        
        // Add a matrix rain effect or simple inverted flash
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        setTimeout(() => {
            document.body.style.filter = "none";
        }, 1500);
    }

    /* ==========================================================================
       Misc UI Logic
       ========================================================================== */
    // Current Year for Footer
    document.getElementById('current-year').innerText = new Date().getFullYear();

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // EmailJS Initialization - Replace with your actual keys from emailjs.com
    emailjs.init("d2puZ2XIYjd6UNekY");

    // Contact Form - Real Email Sending via EmailJS
    const form = document.getElementById('premium-contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('form-feedback');
            const submitBtn = form.querySelector('.btn-submit');

            // Basic validation
            let valid = true;
            form.querySelectorAll('input, textarea').forEach(input => {
                if (!input.value.trim()) valid = false;
            });

            if (!valid) {
                feedback.innerText = "Please fill out all required fields.";
                feedback.style.color = "var(--accent-2)";
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            feedback.innerText = "";

            // EmailJS send
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.sendForm("service_daz4yv4", "template_9q55euf", form)
                .then(() => {
                    feedback.innerText = "✅ Message sent! I'll get back to you soon.";
                    feedback.style.color = "var(--accent-1)";
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
                })
                .catch((error) => {
                    console.error("EmailJS Error:", error);
                    feedback.innerText = "❌ Something went wrong. Please try emailing directly at g.s.mandal433@gmail.com";
                    feedback.style.color = "var(--accent-2)";
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
                });
        });
    }

});
