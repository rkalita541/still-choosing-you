// Password Protection
const CORRECT_PASSWORD = "iloveyou"; // Change this to your desired password

function checkPassword() {
    const input = document.getElementById('password-input');
    const error = document.getElementById('password-error');
    const enteredPassword = input.value;

    if (enteredPassword === CORRECT_PASSWORD) {
        // Correct password - show welcome screen
        document.getElementById('screen-password').classList.remove('active');
        document.getElementById('screen-welcome').classList.add('active');
        error.textContent = '';
    } else {
        // Wrong password
        error.textContent = '❌ Incorrect password. Try again!';
        input.value = '';
        input.focus();

        // Shake animation
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// Screen navigation
function navigateToScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    const nextScreen = document.getElementById(screenId);

    if (currentScreen && nextScreen) {
        // Exit current screen
        currentScreen.classList.remove('active');
        currentScreen.classList.add('exit-left');

        // Enter next screen
        setTimeout(() => {
            currentScreen.classList.remove('exit-left');
            nextScreen.classList.add('active');
        }, 100);
    }
}

// Music control
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🔊';
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '🔇';
        }
    });
}

// Auto-play music on first interaction
document.addEventListener('click', () => {
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch(e => {
            console.log('Auto-play prevented:', e);
        });
    }
}, { once: true });

// Carousel functionality
let currentSlide = 0;
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Touch/swipe variables
let startX = 0;
let currentX = 0;
let isDragging = false;

function updateCarousel() {
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Touch events for swipe
if (track) {
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        // Add resistance effect
        if ((currentSlide === 0 && diff < 0) || (currentSlide === totalSlides - 1 && diff > 0)) {
            return;
        }
    });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const diff = startX - currentX;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
            }
        }

        updateCarousel();
    });

    // Mouse events for desktop
    track.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        const diff = startX - currentX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentSlide < totalSlides - 1) {
                currentSlide++;
            } else if (diff < 0 && currentSlide > 0) {
                currentSlide--;
            }
        }

        updateCarousel();
    });

    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';
        }
    });

    track.style.cursor = 'grab';
}

// Carousel arrow navigation
window.moveCarousel = function (direction) {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;

    currentSlide += direction;

    // Loop around
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    updateCarousel();
}
