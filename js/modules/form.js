/* MODULO: Formulario - Validacion y envio */

var LuxeBridal = window.LuxeBridal || {};

LuxeBridal.Form = (function() {

    var contactForm, formSuccess, formErrors;

    function init() {
        contactForm = document.getElementById('contactForm');
        formSuccess = document.getElementById('formSuccess');
        formErrors = document.getElementById('formErrors');
        if (!contactForm) return;
        setFormAction();
        attachSubmitHandler();
    }

    function setFormAction() {
        if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.formspreeId) {
            contactForm.action = 'https://formspree.io/f/' + APP_CONFIG.formspreeId;
        } else {
            console.warn('APP_CONFIG no encontrado. Crea js/config.js desde config.example.js');
        }
    }

    function attachSubmitHandler() {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            var errors = validate();
            if (errors.length > 0) {
                showErrors(errors);
                return;
            }
            await submitForm();
        });
    }

    function validate() {
        var errors = [];
        LuxeBridal.Utils.clearFieldErrors();
        if (formErrors) {
            formErrors.style.display = 'none';
            formErrors.innerHTML = '';
        }
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();
        if (!LuxeBridal.Utils.validateEmail(email)) {
            errors.push('Correo electronico no valido. Ejemplo: nombre@dominio.com');
            LuxeBridal.Utils.showFieldError('email', 'Correo no valido');
        }
        if (!LuxeBridal.Utils.validateSpanishPhone(phone)) {
            errors.push('Telefono movil espanol no valido. Ej: 612345678 o +34612345678');
            LuxeBridal.Utils.showFieldError('phone', 'Movil no valido');
        }
        return errors;
    }

    function showErrors(errors) {
        if (!formErrors) return;
        formErrors.style.display = 'block';
        var list = document.createElement('ul');
        errors.forEach(function(err) {
            var li = document.createElement('li');
            li.textContent = err;
            list.appendChild(li);
        });
        formErrors.appendChild(list);
        formErrors.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    async function submitForm() {
        var formData = new FormData(contactForm);
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        try {
            var response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            } else {
                alert('Error al enviar. Intenta de nuevo.');
            }
        } catch (error) {
            alert('Error de conexion. Intenta de nuevo.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    return { init: init };

})();
