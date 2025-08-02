// Main JavaScript file for MetaBiome

// Utility functions
function getElement(selector) {
    return document.querySelector(selector);
}

function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = getAllElements('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = getElement(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = getAllElements('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = getAllElements('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = getElement('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Add CSS for tooltips
function addTooltipStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tooltip {
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);
}

// Handle form submissions
function initForms() {
    const forms = getAllElements('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission logic here
            console.log('Form submitted:', form);
        });
    });
}

// Add mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = getElement('.mobile-menu-button');
    const mobileMenu = getElement('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('MetaBiome initialized');
    
    // Initialize all features
    initSmoothScrolling();
    initAnimations();
    initTooltips();
    addTooltipStyles();
    initForms();
    initMobileMenu();
    
    // Add some interactive features
    addInteractiveFeatures();
});

// Add interactive features
function addInteractiveFeatures() {
    // Add hover effects to buttons
    const buttons = getAllElements('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to cards
    const cards = getAllElements('.card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Export functions for use in other files
window.MetaBiome = {
    initSmoothScrolling,
    initAnimations,
    initTooltips,
    initForms,
    initMobileMenu
}; 