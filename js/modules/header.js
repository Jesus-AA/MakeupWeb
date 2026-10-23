/* MODULO: Header - Sombra al hacer scroll, menu movil, enlace activo */

var MariaMartha = window.MariaMartha || {};

MariaMartha.Header = (function() {

    var header, navToggle, navMenu, backdrop;

    function init() {
        header = document.getElementById('header');
        navToggle = document.getElementById('nav-toggle');
        navMenu = document.getElementById('nav-menu');
        backdrop = document.getElementById('nav-backdrop');
        if (!header) return;
        initScrollEffect();
        initMobileMenu();
        initActiveLinkHighlight();
        initMobileBar();
    }

    // La barra fija de WhatsApp (movil) aparece cuando el boton del inicio ya no se ve
    function initMobileBar() {
        var bar = document.querySelector('.mobile-bar');
        var heroCta = document.querySelector('.hero__ctas');
        if (!bar) return;
        if (!heroCta || !('IntersectionObserver' in window)) {
            bar.classList.add('visible');
            return;
        }
        new IntersectionObserver(function(entries) {
            bar.classList.toggle('visible', !entries[0].isIntersecting);
        }).observe(heroCta);
    }

    function initScrollEffect() {
        var update = function() {
            header.classList.toggle('scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    function setMenu(open) {
        navMenu.classList.toggle('show', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        if (backdrop) backdrop.hidden = !open;
        document.body.style.overflow = open ? 'hidden' : '';
    }

    function initMobileMenu() {
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('click', function() {
            setMenu(!navMenu.classList.contains('show'));
        });

        if (backdrop) backdrop.addEventListener('click', function() { setMenu(false); });

        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() { setMenu(false); });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                setMenu(false);
                navToggle.focus();
            }
        });

        // Si se agranda la ventana con el menu abierto, se cierra
        window.matchMedia('(min-width: 861px)').addEventListener('change', function(e) {
            if (e.matches) setMenu(false);
        });
    }

    function initActiveLinkHighlight() {
        var navLinks = document.querySelectorAll('.header__link');
        if (!navLinks.length || !('IntersectionObserver' in window)) return;

        var byId = {};
        navLinks.forEach(function(link) {
            byId[link.getAttribute('href').slice(1)] = link;
        });

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function(link) { link.classList.remove('active'); });
                var active = byId[entry.target.id];
                if (active) active.classList.add('active');
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        document.querySelectorAll('main section[id]').forEach(function(section) {
            observer.observe(section);
        });
    }

    return { init: init };

})();
