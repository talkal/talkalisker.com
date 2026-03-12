document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    // Initial Load
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    }

    // Toggle Logic
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        if (toggleBtn) toggleBtn.textContent = theme === 'light' ? '☾' : '☀︎';
    }
});
