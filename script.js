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

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==========================================
// NAVBAR SCROLL EFFECTS
// ==========================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
// STATS COUNTER ANIMATION
// ==========================================
const animateCounter = (element, target, suffix = '+', duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
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
if (heroStats) statsObserver.observe(heroStats);

// ==========================================
// FAQ ACCORDION
// ==========================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isOpen = faqItem.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isOpen) {
            faqItem.classList.add('active');
        }
    });
});

// ==========================================
// TESTIMONIALS SLIDER (Auto-rotate)
// ==========================================
// Simple logic to show/hide if needed, but current CSS uses a grid.
// Let's add simple intersection animation for cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .testimonial-card, .faq-item, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    cardObserver.observe(el);
});

// ==========================================
// FORM SUBMISSION (Web3Forms)
// ==========================================
const quoteForm = document.getElementById('quoteForm');
const formMessage = document.querySelector('.form-message');

if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = quoteForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Composing...</span>';
        submitBtn.disabled = true;

        const formData = new FormData(quoteForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: '78243168-0b54-47ed-b1a9-d8c247177616', // Replace with valid key if needed
                    subject: `New Request from ${data.name}`,
                    ...data
                })
            });

            const result = await response.json();
            if (result.success) {
                formMessage.textContent = '🎉 Your message has been sent successfully!';
                formMessage.className = 'form-message success';
                quoteForm.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            formMessage.textContent = '❌ Oops! Something went wrong. Please try again.';
            formMessage.className = 'form-message error';
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            formMessage.style.display = 'block';
            setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
        }
    });
}

// Parallax Hero
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

console.log('🎵 CodeHarana - Composing Digital Excellence.');

// ==========================================
// MUSIC PLAYER LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const musicContainer = document.querySelector('.music-player-container');
    const toggleBtn = document.querySelector('.music-toggle-btn');
    const musicPanel = document.querySelector('.music-panel');
    const closeBtn = document.querySelector('.music-close');
    const audio = document.getElementById('harana-audio');
    const playBtn = document.querySelector('.play-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    const progressContainer = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    const currTime = document.querySelector('.current-time');
    const durTime = document.querySelector('.total-time');
    const visualizer = document.querySelector('.music-visualizer');

    // Toggle Music Panel
    toggleBtn.addEventListener('click', () => {
        musicPanel.classList.toggle('active');
        // If panel is opening and music is not playing, maybe hint at playing? 
        // For now just toggle visibility.
    });

    closeBtn.addEventListener('click', () => {
        musicPanel.classList.remove('active');
    });

    // Play/Pause Audio
    function togglePlay() {
        if (audio.paused) {
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                    toggleBtn.classList.add('playing');
                    visualizer.classList.add('playing');
                }).catch(error => {
                    console.log("Audio play blocked or failed:", error);
                    // Open panel to encourage user interaction
                    musicPanel.classList.add('active');

                    // Show a tooltip hint
                    const tooltip = document.querySelector('.music-tooltip');
                    if (tooltip) {
                        tooltip.textContent = "Click to Play Music";
                        tooltip.style.opacity = '1';
                        tooltip.style.visibility = 'visible';
                        setTimeout(() => {
                            tooltip.textContent = "Serenade Me";
                        }, 3000);
                    }
                });
            }
        } else {
            audio.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            toggleBtn.classList.remove('playing');
            visualizer.classList.remove('playing');
        }
    }

    playBtn.addEventListener('click', togglePlay);

    // Update Progress Bar & Time
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = `${progressPercent}%`;

        // Calculate display time
        const mins = Math.floor(currentTime / 60);
        let secs = Math.floor(currentTime % 60);
        if (secs < 10) secs = '0' + secs;
        currTime.innerText = `${mins}:${secs}`;

        // Calculate duration time
        if (!isNaN(duration)) {
            const totalMins = Math.floor(duration / 60);
            let totalSecs = Math.floor(duration % 60);
            if (totalSecs < 10) totalSecs = '0' + totalSecs;
            durTime.innerText = `${totalMins}:${totalSecs}`;
        }
    }

    // Set Progress Bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);

    // Audio Ends
    audio.addEventListener('ended', () => {
        // Loop is enabled in HTML, but just in case
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        toggleBtn.classList.remove('playing');
    });

    // Initial Duration
    audio.addEventListener('loadedmetadata', () => {
        const totalMins = Math.floor(audio.duration / 60);
        let totalSecs = Math.floor(audio.duration % 60);
        if (totalSecs < 10) totalSecs = '0' + totalSecs;
        durTime.innerText = `${totalMins}:${totalSecs}`;
    });

    // Auto-open tooltip after a delay
    setTimeout(() => {
        const tooltip = document.querySelector('.music-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.transform = 'translateY(-50%) translateX(0)';

            setTimeout(() => {
                // Hide again if not hovered
                if (!toggleBtn.matches(':hover')) {
                    tooltip.style.opacity = '';
                    tooltip.style.visibility = '';
                    tooltip.style.transform = '';
                }
            }, 4000);
        }
    }, 3000);
});

