/* ====================================
   MODULO: Portafolio
   Filtros por categoria + visor (lightbox)
   que muestra cada foto completa, sin recorte.
   El mismo visor abre los comentarios
   originales de los testimonios.
   ==================================== */

var MariaMartha = window.MariaMartha || {};

MariaMartha.Gallery = (function() {

    var dialog, img, caption, prevBtn, nextBtn;
    var current = [];   // lista de { src, alt } que se esta viendo
    var index = 0;
    var lastFocus = null;

    function init() {
        dialog = document.getElementById('lightbox');
        initFilters();
        if (!dialog || typeof dialog.showModal !== 'function') return;

        img = dialog.querySelector('.lightbox__img');
        caption = dialog.querySelector('.lightbox__caption');
        prevBtn = dialog.querySelector('.lightbox__nav--prev');
        nextBtn = dialog.querySelector('.lightbox__nav--next');

        initGalleryLightbox();
        initTestimonialSources();

        dialog.querySelector('.lightbox__close').addEventListener('click', close);
        prevBtn.addEventListener('click', function() { show(index - 1); });
        nextBtn.addEventListener('click', function() { show(index + 1); });

        // Clic fuera de la foto cierra
        dialog.addEventListener('click', function(e) {
            if (e.target === dialog || e.target.classList.contains('lightbox__figure')) close();
        });

        dialog.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });

        dialog.addEventListener('close', function() {
            document.body.style.overflow = '';
            if (lastFocus) lastFocus.focus();
        });

        initSwipe();
    }

    // ===== FILTROS =====
    // En movil, "Todos" muestra 6 fotos y un boton para ver el resto (CSS: .is-collapsed).
    // Las fotos recogidas siguen en el visor, asi que ninguna queda fuera.
    function initFilters() {
        var filters = document.querySelectorAll('.filter');
        var items = document.querySelectorAll('.gallery__item');
        var grid = document.getElementById('gallery-grid');
        var more = document.getElementById('gallery-more');
        if (!filters.length) return;

        function setCollapsed(collapsed) {
            if (!grid || !more) return;
            grid.classList.toggle('is-collapsed', collapsed);
            more.hidden = !collapsed;
            more.setAttribute('aria-expanded', String(!collapsed));
        }

        filters.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var cat = btn.getAttribute('data-filter');
                filters.forEach(function(f) { f.setAttribute('aria-pressed', String(f === btn)); });
                items.forEach(function(item) {
                    item.hidden = cat !== 'todos' && item.getAttribute('data-cat') !== cat;
                });
                setCollapsed(cat === 'todos' && grid.classList.contains('was-collapsed'));
                markArches();
            });
        });

        if (more) {
            more.addEventListener('click', function() {
                grid.classList.remove('was-collapsed');
                setCollapsed(false);
                var next = grid.querySelector('.gallery__item:nth-child(7) .gallery__btn');
                if (next) next.focus({ preventScroll: true });
            });
            grid.classList.add('was-collapsed');
            setCollapsed(true);
        }

        markArches();
    }

    // Cada cuarta foto visible lleva forma de arco
    function markArches() {
        var visible = visibleItems();
        document.querySelectorAll('.gallery__item').forEach(function(item) {
            item.classList.remove('is-arch');
        });
        visible.forEach(function(item, i) {
            if (i % 4 === 0) item.classList.add('is-arch');
        });
    }

    function visibleItems() {
        return Array.prototype.filter.call(document.querySelectorAll('.gallery__item'), function(item) {
            return !item.hidden;
        });
    }

    // ===== VISOR =====
    function initGalleryLightbox() {
        document.querySelectorAll('.gallery__btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var items = visibleItems();
                var list = items.map(function(item) {
                    var image = item.querySelector('img');
                    return { src: image.getAttribute('src'), alt: image.getAttribute('alt') };
                });
                open(list, items.indexOf(btn.parentElement), btn);
            });
        });
    }

    function initTestimonialSources() {
        document.querySelectorAll('.testimonial__source').forEach(function(btn) {
            btn.addEventListener('click', function() {
                open([{ src: btn.getAttribute('data-src'), alt: btn.getAttribute('data-alt') }], 0, btn);
            });
        });
    }

    function open(list, startIndex, trigger) {
        current = list;
        lastFocus = trigger || null;
        var single = list.length < 2;
        prevBtn.hidden = single;
        nextBtn.hidden = single;
        show(startIndex);
        document.body.style.overflow = 'hidden';
        dialog.showModal();
    }

    function show(i) {
        if (!current.length) return;
        index = (i + current.length) % current.length;
        var item = current[index];
        img.src = item.src;
        img.alt = item.alt;
        caption.textContent = current.length > 1
            ? item.alt + ' · ' + (index + 1) + ' de ' + current.length
            : item.alt;
    }

    function close() {
        dialog.close();
    }

    // Deslizar con el dedo en movil
    function initSwipe() {
        var startX = null;
        dialog.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        }, { passive: true });
        dialog.addEventListener('touchend', function(e) {
            if (startX === null || current.length < 2) return;
            var dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
            startX = null;
        });
    }

    return { init: init };

})();
