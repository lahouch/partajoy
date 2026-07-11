/* ============================================
   PARTAJOY ASBL — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Header scroll ---------- */
    const header = document.getElementById('header');

    const handleScroll = () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ---------- Mobile nav toggle ---------- */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    /* Close mobile nav on link click */
    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    /* ---------- Fade-in animations ---------- */
    const animateElements = () => {
        const elements = document.querySelectorAll(
            '.mission__card, .activite-card, .event-card, .stat-card, .contact-info__card'
        );

        elements.forEach(el => {
            if (!el.classList.contains('fade-in')) {
                el.classList.add('fade-in');
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    animateElements();

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');

        /* Simulated form submission */
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Message envoyé !';
            btn.style.background = 'var(--clr-secondary)';
            btn.style.borderColor = 'var(--clr-secondary)';
            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
            }, 3000);
        }, 1200);
    });

    /* ---------- Smooth scroll polyfill for older browsers ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
