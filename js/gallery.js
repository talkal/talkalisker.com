document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach(gallery => {
        const scrollContainer = gallery.querySelector('.gallery-scroll');

        // Create Buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-nav prev';
        prevBtn.innerHTML = '&#10094;'; // Left Arrow

        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-nav next';
        nextBtn.innerHTML = '&#10095;'; // Right Arrow

        // Append to container
        gallery.appendChild(prevBtn);
        gallery.appendChild(nextBtn);

        // Click Logic
        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -scrollContainer.clientWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
        });

        // Hide buttons based on scroll position (optional polish)
        const updateButtons = () => {
            const tolerance = 10; // px
            prevBtn.style.opacity = scrollContainer.scrollLeft <= tolerance ? '0' : '1';
            prevBtn.style.pointerEvents = scrollContainer.scrollLeft <= tolerance ? 'none' : 'auto';

            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            nextBtn.style.opacity = scrollContainer.scrollLeft >= maxScroll - tolerance ? '0' : '1';
            nextBtn.style.pointerEvents = scrollContainer.scrollLeft >= maxScroll - tolerance ? 'none' : 'auto';
        };

        scrollContainer.addEventListener('scroll', updateButtons);
        updateButtons(); // Initial check
    });
});
