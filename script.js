// ==========================================
// UTILITIES
// ==========================================
const safeQuerySelector = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const safeAddEventListener = (element, event, handler) => {
    if (element) {
        element.addEventListener(event, handler);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 CodeHarana - Composing Digital Excellence.');

    // ==========================================
    // LOADING SCREEN
    // ==========================================
    const loadingScreen = safeQuerySelector('.loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.classList.add('loaded');
            }, 800);
        });
    }

    // ==========================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================
    const scrollProgress = safeQuerySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================
    const hamburger = safeQuerySelector('.hamburger');
    const navMenu = safeQuerySelector('.nav-menu');

    if (hamburger && navMenu) {
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
    }

    // ==========================================
    // NAVBAR SCROLL EFFECTS
    // ==========================================
    const navbar = safeQuerySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
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
    const heroStats = safeQuerySelector('.hero-stats');
    if (heroStats) {
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
                        // Extract number only, removing suffix for parsing
                        const numberMatch = text.match(/\d+/);
                        if (numberMatch) {
                            const value = parseInt(numberMatch[0]);
                            const suffix = text.includes('%') ? '%' : '+';
                            animateCounter(stat, value, suffix);
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(heroStats);
    }

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
    // INTERSECTION ANIMATIONS
    // ==========================================
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .faq-item, .project-card');
    if (animatedElements.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation based on index is tricky with observer, 
                    // usually better to rely on CSS delay or simple timeout
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            cardObserver.observe(el);
        });
    }

    // ==========================================
    // FORM SUBMISSION (Web3Forms)
    // ==========================================
    const quoteForm = document.getElementById('quoteForm');
    const formMessage = document.querySelector('.form-message');

    if (quoteForm && formMessage) {
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
                        access_key: '78243168-0b54-47ed-b1a9-d8c247177616',
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

    // ==========================================
    // PARALLAX HERO
    // ==========================================
    const heroContent = safeQuerySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        });
    }

    // ==========================================
    // MUSIC PLAYER LOGIC
    // ==========================================
    const musicContainer = safeQuerySelector('.music-player-container');

    if (musicContainer) {
        const toggleBtn = safeQuerySelector('.music-toggle-btn');
        const musicPanel = safeQuerySelector('.music-panel');
        const closeBtn = safeQuerySelector('.music-close');
        const audio = document.getElementById('harana-audio');
        const playBtn = safeQuerySelector('.play-btn');
        const playIcon = safeQuerySelector('.play-icon');
        const pauseIcon = safeQuerySelector('.pause-icon');
        const progressContainer = safeQuerySelector('.progress-bar');
        const progressFill = safeQuerySelector('.progress-fill');
        const currTime = safeQuerySelector('.current-time');
        const durTime = safeQuerySelector('.total-time');
        const visualizer = safeQuerySelector('.music-visualizer');

        if (toggleBtn && musicPanel) {
            toggleBtn.addEventListener('click', () => {
                musicPanel.classList.toggle('active');
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    musicPanel.classList.remove('active');
                });
            }
        }

        if (audio && playBtn) {
            const togglePlay = () => {
                if (audio.paused) {
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            if (playIcon) playIcon.classList.add('hidden');
                            if (pauseIcon) pauseIcon.classList.remove('hidden');
                            if (toggleBtn) toggleBtn.classList.add('playing');
                            if (visualizer) visualizer.classList.add('playing');
                        }).catch(error => {
                            console.log("Audio play blocked or failed:", error);
                            if (musicPanel) musicPanel.classList.add('active');
                            const tooltip = safeQuerySelector('.music-tooltip');
                            if (tooltip) {
                                tooltip.textContent = "Click to Play Music";
                                tooltip.style.opacity = '1';
                                tooltip.style.visibility = 'visible';
                            }
                        });
                    }
                } else {
                    audio.pause();
                    if (playIcon) playIcon.classList.remove('hidden');
                    if (pauseIcon) pauseIcon.classList.add('hidden');
                    if (toggleBtn) toggleBtn.classList.remove('playing');
                    if (visualizer) visualizer.classList.remove('playing');
                }
            };

            playBtn.addEventListener('click', togglePlay);

            const updateProgress = (e) => {
                const { duration, currentTime } = e.srcElement;
                if (isNaN(duration)) return;

                const progressPercent = (currentTime / duration) * 100;
                if (progressFill) progressFill.style.width = `${progressPercent}%`;

                if (currTime) {
                    const mins = Math.floor(currentTime / 60);
                    let secs = Math.floor(currentTime % 60);
                    if (secs < 10) secs = '0' + secs;
                    currTime.innerText = `${mins}:${secs}`;
                }

                if (durTime && !isNaN(duration)) {
                    const totalMins = Math.floor(duration / 60);
                    let totalSecs = Math.floor(duration % 60);
                    if (totalSecs < 10) totalSecs = '0' + totalSecs;
                    durTime.innerText = `${totalMins}:${totalSecs}`;
                }
            };

            const setProgress = (e) => {
                if (!progressContainer) return;
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                if (!isNaN(duration)) {
                    audio.currentTime = (clickX / width) * duration;
                }
            };

            audio.addEventListener('timeupdate', updateProgress);
            if (progressContainer) progressContainer.addEventListener('click', setProgress);

            audio.addEventListener('ended', () => {
                if (playIcon) playIcon.classList.remove('hidden');
                if (pauseIcon) pauseIcon.classList.add('hidden');
                if (toggleBtn) toggleBtn.classList.remove('playing');
            });

            // Handle metadata loading
            const setDuration = () => {
                if (durTime && !isNaN(audio.duration) && audio.duration !== Infinity) {
                    const totalMins = Math.floor(audio.duration / 60);
                    let totalSecs = Math.floor(audio.duration % 60);
                    if (totalSecs < 10) totalSecs = '0' + totalSecs;
                    durTime.innerText = `${totalMins}:${totalSecs}`;
                }
            };

            if (audio.readyState >= 1) {
                setDuration();
            } else {
                audio.addEventListener('loadedmetadata', setDuration);
            }
        }

        // Auto-open tooltip
        setTimeout(() => {
            const tooltip = safeQuerySelector('.music-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.transform = 'translateY(-50%) translateX(0)';

                setTimeout(() => {
                    const toggleBtn = safeQuerySelector('.music-toggle-btn');
                    if (toggleBtn && !toggleBtn.matches(':hover')) {
                        tooltip.style.opacity = '';
                        tooltip.style.visibility = '';
                        tooltip.style.transform = '';
                    }
                }, 4000);
            }
        }, 3000);
    }
});

