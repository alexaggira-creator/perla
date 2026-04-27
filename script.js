document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    const enterBtn = document.getElementById('enter-btn');
    const videoIntro = document.getElementById('video-intro');
    const mainContent = document.getElementById('main-content');
    const mainVideo = document.getElementById('main-video');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');

    // Create Particles
    const createParticles = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 10 + 5 + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            container.appendChild(particle);
        }
    };

    createParticles('particles-intro');
    createParticles('particles-main');

    // Music Logic
    let isPlaying = false;
    const toggleMusic = () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    };

    musicBtn.addEventListener('click', toggleMusic);

    // Handle Enter Button
    enterBtn.addEventListener('click', () => {
        // Start fade out sequence
        videoIntro.classList.add('fade-out');
        
        // Show main content and music button
        mainContent.classList.remove('hidden');
        musicBtn.classList.remove('hidden');

        // Play video
        if (mainVideo) {
            mainVideo.play().catch(error => console.log("Video playback failed:", error));
        }

        // Play music
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
        }).catch(error => console.log("Music autoplay failed:", error));
        
        // Finalize transition
        setTimeout(() => {
            videoIntro.style.display = 'none';
            window.scrollTo(0, 0);
            AOS.refresh(); // Refresh AOS after revealing content
        }, 800);
    });

    // Countdown Timer
    const targetDate = new Date('May 24, 2026 16:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('timer').innerHTML = "¡Es hoy!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    };

    // Update timer every minute
    setInterval(updateTimer, 60000);
    updateTimer(); // Initial call
});
