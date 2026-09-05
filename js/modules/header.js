/* MODULO: Header - Scroll, menu, active link */

var MariaMartha = window.MariaMartha || {};

MariaMartha.Header = (function() {

    var header, navToggle, navMenu;

    function init() {
        header = document.getElementById('header');
        navToggle = document.getElementById('nav-toggle');
        navMenu = document.getElementById('nav-menu');
        if (!header) return;
        initScrollEffect();
        initMobileMenu();
        initCloseMenuOnLinkClick();
        initActiveLinkHighlight();
    }

    function initScrollEffect() {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 80);
        });
    }

    function initMobileMenu() {
        if (!navToggle) return;
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            var icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    function initCloseMenuOnLinkClick() {
        if (!navToggle || !navMenu) return;
        document.querySelectorAll('.header__link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                var icon = navToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    function initActiveLinkHighlight() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.header__link');
        if (sections.length === 0 || navLinks.length === 0) return;

        window.addEventListener('scroll', function() {
            var current = '';
            sections.forEach(function(section) {
                var top = section.offsetTop - 150;
                var h = section.offsetHeight;
                if (window.pageYOffset >= top && window.pageYOffset < top + h) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    return { init: init };

})();
