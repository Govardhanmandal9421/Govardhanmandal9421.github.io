/* ============================================================
   EXECUTIVE ARCHITECTURAL PROFILE INTERFACE - ENGINE
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // 1. GLOBAL NAVBAR SCROLL MONITOR
    const globalNavbar = document.getElementById('globalNavbar');
    
    function evaluateScrollPosition() {
        if (window.scrollY > 40) {
            globalNavbar.classList.add('scrolled');
        } else {
            globalNavbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', evaluateScrollPosition);
    evaluateScrollPosition(); // Pre-check on load

    // 2. RESPONSIVE NAVIGATION MOBILE TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close menu cleanly when any navigation asset is triggered
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });

        // Close menu if clicked anywhere outside the container area
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    }

    // 3. SECURE ASYNC TYPEWRITER ENGINE
    const technicalRoles = [
        'AI Engineering Student',
        'Machine Learning Specialist',
        'Data Infrastructure Architect',
        'Django Web Developer'
    ];
    
    let activeRoleIndex = 0;
    let characterIndex = 0;
    let isReversing = false;
    const typeTarget = document.getElementById('dynamicType');

    function executeTypewriterCycle() {
        if (!typeTarget) return;
        
        const fullString = technicalRoles[activeRoleIndex];
        
        if (isReversing) {
            typeTarget.textContent = fullString.substring(0, characterIndex - 1);
            characterIndex--;
        } else {
            typeTarget.textContent = fullString.substring(0, characterIndex + 1);
            characterIndex++;
        }

        // Variable execution velocity matrix
        let executionSpeed = isReversing ? 35 : 75;

        if (!isReversing && characterIndex === fullString.length) {
            executionSpeed = 2000; // Static dwell time when text completes
            isReversing = true;
        } else if (isReversing && characterIndex === 0) {
            isReversing = false;
            activeRoleIndex = (activeRoleIndex + 1) % technicalRoles.length;
            executionSpeed = 400; // Foundational delay before next string starts
        }

        setTimeout(executeTypewriterCycle, executionSpeed);
    }

    if (typeTarget) {
        setTimeout(executeTypewriterCycle, 800);
    }

    // 4. CORE GSAP INTERFACE ANIMATIONS PIPELINE
    if (typeof gsap !== 'undefined') {
        // Universal defaults initialization
        gsap.config({ nullTargetWarn: false });

        // Synchronous staggered entrance animation matrix for Hero components
        const heroTimeline = gsap.timeline();
        heroTimeline.from('.status-indicator, .hero-title, .hero-subtitle, .hero-description, .hero-cta-group', {
            opacity: 0,
            y: 25,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
        });

        heroTimeline.from('.executive-profile-card', {
            opacity: 0,
            x: 30,
            scale: 0.98,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5');

        // ScrollTrigger automated registration for block level sections
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            const modularSections = document.querySelectorAll('.content-section');
            modularSections.forEach(section => {
                gsap.from(section.querySelectorAll('.section-header, .about-layout-grid, .skills-category-grid, .project-showcase-card, .timeline-item, .contact-wrapper'), {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 82%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.75,
                    stagger: 0.15,
                    ease: 'power2.out'
                });
            });
        }
    }

    // 5. AMBIENT NEURAL DATASPACE CANVAS ENGINE
    const canvas = document.getElementById('ambientCanvas');
    if (canvas) {
        const context = canvas.getContext('2d');
        let dataNodes = [];
        let executionBoundary = { x: 0, y: 0 };

        function recalculateCanvasScale() {
            executionBoundary.x = window.innerWidth;
            executionBoundary.y = window.innerHeight;
            canvas.width = executionBoundary.x;
            canvas.height = executionBoundary.y;
        }
        
        window.addEventListener('resize', recalculateCanvasScale);
        recalculateCanvasScale();

        // Object schematic structural blueprint for individual data nodes
        class DataNode {
            constructor() {
                this.x = Math.random() * executionBoundary.x;
                this.y = Math.random() * executionBoundary.y;
                this.vectorX = (Math.random() - 0.5) * 0.25; // Controlled slow drift
                this.vectorY = (Math.random() - 0.5) * 0.25;
                this.radius = Math.random() * 1.5 + 1;
            }

            processVectorPosition() {
                this.x += this.vectorX;
                this.y += this.vectorY;

                // Reflective wall collision handling vectors
                if (this.x < 0 || this.x > executionBoundary.x) this.vectorX *= -1;
                if (this.y < 0 || this.y > executionBoundary.y) this.vectorY *= -1;
            }

            renderNode() {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fillStyle = 'rgba(56, 189, 248, 0.25)';
                context.fill();
            }
        }

        function populateNodeInfrastructure() {
            dataNodes = [];
            // Dynamically scale node density according to hardware viewport area matrix
            const targetedDensityCount = Math.min(50, Math.floor(executionBoundary.x / 25));
            for (let i = 0; i < targetedDensityCount; i++) {
                dataNodes.push(new DataNode());
            }
        }
        populateNodeInfrastructure();

        function renderSystemLoop() {
            context.clearRect(0, 0, executionBoundary.x, executionBoundary.y);
            
            // Step 1: Render and process individual nodes
            dataNodes.forEach(node => {
                node.processVectorPosition();
                node.renderNode();
            });

            // Step 2: Compute relative proximity matrix vectors for dynamic grid interconnects
            for (let i = 0; i < dataNodes.length; i++) {
                for (let j = i + 1; j < dataNodes.length; j++) {
                    const distanceX = dataNodes[i].x - dataNodes[j].x;
                    const distanceY = dataNodes[i].y - dataNodes[j].y;
                    const absoluteDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                    // Map grid lines only if the vectors fall under the standard thresholds
                    if (absoluteDistance < 130) {
                        context.beginPath();
                        context.moveTo(dataNodes[i].x, dataNodes[i].y);
                        context.lineTo(dataNodes[j].x, dataNodes[j].y);
                        // Linear transparency degradation scalar based on relative distance geometry
                        const computedAlpha = 0.12 * (1 - absoluteDistance / 130);
                        context.strokeStyle = `rgba(56, 189, 248, ${computedAlpha})`;
                        context.lineWidth = 0.75;
                        context.stroke();
                    }
                }
            }
            requestAnimationFrame(renderSystemLoop);
        }
        
        // Run network execution stream
        requestAnimationFrame(renderSystemLoop);
        
        // Re-populate node infrastructure on major resizing thresholds to avoid structural dispersion
        window.addEventListener('resize', () => {
            populateNodeInfrastructure();
        });
    }
});
