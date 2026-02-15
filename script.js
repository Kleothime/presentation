document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const currentEl = document.getElementById('current');
    const totalEl = document.getElementById('total');
    const progressEl = document.getElementById('progress');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let current = 0;
    const total = slides.length;

    totalEl.textContent = total;

    function updateSlide(direction) {
        const prev = current;
        if (direction === 'next' && current < total - 1) {
            current++;
        } else if (direction === 'prev' && current > 0) {
            current--;
        } else {
            return;
        }

        // Remove all transition classes
        slides.forEach(s => s.classList.remove('active', 'exit-left'));

        // Animate out
        if (direction === 'next') {
            slides[prev].classList.add('exit-left');
        }

        // Animate in
        slides[current].classList.add('active');

        // Re-trigger content animation
        const content = slides[current].querySelector('.slide-content');
        content.style.animation = 'none';
        content.offsetHeight; // trigger reflow
        content.style.animation = '';

        // Update counter & progress
        currentEl.textContent = current + 1;
        progressEl.style.width = ((current / (total - 1)) * 100) + '%';
    }

    // Button navigation
    nextBtn.addEventListener('click', () => updateSlide('next'));
    prevBtn.addEventListener('click', () => updateSlide('prev'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            updateSlide('next');
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            updateSlide('prev');
        }
    });

    // Touch/swipe navigation
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) updateSlide('next');
            else updateSlide('prev');
        }
    });

    // Initialize progress
    progressEl.style.width = '0%';
});
