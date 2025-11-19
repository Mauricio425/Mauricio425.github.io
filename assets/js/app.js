// ===================================
// Smooth Scrolling & Navigation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');

            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .education-card, .interest-card, .contact-card'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });

    // Typing effect for hero title (optional enhancement)
    // Disabled by default - uncomment to enable
    /*
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }
    */

    // Skill tag click interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Smooth reveal for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 100);
    }
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===================================
// Accessibility Enhancements
// ===================================
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--primary-color)';
                this.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }
});

// ===================================
// Print Styles Handler
// ===================================
window.addEventListener('beforeprint', function() {
    console.log('Preparing page for printing...');
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%cHello, fellow developer! 👋', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cLooking at the source code? I appreciate that!', 'font-size: 14px; color: #64748b;');
console.log('%cFeel free to reach out: Mauricio.GarciaPaez@proton.me', 'font-size: 14px; color: #10b981;');
