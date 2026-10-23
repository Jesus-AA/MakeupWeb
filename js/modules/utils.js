/* ====================================
   MODULO: Utilidades generales
   Enlaces de WhatsApp, año del footer
   ==================================== */

var MariaMartha = window.MariaMartha || {};

MariaMartha.Utils = (function() {

    var WHATSAPP_NUMBER = '34685444317';
    var DEFAULT_MESSAGE = 'Hola Maria, me gustaría información sobre tus servicios de maquillaje y peinado.';

    // ===== WHATSAPP =====
    // Cada enlace con [data-wa] abre WhatsApp con un mensaje ya escrito.
    // data-wa="texto" usa ese texto; data-wa vacio usa el mensaje general.
    function initWhatsAppLinks() {
        document.querySelectorAll('[data-wa]').forEach(function(link) {
            var message = link.getAttribute('data-wa') || DEFAULT_MESSAGE;
            link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
        });
    }

    // ===== AÑO DEL FOOTER =====
    function initYear() {
        var year = document.getElementById('year');
        if (year) year.textContent = new Date().getFullYear();
    }

    // API publica
    return {
        initWhatsAppLinks: initWhatsAppLinks,
        initYear: initYear
    };

})();
