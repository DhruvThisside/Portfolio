// ========================================
// Mobile Navigation Toggle
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a, .cert-link, .cv-download, .project-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
    // Keyboard support: Enter/Space on non-anchor elements if needed
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Active Navigation Highlight on Scroll
// ========================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.skill-category, .project-card, .certificate-card, .achievement-card, .training-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ========================================
// Add visible class CSS via JS (fallback)
// ========================================
const style = document.createElement('style');
style.textContent = `
    .skill-category, .project-card, .certificate-card, .achievement-card, .training-card, .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-category.visible, .project-card.visible, .certificate-card.visible, 
    .achievement-card.visible, .training-card.visible, .timeline-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-item {
        transition-delay: 0.1s;
    }
    
    .timeline-item:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .timeline-item:nth-child(3) {
        transition-delay: 0.3s;
    }
`;
document.head.appendChild(style);

// ========================================
// Parallax Effect for Hero Section
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ========================================
// Certificate Card Click Handler
// ========================================
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('click', () => {
        // Add a click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

// ========================================
// Skill Tag Animation on Hover
// ========================================
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(3deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========================================
// Contact Link Animation
// ========================================
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.querySelector('i').style.transform = 'scale(1.2)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.querySelector('i').style.transform = 'scale(1)';
    });
});

// ========================================
// Initialize - Add loaded class for page load animation
// ========================================
    // ========================================
    // Simple CV Selector Download Handler
    // ========================================
    function initCVSelector() {
        const downloadBtn = document.getElementById('download-cv-btn');
        const select = document.getElementById('cv-type-select');
        
        if (!downloadBtn || !select) return;
        
        // Button toggles selector visibility
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            select.classList.toggle('active');
            select.focus();
        });
        
        // Select → download + hide
        select.addEventListener('change', () => {
            const selectedCV = select.value;
            const link = document.createElement('a');
            link.href = selectedCV;
            link.download = selectedCV.replace('.pdf', '');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Feedback
            const originalHTML = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            downloadBtn.style.background = '#10b981';
            select.classList.remove('active');
            setTimeout(() => {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.style.background = '';
            }, 2000);
        });
        
        // Click outside → hide
        document.addEventListener('click', (e) => {
            if (!downloadBtn.contains(e.target) && !select.contains(e.target)) {
                select.classList.remove('active');
            }
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', initCVSelector);

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
});

// Add body loaded styles
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadStyle);

