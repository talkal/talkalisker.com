document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    const root = document.documentElement;
    const savedLang = localStorage.getItem('language') || 'en';

    // Initial Load - Language
    // Only set lang if it's not explicitly defined on the html tag for single-language files like shalom.html
    const hasExplicitLang = root.hasAttribute('lang') && !langToggleBtn;
    
    if (!hasExplicitLang) {
        root.setAttribute('lang', savedLang);
        updateDocumentMeta(savedLang);
    }

    // Toggle Language Logic
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const currentLang = root.getAttribute('lang');
            let newLang;
            if (currentLang === 'en') newLang = 'es';
            else if (currentLang === 'es') newLang = 'he';
            else newLang = 'en';
            
            root.setAttribute('lang', newLang);
            localStorage.setItem('language', newLang);
            updateDocumentMeta(newLang);
        });
    }

    function updateDocumentMeta(lang) {
        // Find if any specific meta update function exists on the page (e.g., developer.html)
        if (typeof window.updateDocumentMetaDev === 'function') {
            window.updateDocumentMetaDev(lang);
        } else if (typeof window.updateDocumentMetaMain === 'function') {
            window.updateDocumentMetaMain(lang);
        }
    }
});
