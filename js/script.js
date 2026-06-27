/* LUXE BRIDAL STUDIO - Book Me Page JS */

document.addEventListener('DOMContentLoaded', () => {

    // ===== SET FORM ACTION FROM CONFIG =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm && typeof APP_CONFIG !== 'undefined' && APP_CONFIG.formspreeId) {
        contactForm.action = 'https://formspree.io/f/' + APP_CONFIG.formspreeId;
    } else if (contactForm) {
        console.warn('APP_CONFIG no encontrado. Asegurate de que js/config.js existe.');
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ===== CLOSE MENU ON LINK CLICK =====
    document.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // ===== FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.classList.contains('open');

            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('open');
            });

            if (!isOpen) {
                question.classList.add('active');
                answer.classList.add('open');
            }
        });
    });

    // ===== FORM VALIDATION UTILITIES =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateSpanishPhone(phone) {
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        const re = /^(\+34)?[67]\d{8}$/;
        return re.test(cleaned);
    }

    function clearFieldErrors() {
        document.querySelectorAll('.form__group input.error, .form__group textarea.error').forEach(el => {
            el.classList.remove('error');
        });
        document.querySelectorAll('.field-error').forEach(el => el.remove());
    }

    function showFieldError(inputId, message) {
        const input = document.getElementById(inputId);
        if (input) {
            input.classList.add('error');
            const existing = input.parentElement.querySelector('.field-error');
            if (!existing) {
                const err = document.createElement('span');
                err.className = 'field-error';
                err.textContent = message;
                input.parentElement.appendChild(err);
            }
        }
    }

    // ===== FORMSPREE FORM SUBMISSION =====
    const formSuccess = document.getElementById('formSuccess');
    const formErrors = document.getElementById('formErrors');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            clearFieldErrors();
            if (formErrors) {
                formErrors.style.display = 'none';
                formErrors.innerHTML = '';
            }

            const errors = [];
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (!validateEmail(email)) {
                errors.push('El correo electronico ingresado no es valido. Ejemplo: nombre@dominio.com');
                showFieldError('email', 'Correo electronico no valido');
            }

            if (!validateSpanishPhone(phone)) {
                errors.push('El telefono movil no es valido. Debe ser un numero espanol (ej: 612345678 o +34612345678).');
                showFieldError('phone', 'Telefono movil no valido');
            }

            if (errors.length > 0) {
                if (formErrors) {
                    formErrors.style.display = 'block';
                    const list = document.createElement('ul');
                    errors.forEach(err => {
                        const li = document.createElement('li');
                        li.textContent = err;
                        list.appendChild(li);
                    });
                    formErrors.appendChild(list);
                }
                formErrors.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                } else {
                    alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
                }
            } catch (error) {
                alert('Hubo un error de conexion. Por favor intenta de nuevo.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHORS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ACTIVE LINK HIGHLIGHT ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

});
