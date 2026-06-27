/* ====================================
   MODULO: FAQ Accordion
   ==================================== */

var LuxeBridal = window.LuxeBridal || {};

LuxeBridal.Faq = (function() {

    function init() {
        var faqQuestions = document.querySelectorAll('.faq__question');
        if (faqQuestions.length === 0) return;

        faqQuestions.forEach(function(question) {
            question.addEventListener('click', function() {
                var answer = question.nextElementSibling;
                var isOpen = answer.classList.contains('open');

                // Cerrar todos los demas
                faqQuestions.forEach(function(q) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('open');
                });

                // Abrir el clickeado si estaba cerrado
                if (!isOpen) {
                    question.classList.add('active');
                    answer.classList.add('open');
                }
            });
        });
    }

    return {
        init: init
    };

})();
