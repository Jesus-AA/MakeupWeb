/* ====================================
   MODULO: Utilidades generales
   Smooth scroll, validadores, helpers
   ==================================== */

var LuxeBridal = window.LuxeBridal || {};

LuxeBridal.Utils = (function() {

    // ===== SMOOTH SCROLL =====
    function initSmoothScroll(headerSelector) {
        var header = document.querySelector(headerSelector) || { offsetHeight: 0 };

        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    var headerHeight = header.offsetHeight || 0;
                    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== EMAIL VALIDATOR =====
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===== SPANISH PHONE VALIDATOR =====
    function validateSpanishPhone(phone) {
        var cleaned = phone.replace(/[\s\-\(\)]/g, '');
        var re = /^(\+34)?[67]\d{8}$/;
        return re.test(cleaned);
    }

    // ===== FIELD ERROR HELPERS =====
    function clearFieldErrors() {
        document.querySelectorAll('.form__group input.error, .form__group textarea.error').forEach(function(el) {
            el.classList.remove('error');
        });
        document.querySelectorAll('.field-error').forEach(function(el) {
            el.remove();
        });
    }

    function showFieldError(inputId, message) {
        var input = document.getElementById(inputId);
        if (input) {
            input.classList.add('error');
            var existing = input.parentElement.querySelector('.field-error');
            if (!existing) {
                var err = document.createElement('span');
                err.className = 'field-error';
                err.textContent = message;
                input.parentElement.appendChild(err);
            }
        }
    }

    // API publica
    return {
        initSmoothScroll: initSmoothScroll,
        validateEmail: validateEmail,
        validateSpanishPhone: validateSpanishPhone,
        clearFieldErrors: clearFieldErrors,
        showFieldError: showFieldError
    };

})();
