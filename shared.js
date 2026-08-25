'use strict';

/* ── Site theme toggle ── */
(function () {
    let storedTheme = null;
    try {
        storedTheme = localStorage.getItem('ale8Theme');
    } catch (error) {}
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = initialTheme;

    function init() {
        const tabList = document.querySelector('.tab-list');
        if (!tabList) return;

        const item = document.createElement('li');
        item.setAttribute('role', 'presentation');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Switch to dark mode');
        button.setAttribute('title', 'Switch theme');
        item.appendChild(button);
        tabList.appendChild(item);

        function updateButton() {
            const isDark = document.documentElement.dataset.theme === 'dark';
            button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
            button.innerHTML = isDark ? '&#9728;' : '&#9790;';
        }

        button.addEventListener('click', () => {
            const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = nextTheme;
            try {
                localStorage.setItem('ale8Theme', nextTheme);
            } catch (error) {}
            updateButton();
        });
        updateButton();
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();

/* ── Scroll-reveal for product & recipe cards ── */
(function () {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('sr-in');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

    function init() {
        document.querySelectorAll('.product-card, .merch-cat-card').forEach((el, i) => {
            el.classList.add('sr-card');
            el.style.transitionDelay = `${(i % 4) * 65}ms`;
            obs.observe(el);
        });
        document.querySelectorAll('.recipe-card').forEach((el, i) => {
            el.classList.add('sr-card');
            el.style.transitionDelay = `${(i % 5) * 55}ms`;
            obs.observe(el);
        });
        document.querySelectorAll('.flavor-row').forEach((el, i) => {
            el.classList.add('sr-card');
            el.style.transitionDelay = `${i * 45}ms`;
            obs.observe(el);
        });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();

/* ── Back-to-top button ── */
(function () {
    function init() {
        const btn = document.createElement('button');
        btn.className = 'btt';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><polyline points="18 15 12 9 6 15"/></svg>';
        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            btn.classList.toggle('btt--on', window.scrollY > 480);
        }, { passive: true });

        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();

/* ── Scroll progress bar ── */
(function () {
    function init() {
        const bar = document.createElement('div');
        bar.className = 'spb';
        document.body.prepend(bar);

        window.addEventListener('scroll', () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        }, { passive: true });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();

/* ── Lazy-load non-hero images ── */
(function () {
    function init() {
        document.querySelectorAll('img:not(.hero-logo):not(.hero-anniversary):not(.footer-social-img)').forEach(img => {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        });
    }

    document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', init)
        : init();
})();
