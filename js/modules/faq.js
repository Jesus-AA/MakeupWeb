/* ====================================
   MODULO: Preguntas frecuentes (acordeon)
   ==================================== */

var MariaMartha = window.MariaMartha || {};

MariaMartha.Faq = (function() {

    function init() {
        var questions = document.querySelectorAll('.faq__question');
        if (questions.length === 0) return;

        questions.forEach(function(question) {
            question.addEventListener('click', function() {
                var item = question.closest('.faq__item');
                var isOpen = question.getAttribute('aria-expanded') === 'true';

                // Cerrar las demas
                questions.forEach(function(q) {
                    q.setAttribute('aria-expanded', 'false');
                    q.closest('.faq__item').classList.remove('open');
                });

                // Abrir la pulsada si estaba cerrada
                if (!isOpen) {
                    question.setAttribute('aria-expanded', 'true');
                    item.classList.add('open');
                }
            });
        });
    }

    return {
        init: init
    };

})();
