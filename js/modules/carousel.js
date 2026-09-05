/* ====================================
   MODULO: Carousel (movil)
   Carrusel horizontal generico con
   scroll-snap, flechas y puntos.
   Aplica a cualquier contenedor .carousel
   (Portafolio, La Experiencia, Testimonios).
   ==================================== */

var MariaMartha = window.MariaMartha || {};

MariaMartha.Carousel = (function() {

    function init() {
        var carousels = document.querySelectorAll('.carousel');
        if (!carousels.length) return;

        Array.prototype.forEach.call(carousels, function(viewport) {
            var track = viewport.querySelector('.carousel__track');
            var prevBtn = viewport.querySelector('.carousel__arrow--prev');
            var nextBtn = viewport.querySelector('.carousel__arrow--next');
            var dotsContainer = viewport.querySelector('.carousel__dots');
            if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

            var items = Array.prototype.slice.call(track.children);
            if (!items.length) return;

            // Construir puntos indicadores
            items.forEach(function(_, index) {
                var dot = document.createElement('button');
                dot.className = 'carousel__dot';
                dot.setAttribute('aria-label', 'Ir al elemento ' + (index + 1));
                dot.addEventListener('click', function() {
                    scrollToItem(index);
                });
                dotsContainer.appendChild(dot);
            });

            var dots = Array.prototype.slice.call(dotsContainer.children);

            // Indice actual segun el elemento mas cercano al centro
            function currentIndex() {
                var closest = 0;
                var minDist = Infinity;
                var trackCenter = track.scrollLeft + track.clientWidth / 2;
                items.forEach(function(item, i) {
                    var center = item.offsetLeft + item.offsetWidth / 2;
                    var dist = Math.abs(center - trackCenter);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = i;
                    }
                });
                return closest;
            }

            function scrollToItem(index) {
                if (index < 0) index = 0;
                if (index >= items.length) index = items.length - 1;
                var item = items[index];
                var offset = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
                track.scrollTo({ left: offset, behavior: 'smooth' });
            }

            function updateActive() {
                var idx = currentIndex();
                dots.forEach(function(dot, i) {
                    dot.classList.toggle('active', i === idx);
                });
            }

            nextBtn.addEventListener('click', function() {
                var next = currentIndex() + 1;
                if (next >= items.length) next = 0;
                scrollToItem(next);
            });

            prevBtn.addEventListener('click', function() {
                var prev = currentIndex() - 1;
                if (prev < 0) prev = items.length - 1;
                scrollToItem(prev);
            });

            track.addEventListener('scroll', updateActive, { passive: true });
            window.addEventListener('resize', updateActive);

            updateActive();
        });
    }

    return { init: init };

})();
