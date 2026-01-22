// ==========================================
// LOADING SCREEN
// ==========================================
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 800);
    }
});

// ==========================================
// SCROLL PROGRESS INDICATOR
// ==========================================
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
});

// ==========================================
// MOBILE NAVIGATION
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECTS
// ==========================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==========================================
// PARALLAX EFFECT ON HERO
// ==========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    }
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.service-card, .contact-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// ==========================================
// SERVICE CARD INTERACTIONS
// ==========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
        `;

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
const animateCounter = (element, target, suffix = '+', duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElements = entry.target.querySelectorAll('.stat h3');
            statElements.forEach(stat => {
                const text = stat.textContent;
                const value = parseInt(text);
                const suffix = text.includes('%') ? '%' : '+';
                animateCounter(stat, value, suffix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ==========================================
// FLOATING CARDS MOUSE FOLLOW
// ==========================================
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        card.style.transform = `translateY(-20px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==========================================
// FORM VALIDATION & SUBMISSION
// ==========================================
const quoteForm = document.getElementById('quoteForm');
const formMessage = document.querySelector('.form-message');

// Currency and budget handling
const currencySelect = document.getElementById('currency');
const budgetInput = document.getElementById('budget');

const currencySymbols = {
    'PHP': '₱',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'AUD': 'A$',
    'CAD': 'C$',
    'SGD': 'S$'
};

// Minimum budget amounts for each currency
const minimumBudgets = {
    'PHP': 10000,  // ₱10,000
    'USD': 200,    // $200
    'EUR': 200,    // €200
    'GBP': 175,    // £175
    'AUD': 300,    // A$300
    'CAD': 275,    // C$275
    'SGD': 275     // S$275
};

// Update budget minimum and placeholder when currency changes
currencySelect.addEventListener('change', function() {
    const currency = this.value;
    const minimum = minimumBudgets[currency] || 10000;
    const symbol = currencySymbols[currency] || '₱';

    budgetInput.min = minimum;
    budgetInput.placeholder = `Enter amount`;
    budgetInput.step = currency === 'PHP' ? 1000 : 50;

    // Clear any existing value that might be below new minimum
    if (budgetInput.value && Number(budgetInput.value) < minimum) {
        budgetInput.value = '';
    }
});

// Real-time validation
const inputs = quoteForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    // Focus animation
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');

        // Validation on blur
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#ef4444';
            shakeElement(input);
        } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            input.style.borderColor = '#ef4444';
            shakeElement(input);
        } else if (input.id === 'budget' && input.value) {
            const currency = currencySelect.value || 'PHP';
            const minimum = minimumBudgets[currency] || 10000;
            if (Number(input.value) < minimum) {
                input.style.borderColor = '#ef4444';
                shakeElement(input);
            } else {
                input.style.borderColor = 'transparent';
            }
        } else {
            input.style.borderColor = 'transparent';
        }
    });

    // Clear error on input
    input.addEventListener('input', function() {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            input.style.borderColor = 'transparent';
        }
    });

    // Animated label (if you want to add floating labels later)
    input.addEventListener('input', function() {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});

// Email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shake animation for errors
function shakeElement(element) {
    element.style.animation = 'shake 0.5s';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Form submission
quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = quoteForm.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);

    try {
        // Validate budget before submission
        const currency = data.currency || 'PHP';
        const minimum = minimumBudgets[currency] || 10000;
        const currencySymbol = currencySymbols[currency] || '₱';

        if (data.budget && Number(data.budget) < minimum) {
            throw new Error(`Budget must be at least ${currencySymbol}${minimum.toLocaleString()}`);
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Format budget for display
        const budgetFormatted = Number(data.budget).toLocaleString();

        // Here you would normally send the data to your server
        // Example:
        // const response = await fetch('/api/quote', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });

        console.log('Form data:', {
            ...data,
            budgetFormatted: `${currencySymbol}${budgetFormatted}`
        });

        // Show success message with animation
        formMessage.textContent = '🎉 Thank you! We\'ve received your quote request and will get back to you within 24 hours.';
        formMessage.className = 'form-message success';
        formMessage.style.animation = 'slideInUp 0.5s ease-out';

        // Confetti effect
        createConfetti();

        // Reset form
        quoteForm.reset();
        inputs.forEach(input => input.classList.remove('has-value'));

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.animation = 'slideOutDown 0.5s ease-out';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 500);
        }, 5000);

    } catch (error) {
        // Show error message
        if (error.message.includes('Budget')) {
            formMessage.textContent = '❌ ' + error.message;
        } else {
            formMessage.textContent = '❌ Oops! Something went wrong. Please try again or contact us directly.';
        }
        formMessage.className = 'form-message error';
        formMessage.style.animation = 'shake 0.5s ease-out';

        console.error('Form submission error:', error);
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Confetti effect for successful submission
function createConfetti() {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            pointer-events: none;
            z-index: 10000;
        `;

        document.body.appendChild(confetti);

        const fall = confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        fall.onfinish = () => confetti.remove();
    }
}

// Add form animation styles
const formAnimStyle = document.createElement('style');
formAnimStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(formAnimStyle);

// ==========================================
// CURSOR TRAIL EFFECT (OPTIONAL)
// ==========================================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Only on desktop
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    }
});

// ==========================================
// TYPING EFFECT FOR HERO (Optional enhancement)
// ==========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ==========================================
// TECH STACK ROTATION
// ==========================================
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ==========================================
// SCROLL TO TOP BUTTON (Optional)
// ==========================================
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
};

createScrollToTop();

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to expensive scroll handlers if needed
// window.addEventListener('scroll', debounce(expensiveFunction, 100));

console.log('🎵 CodeHarana - Serenading your business with exceptional code!');
