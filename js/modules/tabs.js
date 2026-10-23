/* ====================================
   MODULO: Pestañas de tarifas (Novias / Invitadas)
   Sin JS se ven los dos paneles; con JS
   solo el seleccionado. Flechas para cambiar.
   ==================================== */

var MariaMartha = window.MariaMartha || {};

MariaMartha.Tabs = (function() {

    function init() {
        document.querySelectorAll('[role="tablist"]').forEach(function(list) {
            var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
            if (!tabs.length) return;

            function select(tab, moveFocus) {
                tabs.forEach(function(t) {
                    var selected = t === tab;
                    t.setAttribute('aria-selected', String(selected));
                    t.tabIndex = selected ? 0 : -1;
                    var panel = document.getElementById(t.getAttribute('aria-controls'));
                    if (panel) panel.hidden = !selected;
                });
                if (moveFocus) tab.focus();
            }

            tabs.forEach(function(tab, i) {
                tab.addEventListener('click', function() { select(tab, false); });
                tab.addEventListener('keydown', function(e) {
                    var next = null;
                    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
                    if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
                    if (e.key === 'Home') next = tabs[0];
                    if (e.key === 'End') next = tabs[tabs.length - 1];
                    if (next) {
                        e.preventDefault();
                        select(next, true);
                    }
                });
            });

            var initial = tabs.filter(function(t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
            select(initial, false);
        });
    }

    return { init: init };

})();
