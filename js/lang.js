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
        // Find the page-specific meta update function and call it
        const handlers = [
            'updateDocumentMetaDev',
            'updateDocumentMetaServices',
            'updateDocumentMetaMain',
            'updateDocumentMetaCopywriter',
            'updateDocumentMetaWriter',
            'updateDocumentMetaYoga',
        ];
        for (const name of handlers) {
            if (typeof window[name] === 'function') {
                window[name](lang);
                break;
            }
        }
    }
});
