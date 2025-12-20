document.addEventListener('DOMContentLoaded', () => {

    // --- 1. String Theory Scroll Line ---
    const stringLine = document.querySelector('.string-line');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Capped at 100% height
        stringLine.style.height = `${Math.min(scrollPercent, 100)}%`;
    });

    // --- 2. Scroll Reveal Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Specific handling for Global Map Pins
                if (entry.target.classList.contains('city-pin')) {
                    entry.target.style.animationPlayState = 'running';
                }
                if (entry.target.classList.contains('path-line')) {
                    // SVG stroke animation trigger
                    entry.target.style.strokeDashoffset = '0';
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .fade-in, .timeline-node, .glass-card, .zen-quote');
    revealElements.forEach(el => observer.observe(el));

    // Map Specific Observer
    const mapPins = document.querySelectorAll('.city-pin');
    const pathLines = document.querySelectorAll('.path-line');
    mapPins.forEach(pin => observer.observe(pin));
    pathLines.forEach(line => observer.observe(line));


    // --- 3. Parallax Effect ---
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.2;
            const offset = scrolled * speed;
            // Apply translation. vertical only for now.
            el.style.transform = `translateY(${offset}px)`;
        });
    });


    // --- 4. Maqam Interaction (Mock) ---
    const maqamBtns = document.querySelectorAll('.maqam-btn');
    const visualizer = document.querySelector('.visualizer-circle');

    maqamBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Reset others
            maqamBtns.forEach(b => b.classList.remove('active'));

            // Activate current
            btn.classList.add('active');

            // Random visualizer effect
            const scale = 1 + Math.random();
            visualizer.style.transform = `scale(${scale})`;
            visualizer.style.opacity = '0.8';
            visualizer.style.boxShadow = `0 0 30px var(--accent-gold)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('active');
            visualizer.style.transform = 'scale(1)';
            visualizer.style.opacity = '0.3';
            visualizer.style.boxShadow = 'none';
        });
    });

    // --- 5. Navigation Logic ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');

    // Sticky Nav background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Link Highlighter
    const navObserverOptions = {
        root: null,
        threshold: 0.3 // When 30% of section is visible
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

});
