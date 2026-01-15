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
                // (Old logic removed for new CSS-based animations)


                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .fade-in, .timeline-node, .glass-card, .zen-quote');
    revealElements.forEach(el => observer.observe(el));

    // Map Specific Observer (Cleaned up)
    // const mapPins... (Removed old selectors)



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

    // --- 6. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle Nav
            navLinksList.classList.toggle('nav-active');

            // Hamburger Animation
            hamburger.classList.toggle('toggle');

            // Animate Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Close menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinksList.classList.remove('nav-active');
            hamburger.classList.remove('toggle');

            links.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // --- 7. Map Tooltip Logic ---
    const pins = document.querySelectorAll('.map-pin');
    const tooltip = document.querySelector('.map-tooltip');
    const tooltipCity = document.querySelector('.tooltip-city');
    const tooltipInfo = document.querySelector('.tooltip-info');

    pins.forEach(pin => {
        pin.addEventListener('mouseenter', (e) => {
            const city = pin.getAttribute('data-city');
            const info = pin.getAttribute('data-info');

            tooltipCity.textContent = city;
            tooltipInfo.textContent = info;

            tooltip.classList.add('active');

            // Optional: Position tooltip near the pin if we wanted dynamic positioning
            // For now, fixed position in CSS is fine or we can match coordinates
        });

        pin.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });

        // Mobile tap support
        pin.addEventListener('click', (e) => {
            // If already active and clicked again, maybe toggle? 
            // Current hover logic covers most, click can just be safe fallback
            e.preventDefault();
        });
    });

});

// Keyframes for link animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
`;
document.head.appendChild(styleSheet);
