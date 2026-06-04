        let supabaseClient = null;
        try {
            const SUPABASE_URL = 'https://xsivyrmpcgomyiyrsidg.supabase.co';
            const SUPABASE_KEY = 'sb_publishable_c9qIfHryD8QI-adbltinYQ_DGNFblET';
            if (window.supabase) {
                supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            } else {
                console.warn('supabaseClient not loaded. Signatures will be disabled.');
            }
        } catch (e) {
            console.error('Failed to init supabaseClient:', e);
        }

        async function generateDocumentHash() {
            const text = document.querySelector('main').innerText;
            const msgBuffer = new TextEncoder().encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        async function getIpAddress() {
            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                return data.ip;
            } catch (e) {
                return 'unknown';
            }
        }

        async function checkSignatureStatus() {
            const reportId = document.title.split(' | ')[0];
            
            // First load local storage signatures (fallback)
            const cards = document.querySelectorAll('.signature-card');
            cards.forEach(card => {
                const roleEl = card.querySelector('.signature-role');
                const role = roleEl ? roleEl.innerText.trim() : 'unknown';
                const sigId = `sig_${reportId}_${role}`.replace(/\s+/g, '_');
                const savedSig = localStorage.getItem(sigId);
                if (savedSig) {
                    try {
                        const data = JSON.parse(savedSig);
                        const line = card.querySelector('.signature-line');
                        if (line && line.dataset.signed !== 'true') {
                            line.innerHTML = `<span style="font-family: 'Georgia', cursive; font-size: 1.5rem; color: var(--text-primary); line-height: 1;">${data.name}</span> <span style="font-size: 0.65rem; color: var(--text-secondary); margin-left: 10px; font-family: var(--font-mono);">(Digitally Signed ${data.date})</span>`;
                            line.style.borderBottom = 'none';
                            line.style.opacity = '1';
                            line.style.background = 'none';
                            line.style.height = 'auto';
                            line.dataset.signed = 'true';
                            card.style.cursor = 'default';
                        }
                    } catch (e) {}
                }
            });

            if (!supabaseClient) return;
            const requiresSigMeta = document.querySelector('meta[name="requires_signature"]');
            if (requiresSigMeta && requiresSigMeta.getAttribute('content') === 'true') {
                const { data, error } = await supabaseClient
                    .from('signatures')
                    .select('*')
                    .eq('report_id', reportId)
                    .order('created_at', { ascending: false });

                if (data && data.length > 0) {
                    data.forEach(sig => lockSignatureCard(sig));
                }
            }
        }

        function lockSignatureCard(sigData) {
            const cards = document.querySelectorAll('.signature-card');
            cards.forEach(card => {
                const roleEl = card.querySelector('.signature-role');
                const cardRole = roleEl ? roleEl.innerText.trim() : 'unknown';
                
                if (sigData.role === cardRole || sigData.role === 'unknown' || !sigData.role) {
                    const line = card.querySelector('.signature-line');
                    if (line && line.dataset.signed === 'true') return;
                    
                    const dateStr = new Date(sigData.created_at).toLocaleString();
                    const emailStr = sigData.email && sigData.email !== 'unknown@client.com' ? `<br>Email: ${sigData.email}` : '';
                    
                    if (line) {
                        line.innerHTML = `
                            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 5px;">
                                <span style="font-family: 'Georgia', cursive; font-size: 1.8rem; color: var(--text-primary); line-height: 1;">${sigData.client_name}</span>
                                <span style="font-size: 0.75rem; color: var(--text-secondary); font-family: var(--font-mono); line-height: 1.4;">
                                    ✓ Cryptographically Verified${emailStr}<br>
                                    Date: ${dateStr}<br>
                                    Hash: ${sigData.document_hash.substring(0, 16)}...
                                </span>
                            </div>
                        `;
                        line.style.borderBottom = 'none';
                        line.style.opacity = '1';
                        line.style.background = 'none';
                        line.style.height = 'auto';
                        line.dataset.signed = 'true';
                        card.style.cursor = 'default';
                    }
                }
            });
        }
        function toggleTheme() {
            const html = document.documentElement;
            const target = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
            updateIcons(target);
        }
        function updateIcons(theme) {
            document.getElementById('sun-icon').style.display = theme === 'light' ? 'block' : 'none';
            document.getElementById('moon-icon').style.display = theme === 'dark' ? 'block' : 'none';
        }

        function toggleLang() {
            const html = document.documentElement;
            const available = JSON.parse(html.getAttribute('data-languages') || '["en"]');
            if (available.length < 2) return;
            const current = html.getAttribute('lang') || 'en';
            setLang(available[(available.indexOf(current) + 1) % available.length]);
        }

        function setLang(lang) {
            const html = document.documentElement;
            html.setAttribute('lang', lang);
            localStorage.setItem('language', lang);
            document.querySelectorAll('.lang-block, .lang-nav, .lang-title').forEach(b => {
                const match = b.getAttribute('lang') === lang;
                if (match) {
                    b.classList.add('lang-fade-in');
                    b.style.display = b.classList.contains('lang-title') ? 'inline' : 'block';
                    b.addEventListener('animationend', () => b.classList.remove('lang-fade-in'), { once: true });
                } else {
                    b.style.display = 'none';
                }
            });
            // Sync document title
            const activeTitleEl = document.querySelector(`.lang-title[lang="${lang}"]`);
            if (activeTitleEl) {
                document.title = activeTitleEl.textContent + ' | Talkalisker Client Portal';
            }
            const indicator = document.getElementById('lang-indicator');
            if (indicator) indicator.textContent = lang === 'he' ? 'עב' : lang.toUpperCase();
        }

        function toggleDrawer() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('nav-overlay');
            const toggle = document.getElementById('nav-toggle');
            
            const isOpen = sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
            
            // a11y support
            toggle.setAttribute('aria-expanded', isOpen);
            sidebar.setAttribute('aria-hidden', !isOpen);
        }
        function closeDrawer() {
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('nav-overlay').classList.remove('open');
            document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
            document.getElementById('sidebar').setAttribute('aria-hidden', 'true');
        }

        function openLightbox(src) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox').style.display = 'flex';
        }
        function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }

        async function openSignaturePad(card) {
            const requiresSigMeta = document.querySelector('meta[name="requires_signature"]');
            if (!requiresSigMeta || requiresSigMeta.getAttribute('content') !== 'true') {
                // Fallback for non-enforced documents
                const line = card.querySelector('.signature-line');
                if (line.dataset.signed === 'true') return;
                const name = prompt("Enter your full name to sign digitally:");
                if (name) {
                    const roleEl = card.querySelector('.signature-role');
                    const role = roleEl ? roleEl.innerText.trim() : 'unknown';
                    const reportId = document.title.split(' | ')[0];
                    const sigId = `sig_${reportId}_${role}`.replace(/\s+/g, '_');
                    const dateStr = new Date().toLocaleDateString();
                    localStorage.setItem(sigId, JSON.stringify({ name, date: dateStr }));

                    line.innerHTML = `<span style="font-family: 'Georgia', cursive; font-size: 1.5rem; color: var(--text-primary); line-height: 1;">${name}</span> <span style="font-size: 0.65rem; color: var(--text-secondary); margin-left: 10px; font-family: var(--font-mono);">(Digitally Signed ${dateStr})</span>`;
                    line.style.borderBottom = 'none';
                    line.style.opacity = '1';
                    line.style.background = 'none';
                    line.style.height = 'auto';
                    line.dataset.signed = 'true';
                    card.style.cursor = 'default';
                }
                return;
            }

            const roleEl = card.querySelector('.signature-role');
            window.currentlySigningRole = roleEl ? roleEl.innerText.trim() : 'unknown';

            const line = card.querySelector('.signature-line');
            if (line.dataset.signed === 'true') return;
            if (line.dataset.signing === 'true') return;
            line.dataset.signing = 'true';
            
            line.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; text-align: left; padding: 10px 0;">
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Enter details to verify signature:</div>
                    <input type="text" id="sig-name" placeholder="Full Legal Name" style="padding: 10px; border-radius: 4px; border: 1px solid var(--border-subtle); background: var(--bg-core); color: var(--text-primary); font-family: var(--font-mono); width: 100%; box-sizing: border-box;">
                    <input type="email" id="sig-email" placeholder="Email Address" style="padding: 10px; border-radius: 4px; border: 1px solid var(--border-subtle); background: var(--bg-core); color: var(--text-primary); font-family: var(--font-mono); width: 100%; box-sizing: border-box;">
                    <button onclick="requestOtp(this.closest('.signature-card'))" style="padding: 10px; border-radius: 4px; border: none; background: var(--accent); color: white; cursor: pointer; font-weight: bold; width: 100%;">Send Security Code</button>
                </div>
            `;
            line.style.height = 'auto';
            line.style.borderBottom = 'none';
            line.style.opacity = '1';
        }

        async function requestOtp(card) {
            const name = card.querySelector('#sig-name').value.trim();
            const email = card.querySelector('#sig-email').value.trim();
            if (!name || !email) return alert("Please enter both name and email.");
            
            const btn = card.querySelector('button');
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const { data, error } = await supabaseClient.auth.signInWithOtp({ email });
            if (error) {
                alert("Error sending code: " + error.message);
                btn.innerText = 'Send Security Code';
                btn.disabled = false;
                return;
            }

            const line = card.querySelector('.signature-line');
            line.dataset.name = name;
            line.dataset.email = email;
            line.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; text-align: left; padding: 10px 0;">
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Enter 6-digit code sent to ${email}:</div>
                    <input type="text" id="sig-code" placeholder="000000" style="padding: 10px; border-radius: 4px; border: 1px solid var(--border-subtle); background: var(--bg-core); color: var(--text-primary); font-family: var(--font-mono); width: 100%; box-sizing: border-box; text-align: center; font-size: 1.5rem; letter-spacing: 5px;">
                    <button onclick="verifyOtp(this.closest('.signature-card'))" style="padding: 10px; border-radius: 4px; border: none; background: var(--accent); color: white; cursor: pointer; font-weight: bold; width: 100%;">Verify & Sign</button>
                </div>
            `;
        }

        async function verifyOtp(card) {
            const code = card.querySelector('#sig-code').value.trim();
            if (!code) return;

            const line = card.querySelector('.signature-line');
            const name = line.dataset.name;
            const email = line.dataset.email;

            const btn = card.querySelector('button');
            btn.innerText = 'Verifying...';
            btn.disabled = true;

            const { data: authData, error: authErr } = await supabaseClient.auth.verifyOtp({ email, token: code, type: 'email' });
            
            if (authErr) {
                alert("Invalid code: " + authErr.message);
                btn.innerText = 'Verify & Sign';
                btn.disabled = false;
                return;
            }

            btn.innerText = 'Securing...';
            try {
                const reportId = document.title.split(' | ')[0];
                const hash = await generateDocumentHash();
                const ip = await getIpAddress();
                
                const { data, error } = await supabaseClient
                    .from('signatures')
                    .insert([{
                        report_id: reportId,
                        client_name: name,
                        role: window.currentlySigningRole || 'unknown',
                        email: email,
                        ip_address: ip,
                        user_agent: navigator.userAgent,
                        document_hash: hash
                    }])
                    .select();

                if (error) throw error;
                if (data && data.length > 0) lockSignatureCard(data[0]);
            } catch (err) {
                console.error("Signature failed:", err);
                alert("Database error: " + err.message);
                btn.innerText = 'Verify & Sign';
                btn.disabled = false;
            }
        }

        function attemptDecrypt() {
            const key = document.getElementById('auth-key').value;
            const ciphertext = document.getElementById('encrypted-payload').textContent.slice(1, -1);
            try {
                const bytes = CryptoJS.AES.decrypt(ciphertext, key);
                const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);
                if (!decryptedStr) throw new Error('empty');
                const payload = JSON.parse(decryptedStr);
                document.getElementById('lock-screen').style.display = 'none';
                document.getElementById('sidebar-nav').innerHTML = `
                    <div class="lang-nav" lang="en">${payload.nav_en}</div>
                    <div class="lang-nav" lang="es" style="display: none;">${payload.nav_es}</div>
                    <div class="lang-nav" lang="he" style="display: none;">${payload.nav_he}</div>
                `;
                document.getElementById('decrypted-content').innerHTML = `
                    <div class="lang-block" lang="en">${payload.content_en || ''}</div>
                    <div class="lang-block" lang="es" style="display: none;">${payload.content_es || ''}</div>
                    <div class="lang-block" lang="he" style="display: none;">${payload.content_he || ''}</div>
                `;
                document.getElementById('decrypted-content').style.display = 'block';
                const html = document.documentElement;
                const available = JSON.parse(html.getAttribute('data-languages') || '["en"]');
                const saved = localStorage.getItem('language') || available[0];
                setLang(available.includes(saved) ? saved : available[0]);
                initInteractiveFeatures();
                checkSignatureStatus();
            } catch (e) {
                document.getElementById('auth-error').style.display = 'block';
                document.getElementById('auth-key').value = '';
            }
        }

        function initInteractiveFeatures() {
            // Lightbox
            document.querySelectorAll('.evidence-img').forEach(img => {
                img.onclick = () => openLightbox(img.src);
            });

            // Interactive action checkboxes
            document.querySelectorAll('.action-checkbox').forEach(cb => {
                const titleEl = cb.closest('.action-info') && cb.closest('.action-info').querySelector('.action-title');
                if (!titleEl) return;
                const id = 'action_' + titleEl.textContent.trim().slice(0, 60).replace(/\s+/g, '_');
                if (localStorage.getItem(id) === 'done') cb.classList.add('checked');
                cb.addEventListener('click', () => {
                    cb.classList.toggle('checked');
                    localStorage.setItem(id, cb.classList.contains('checked') ? 'done' : '');
                });
            });

            // Findings filter bars
            document.querySelectorAll('section, .lang-block').forEach(container => {
                const findings = Array.from(container.querySelectorAll(':scope > .finding-card, :scope > div > .finding-card'));
                if (findings.length < 3 || container.querySelector('.filter-bar[data-type="finding"]')) return;
                const bar = document.createElement('div');
                bar.className = 'filter-bar'; bar.dataset.type = 'finding';
                bar.innerHTML = '<span class="filter-bar-label">Filter:</span>' +
                    ['All','Critical','High','Medium','Low'].map((s,i) =>
                        `<button class="filter-btn${i===0?' active':''}" data-sev="${s.toLowerCase()}" aria-pressed="${i===0?'true':'false'}">${s}</button>`
                    ).join('');
                findings[0].parentNode.insertBefore(bar, findings[0]);
                bar.addEventListener('click', e => {
                    const btn = e.target.closest('.filter-btn'); if (!btn) return;
                    bar.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-pressed', 'false');
                    });
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                    const sev = btn.dataset.sev;
                    findings.forEach(card => card.classList.toggle('filter-hidden', sev !== 'all' && !card.querySelector('.sev-' + sev)));
                });
            });

            // Action filter bars
            document.querySelectorAll('section, .lang-block').forEach(container => {
                const actions = Array.from(container.querySelectorAll(':scope > .action-card, :scope > div > .action-card'));
                if (actions.length < 3 || container.querySelector('.filter-bar[data-type="action"]')) return;
                const bar = document.createElement('div');
                bar.className = 'filter-bar'; bar.dataset.type = 'action';
                bar.innerHTML = '<span class="filter-bar-label">Filter:</span>' +
                    ['All','Pending','Done','Blocked'].map((s,i) =>
                        `<button class="filter-btn${i===0?' active':''}" data-status="${s.toLowerCase()}" aria-pressed="${i===0?'true':'false'}">${s}</button>`
                    ).join('');
                actions[0].parentNode.insertBefore(bar, actions[0]);
                bar.addEventListener('click', e => {
                    const btn = e.target.closest('.filter-btn'); if (!btn) return;
                    bar.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-pressed', 'false');
                    });
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                    const status = btn.dataset.status;
                    actions.forEach(card => {
                        const statusEl = card.querySelector('.action-status');
                        const match = status === 'all' || (statusEl && statusEl.textContent.trim().toLowerCase().includes(status));
                        card.classList.toggle('filter-hidden', !match);
                    });
                });
            });

            // Expandable tables (collapse beyond 6 rows)
            document.querySelectorAll('table').forEach(table => {
                if (table.dataset.expanded !== undefined) return;
                table.dataset.expanded = 'false';
                const rows = Array.from(table.querySelectorAll('tbody tr'));
                if (rows.length <= 6) return;
                rows.slice(5).forEach(r => r.classList.add('table-overflow-row'));
                const btn = document.createElement('button');
                btn.className = 'table-expand-btn';
                let expanded = false;
                btn.textContent = `Show all ${rows.length} rows ↓`;
                btn.addEventListener('click', () => {
                    expanded = !expanded;
                    rows.slice(5).forEach(r => r.classList.toggle('visible', expanded));
                    btn.textContent = expanded ? 'Collapse ↑' : `Show all ${rows.length} rows ↓`;
                });
                table.insertAdjacentElement('afterend', btn);
            });

            // Scroll spy
            const headings = document.querySelectorAll('h1[id]');
            if (headings.length) {
                const spy = new IntersectionObserver(entries => {
                    entries.forEach(e => {
                        if (e.isIntersecting) {
                            document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
                            const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
                            if (link) link.classList.add('active');
                        }
                    });
                }, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });
                headings.forEach(h => spy.observe(h));
            }
        }

        // DOM Search Feature
        function initSearch() {
            const searchInput = document.getElementById('portal-search');
            if (!searchInput) return;

            let originalContentMap = new Map();
            // We store the original HTML of each top level block to restore it when searching is cleared
            document.querySelectorAll('section, .lang-block, .proposal-card, .deliverable-card, .finding-card, blockquote').forEach((el, index) => {
                if (!el.id) el.id = 'search-block-' + index;
                originalContentMap.set(el.id, el.innerHTML);
            });

            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.trim();
                
                document.querySelectorAll('section, .lang-block, .proposal-card, .deliverable-card, .finding-card, blockquote').forEach(el => {
                    const orig = originalContentMap.get(el.id);
                    if (!orig) return;

                    if (!term) {
                        el.innerHTML = orig;
                        return;
                    }

                    // Strip HTML tags from original to check for a text match before doing expensive regex replacement
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = orig;
                    const text = tempDiv.textContent || tempDiv.innerText || "";
                    
                    if (text.toLowerCase().includes(term.toLowerCase())) {
                        // Very naive highlight that attempts not to break HTML tags
                        // A true robust search would use TreeWalker, but this is simple and fast for a caveman portal
                        const regex = new RegExp('(?![^<]+>)(?!<mark[^>]*?>)(' + term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')(?![^<]*?<\/mark>)', 'gi');
                        el.innerHTML = orig.replace(regex, '<mark class="search-highlight">$1</mark>');
                    } else {
                        el.innerHTML = orig;
                    }
                });
                
                // Re-bind interactive features since we wiped the DOM
                initInteractiveFeatures();
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            checkSignatureStatus();
            const html = document.documentElement;

            // Theme
            const savedTheme = localStorage.getItem('theme') || 'dark';
            html.setAttribute('data-theme', savedTheme);
            updateIcons(savedTheme);

            // Language
            const available = JSON.parse(html.getAttribute('data-languages') || '["en"]');
            if (available.length > 1) {
                document.getElementById('lang-toggle').style.display = 'flex';
                document.getElementById('lang-indicator').style.display = 'inline-block';
                document.getElementById('lang-toggle').addEventListener('click', toggleLang);
            }
            const saved = localStorage.getItem('language') || available[0];
            setLang(available.includes(saved) ? saved : available[0]);

            // Progress bar and Back to Top
            const bar = document.getElementById('progress-bar');
            const backBtn = document.getElementById('back-to-top');
            window.addEventListener('scroll', () => {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                bar.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
                
                if (backBtn) {
                    if (window.scrollY > 500) {
                        backBtn.classList.add('visible');
                    } else {
                        backBtn.classList.remove('visible');
                    }
                }
            }, { passive: true });

            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }

            // Swipe to switch language
            if (available.length > 1) {
                let tx = 0;
                document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
                document.addEventListener('touchend', e => {
                    if (Math.abs(e.changedTouches[0].clientX - tx) > 70) toggleLang();
                }, { passive: true });
            }

            initInteractiveFeatures();
            initSearch();
        });
