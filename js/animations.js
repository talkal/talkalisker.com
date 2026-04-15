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
});
