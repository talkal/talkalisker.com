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
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element is fully in view
    });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
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
