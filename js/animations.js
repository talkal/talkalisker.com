/**
 * Shared Scroll Animations
 * Uses IntersectionObserver to reveal elements as they enter the viewport.
 */
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, { 
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before the element is fully in view
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // Magnetic & Hover Image Reveals for Services
    const serviceItems = document.querySelectorAll('.service-card');
    
    serviceItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            const { left, top, width, height } = item.getBoundingClientRect();
            
            // Subtle "Magnetic" movement for the content
            const xMove = (x - left - width / 2) * 0.1;
            const yMove = (y - top - height / 2) * 0.1;
            
            const content = item.querySelector('.service-content');
            if (content) {
                content.style.transform = `translate(${xMove}px, ${yMove}px)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            const content = item.querySelector('.service-content');
            if (content) {
                content.style.transform = `translate(0, 0)`;
            }
        });

        // Progressive Parallax on Scroll for items
        window.addEventListener('scroll', () => {
            const rect = item.getBoundingClientRect();
            const scrolled = window.innerHeight - rect.top;
            if (scrolled > 0 && rect.top < window.innerHeight) {
                const yPos = -(scrolled * 0.05);
                const content = item.querySelector('.service-content');
                if (content && !item.matches(':hover')) {
                    content.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.dataset.width;
                barObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar-fill').forEach(b => barObserver.observe(b));
});
