document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
    
    // Scroll
    
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 1000/*edit to makke shadow appear sooner or later*/) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active Section   

    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Skills
    
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Contact
    
    const contactForm = document.getElementById('contactForm');
    const emailContactButton = document.getElementById('emailContactButton');

    if (emailContactButton && contactForm) {
        emailContactButton.addEventListener('click', function() {
            contactForm.classList.remove('hidden');
            document.getElementById('message').focus();
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (contactForm) {
        const closeFormButton = document.getElementById('closeFormButton');

        // Close button functionality
        if (closeFormButton) {
            closeFormButton.addEventListener('click', function() {
                contactForm.classList.add('hidden');
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.add('hidden');
                }
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = document.getElementById('message').value;
            const subject = 'Website contact request';
            const body = `Message: ${message}`;
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }

            // Reset form fields
            contactForm.reset();

            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=juanamiibo879@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(gmailLink, '_blank');
            
            const mailtoLink = /*if you clone this, edit to your mail here->*/`mailto:juanamiibo879@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            window.location.href = mailtoLink;

            // Auto-hide form and success message after 3 seconds
            setTimeout(function() {
                contactForm.classList.add('hidden');
                if (successMessage) {
                    successMessage.classList.add('hidden');
                }
            }, 3000);
        });
    }
    
});

// FAQ accordion behavior with slide animation
document.addEventListener('DOMContentLoaded', function() {
    const faqButtons = document.querySelectorAll('.faq-item');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const answer = item && item.querySelector('.faq-answer');
            if (!answer) return;

            const expanded = this.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                // close
                this.setAttribute('aria-expanded', 'false');
                if (item) item.classList.remove('open');
                answer.hidden = false;
                answer.style.maxHeight = answer.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    answer.style.maxHeight = '0px';
                    answer.style.opacity = '0';
                });

                if (answer._faqTransitionHandler) {
                    answer.removeEventListener('transitionend', answer._faqTransitionHandler);
                }
                const onClose = function(e) {
                    if (e.propertyName === 'max-height') {
                        answer.hidden = true;
                        answer.style.maxHeight = '';
                        answer.style.opacity = '0';
                        answer.removeEventListener('transitionend', onClose);
                        answer._faqTransitionHandler = null;
                    }
                };
                answer._faqTransitionHandler = onClose;
                answer.addEventListener('transitionend', onClose);
            } else {
                // open
                this.setAttribute('aria-expanded', 'true');
                if (item) item.classList.add('open');
                answer.hidden = false;
                answer.style.opacity = '0';
                answer.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                });

                if (answer._faqTransitionHandler) {
                    answer.removeEventListener('transitionend', answer._faqTransitionHandler);
                }
                answer._faqTransitionHandler = null;
            }
        });
    });
});