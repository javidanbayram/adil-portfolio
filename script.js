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
            // Apply translation with requestAnimationFrame for smoothness
            window.requestAnimationFrame(() => {
                el.style.transform = `translateY(${offset}px)`;
            });
        });
    });

    // --- 3.1 Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.gold-btn, .ticket-btn, .submit-btn, .maqam-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
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
            nav_contact: "Əlaqə",

            hero_title: "Adil<br><span class='gold-text'>Bayramov</span>",
            hero_subtitle: "Azərbaycanın Simfonik Ruhu",

            section_legacy: "İrs",
            legacy_1985_title: "İlk Rezonans",
            legacy_1985_text: "Adilin səyahəti Bakının tozlu səhnələrində, Tarın qədim titrəyişlərinin onu ilk dəfə çağırdığı yerdə başladı.",
            legacy_1998_title: "Xalq Artisti",
            legacy_1998_text: "Milli irsin qorunmasına verdiyi misilsiz töhfəyə görə Respublika tərəfindən tanınmışdır.",

            section_mastery: "Ustadlıq",
            mastery_title: "Səsin Anatomiyası",
            mastery_text: "Bu sadəcə ağac və sim deyil. Bu, ruhun davamıdır. Hər naxış bir hekayə danışır, hər titrəyiş əsrlərin ağırlığını daşıyır.",

            section_vision: "Görüş",
            vision_edu_title: "Təhsil",
            vision_edu_text: "Ustadlıq məşəlini gələcək nəsillərə ötürmək.",
            vision_innov_title: "İnnovasiya",
            vision_innov_text: "Ənənəvi Muğamı müasir orkestr aranjimanları ilə birləşdirmək.",

            section_discography: "Diskoqrafiya",
            album1_cover: "Muğam<br>Sədaları",
            album1_title: "Muğam Sədaları",
            album1_meta: "2010 • Solo Tar",
            album2_cover: "Qızıl<br>Simlər",
            album2_title: "Qızıl Simlər",
            album2_meta: "2018 • Orkestr",

            section_soundscape: "Muğamın Ruhu",
            maqam_mahur: "Mahur",
            maqam_shur: "Şur",
            maqam_segah: "Segah",
            maqam_chargah: "Çahargah",

            section_gallery: "Kulis Xronikası",
            gallery_1: "Ritual",
            gallery_2: "Sükut",
            gallery_3: "Rezonans",
            gallery_4: "Parisdə Canlı",

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
            nav_contact: "Contact",

            hero_title: "Adil<br><span class='gold-text'>Bayramov</span>",
            hero_subtitle: "The Symphonic Soul of Azerbaijan",

            section_legacy: "Legacy",
            legacy_1985_title: "The First Resonance",
            legacy_1985_text: "Adil's journey began on the dusty stages of Baku, where the ancient vibrations of the Tar first called to him.",
            legacy_1998_title: "People's Artist",
            legacy_1998_text: "Recognized by the Republic for his unparalleled contribution to preserving the national heritage.",

            section_mastery: "Mastery",
            mastery_title: "The Anatomy of Sound",
            mastery_text: "It is not just wood and string. It is the extension of the soul. Every inlay tells a story, every vibration carries the weight of centuries.",

            section_vision: "Vision",
            vision_edu_title: "Education",
            vision_edu_text: "Passing the torch to the next generation of masters.",
            vision_innov_title: "Innovation",
            vision_innov_text: "Merging traditional Muğam with contemporary orchestral arrangements.",

            section_discography: "Discography",
            album1_cover: "Mugham<br>Echoes",
            album1_title: "Mugham Echoes",
            album1_meta: "2010 • Solo Tar",
            album2_cover: "Golden<br>Strings",
            album2_title: "Golden Strings",
            album2_meta: "2018 • Orchestra",

            section_soundscape: "The Spirit of Muğam",
            maqam_mahur: "Mahur",
            maqam_shur: "Shur",
            maqam_segah: "Segah",
            maqam_chargah: "Chargah",

            section_gallery: "Backstage Chronicles",
            gallery_1: "The Ritual",
            gallery_2: "The Silence",
            gallery_3: "Resonance",
            gallery_4: "Live in Paris",

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
            nav_contact: "Контакты",

            hero_title: "Адиль<br><span class='gold-text'>Байрамов</span>",
            hero_subtitle: "Симфоническая Душа Азербайджана",

            section_legacy: "Наследие",
            legacy_1985_title: "Первый Резонанс",
            legacy_1985_text: "Путь Адиля начался на пыльных сценах Баку, где древние вибрации Тара впервые позвали его.",
            legacy_1998_title: "Народный Артист",
            legacy_1998_text: "Признан Республикой за беспрецедентный вклад в сохранение национального наследия.",

            section_mastery: "Мастерство",
            mastery_title: "Анатомия Звука",
            mastery_text: "Это не просто дерево и струна. Это продолжение души. Каждая инкрустация рассказывает историю, каждая вибрация несет тяжесть веков.",

            section_vision: "Видение",
            vision_edu_title: "Образование",
            vision_edu_text: "Передача факела следующему поколению мастеров.",
            vision_innov_title: "Инновации",
            vision_innov_text: "Сочетание традиционного Мугама с современными оркестровыми аранжировками.",

            section_discography: "Дискография",
            album1_cover: "Мугам<br>Эхо",
            album1_title: "Эхо Мугама",
            album1_meta: "2010 • Соло Тар",
            album2_cover: "Золотые<br>Струны",
            album2_title: "Золотые Струны",
            album2_meta: "2018 • Оркестр",

            section_soundscape: "Дух Мугама",
            maqam_mahur: "Махур",
            maqam_shur: "Шур",
            maqam_segah: "Сегах",
            maqam_chargah: "Чахаргах",

            section_gallery: "Закулисные Хроники",
            gallery_1: "Ритуал",
            gallery_2: "Тишина",
            gallery_3: "Резонанс",
            gallery_4: "Концерт в Париже",

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



    // --- 9. Lightbox Logic ---
    window.openLightbox = function (element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const img = element.querySelector('img');
        const caption = element.querySelector('.gallery-caption').innerText;

        lightbox.style.display = "block";
        lightboxImg.src = img.src;
        lightboxCaption.innerText = caption;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    window.closeLightbox = function () {
        document.getElementById('lightbox').style.display = "none";
        document.body.style.overflow = 'auto';
    };

    // Close on outside click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }


    // --- 10. Floating Audio Player ---
    const playBtn = document.getElementById('play-btn');
    const audio = document.getElementById('bg-music');
    const audioWidget = document.querySelector('.audio-widget');

    if (playBtn && audio) {
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                audioWidget.classList.add('playing');
            } else {
                audio.pause();
                audioWidget.classList.remove('playing');
            }
        });
    }

    // --- 11. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.matchMedia("(hover: hover)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay (animation)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect on Links/Buttons
        const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .map-pin');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering-link');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering-link');
            });
        });
    }

    // --- 12. Hero Section 3D Mouse Parallax ---
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (heroSection && heroContent && window.matchMedia("(hover: hover)").matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = heroSection;
            const { clientX: x, clientY: y } = e;

            const moveX = (x - width / 2) / 25; // Sensitivity
            const moveY = (y - height / 2) / 25;

            heroContent.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroContent.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        });
    }


    // --- 13. Anatomy Hotspots ---
    const hotspots = document.querySelectorAll('.hotspot');
    const anatomyCards = document.querySelectorAll('.anatomy-card');
    const anatomyContainer = document.querySelector('.anatomy-container');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', () => {
            const targetId = hotspot.getAttribute('data-target');
            // Hide all first
            anatomyCards.forEach(card => card.classList.remove('active'));
            // Show target
            const targetCard = document.getElementById(targetId);
            if (targetCard) targetCard.classList.add('active');
        });

        // Also handling click for mobile
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent body click from closing immediately if we add that later
            const targetId = hotspot.getAttribute('data-target');
            anatomyCards.forEach(card => card.classList.remove('active'));
            const targetCard = document.getElementById(targetId);
            if (targetCard) targetCard.classList.add('active');
        });
    });

    // Hide cards when leaving the container area
    if (anatomyContainer) {
        anatomyContainer.addEventListener('mouseleave', () => {
            anatomyCards.forEach(card => card.classList.remove('active'));
        });
    }


    // --- 14. Video Modal Logic (Cinema Mode) ---
    window.openVideoModal = function (videoUrl) {
        const modal = document.getElementById('video-modal');
        const iframe = document.getElementById('video-frame');
        const navbar = document.querySelector('.navbar');

        // Ensure protocol if missing (just in case)
        if (videoUrl.startsWith('//')) {
            videoUrl = 'https:' + videoUrl;
        }

        // Auto-play param if not present
        if (videoUrl.indexOf('autoplay=1') === -1) {
            videoUrl += (videoUrl.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
        }

        iframe.src = videoUrl;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Hide navbar to prevent z-index issues / enhance immersion
        if (navbar) navbar.style.display = 'none';

        // Add cinema mode class to body if you want to dim other things (modal does this but just in case)
        document.body.classList.add('cinema-mode');
    };

    window.closeVideoModal = function () {
        const modal = document.getElementById('video-modal');
        const iframe = document.getElementById('video-frame');
        const navbar = document.querySelector('.navbar');

        modal.style.display = 'none';
        iframe.src = ''; // Stop video
        document.body.style.overflow = 'auto';

        if (navbar) navbar.style.display = 'block'; // Restore navbar
        document.body.classList.remove('cinema-mode');
    };

    const videoModal = document.getElementById('video-modal');
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }

    // --- 15. Masterclass 'Apply Now' Logic ---
    const applyBtns = document.querySelectorAll('a[href="#contact"]');
    const contactMsg = document.querySelector('.contact-form textarea');

    applyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Check if it is specifically the Masterclass button
            if (btn.innerText.includes('Apply')) {
                if (contactMsg) {
                    // small delay to allow scroll to happen
                    setTimeout(() => {
                        contactMsg.value = "I am interested in applying for the Masterclass. [Please include your experience level here]";
                        contactMsg.focus();
                    }, 500);
                }
            }
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
