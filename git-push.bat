@echo off
cd /d "%~dp0"
if exist ".git\index.lock" del /f ".git\index.lock"
git add developer-services.html js/lang.js
git commit -m "feat: developer-services final integration — all 6 agent passes

- SEO: new title, meta description, og:image (creator photo), Twitter cards
- SEO: canonical tag, hreflang EN/ES/HE, og:site_name added
- SEO: full JSON-LD block — Person + 3x Service + FAQPage (5 questions)
- Fix: updateDocumentMetaServices now registered in lang.js dispatch table
- Copy: hero subtext 'I use' -> 'I orchestrate' (EN/ES/HE)
- Copy: process steps 'We analyze/start' -> 'I analyze/start' (EN/ES/HE)
- Copy: footer 'Built with precision.' -> 'Built with precision orchestration.'
- Copy: Launchpad feature line sharpened (EN/ES/HE)
- Copy: ES pricing upsell 'hacia Foundation' -> 'al contratar Foundation'
- Copy: HE pricing upsell fixed to natural Hebrew phrasing
- Copy: updateDocumentMetaServices — all 3 language strings refreshed
- UI: tech marquee HTML added (CSS was already written, HTML was missing)
- UI: SVG Copywriting intersection label now has lang-es + lang-he variants
- Perf: loading=lazy + decoding=async on creator photo, descriptive alt text"
git push
echo.
echo Done! Press any key to close.
pause
