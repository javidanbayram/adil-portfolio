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



    // --- 8. Language Selector & Translation Logic ---
    const langDropdown = document.querySelector('.lang-dropdown');
    const langMenu = document.querySelector('.lang-menu');
    const langOptions = document.querySelectorAll('.lang-option');
    const langMainCode = document.querySelector('.lang-main .lang-code');
    const langMainFlag = document.querySelector('.lang-main .flag');

    // Toggle Dropdown (Mobile/Click)
    if (langDropdown) {
        langDropdown.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            langDropdown.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
    }

    // Translation Dictionary
    const translations = {
        az: {
            nav_legacy: "İrs",
            nav_mastery: "Ustadlıq",
            nav_vision: "Görüş",
            nav_discography: "Diskoqrafiya",
            nav_contact: "Əlaqə",
            hero_title: "Adil<br><span class='gold-text'>Bayramov</span>",
            hero_subtitle: "Azərbaycanın Simfonik Ruhu",
            section_events: "Növbəti Rezonans",
            month_oct: "OKT",
            month_nov: "NOY",
            month_dec: "DEK",
            city_baku: "BAKI, AZ",
            btn_tickets: "Bilet Al",
            btn_soldout: "Bitdi",
            quote_text: "Musiqi əllərlə ifa olunmur.<br> O, notlar arasındakı sükutla ifa olunur.",
            footer_contact: "Əlaqə",
            footer_text: "Rezervasiya, ustad dərsləri və orkestr əməkdaşlıqları üçün.",
            footer_cities: "Bakı • Paris • Nyu York",
            footer_rights: "Bütün Hüquqlar Qorunur.",
            form_name: "Adınız",
            form_email: "E-poçt",
            form_message: "Mesajınız",
            form_send: "Mesaj Göndər"
        },
        en: {
            nav_legacy: "Legacy",
            nav_mastery: "Mastery",
            nav_vision: "Vision",
            nav_discography: "Discography",
            nav_contact: "Contact",
            hero_title: "Adil<br><span class='gold-text'>Bayramov</span>",
            hero_subtitle: "The Symphonic Soul of Azerbaijan",
            section_events: "The Next Resonance",
            month_oct: "OCT",
            month_nov: "NOV",
            month_dec: "DEC",
            city_baku: "BAKU, AZ",
            btn_tickets: "Get Tickets",
            btn_soldout: "Sold Out",
            quote_text: "Music is not played with hands.<br> It is played with silence between the notes.",
            footer_contact: "Contact",
            footer_text: "For booking inquiries, masterclasses, and orchestral collaborations.",
            footer_cities: "Baku • Paris • New York",
            footer_rights: "All Rights Reserved.",
            form_name: "Name",
            form_email: "Email",
            form_message: "Message",
            form_send: "Send Message"
        },
        ru: {
            nav_legacy: "Наследие",
            nav_mastery: "Мастерство",
            nav_vision: "Видение",
            nav_discography: "Дискография",
            nav_contact: "Контакты",
            hero_title: "Адиль<br><span class='gold-text'>Байрамов</span>",
            hero_subtitle: "Симфоническая Душа Азербайджана",
            section_events: "Следующий Резонанс",
            month_oct: "ОКТ",
            month_nov: "НОЯ",
            month_dec: "ДЕК",
            city_baku: "БАКУ, АЗ",
            btn_tickets: "Билеты",
            btn_soldout: "Продано",
            quote_text: "Музыка играется не руками.<br> Она играется тишиной между нотами.",
            footer_contact: "Контакты",
            footer_text: "По вопросам бронирования, мастер-классов и оркестрового сотрудничества.",
            footer_cities: "Баку • Париж • Нью-Йорк",
            footer_rights: "Все права защищены.",
            form_name: "Имя",
            form_email: "Эл. почта",
            form_message: "Сообщение",
            form_send: "Отправить"
        }
    };

    // Change Language Function
    function changeLanguage(lang) {
        // Update Main Button text (optional, or kept generic)
        const flags = {
            az: "🇦🇿",
            en: "🇬🇧",
            ru: "🇷🇺"
        };

        if (langMainCode) langMainCode.textContent = lang.toUpperCase();
        if (langMainFlag) langMainFlag.textContent = flags[lang];

        // Update Text Elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if it's an input/textarea for placeholder
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // handled below separately usually, but here button text is innerHTML
                    el.innerHTML = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        // Update Placeholders
        const inputs = document.querySelectorAll('[data-i18n-placeholder]');
        inputs.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        // Store preference
        localStorage.setItem('adil_lang', lang);
    }

    // Handle Option Click
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            changeLanguage(lang);
            langDropdown.classList.remove('active');
        });
    });

    // Init Language (Default AZ or saved)
    const savedLang = localStorage.getItem('adil_lang') || 'az';
    changeLanguage(savedLang);

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
