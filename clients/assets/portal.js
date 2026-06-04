        let supabaseClient = null;
        try {
            const SUPABASE_URL = 'https://xsivyrmpcgomyiyrsidg.supabase.co';
            const SUPABASE_KEY = 'sb_publishable_c9qIfHryD8QI-adbltinYQ_DGNFblET';
            if (window.supabase) {
                supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                
                // Magic Link Auto-Sign Listener
                supabaseClient.auth.onAuthStateChange(async (event, session) => {
                    if (event === 'SIGNED_IN' && session) {
                        const reportId = document.title.split(' | ')[0];
                        const pendingSigJson = localStorage.getItem('pending_sig_' + reportId);
                        if (pendingSigJson) {
                            localStorage.removeItem('pending_sig_' + reportId);
                            try {
                                const pending = JSON.parse(pendingSigJson);
                                const hash = await generateDocumentHash();
                                const ip = await getIpAddress();
                                
                                const { data, error } = await supabaseClient
                                    .from('signatures')
                                    .insert([{
                                        report_id: reportId,
                                        client_name: pending.name,
                                        role: pending.role,
                                        email: pending.email,
                                        ip_address: ip,
                                        user_agent: navigator.userAgent,
                                        document_hash: hash
                                    }])
                                    .select();

                                if (error) throw error;
                                if (data && data.length > 0) lockSignatureCard(data[0]);
                                
                                // Clean up session to prevent lingering auth state
                                supabaseClient.auth.signOut();
                            } catch (err) {
                                console.error("Auto-signature failed:", err);
                            }
                        }
                    }
                });
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

        // Lightweight: restore only localStorage signatures (safe to call on every lang switch).
        // Uses innerText — only works on visible elements, so called after setLang reveals the block.
        function restoreSignatures() {
            const reportId = document.title.split(' | ')[0];
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
        }

        async function checkSignatureStatus() {
            const reportId = document.title.split(' | ')[0];

            // Restore localStorage sigs (innerText works — elements are visible at this point)
            restoreSignatures();

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
            // Match by card index across all lang-blocks so Supabase sigs propagate to every language variant.
            // Each lang-block has cards in the same order — find the role match in any visible block,
            // then apply the same index to ALL blocks.
            const allBlocks = document.querySelectorAll('.lang-block');
            let matchIndex = -1;

            // Find the index of the matching card (search all blocks, use innerText on visible ones)
            allBlocks.forEach(block => {
                const cards = block.querySelectorAll('.signature-card');
                cards.forEach((card, idx) => {
                    if (matchIndex !== -1) return;
                    const roleEl = card.querySelector('.signature-role');
                    const cardRole = roleEl ? (roleEl.offsetParent !== null ? roleEl.innerText : roleEl.textContent).trim() : 'unknown';
                    if (sigData.role === cardRole || sigData.role === 'unknown' || !sigData.role) {
                        matchIndex = idx;
                    }
                });
            });

            if (matchIndex === -1) return;

            // Apply the signature to the same-index card in EVERY lang-block
            allBlocks.forEach(block => {
                const cards = block.querySelectorAll('.signature-card');
                const card = cards[matchIndex];
                if (!card) return;
                const line = card.querySelector('.signature-line');
                if (!line || line.dataset.signed === 'true') return;

                const dateStr = new Date(sigData.created_at).toLocaleString();
                const emailStr = sigData.email && sigData.email !== 'unknown@client.com' ? `<br>Email: ${sigData.email}` : '';

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
            // Re-apply localStorage sigs to newly visible lang-block cards (innerText now works)
            restoreSignatures();
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

        async function downloadPdf() {
            const btn = document.querySelector('button[aria-label="Export to PDF"]');
            if (!btn) return;
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Preparing...';
            btn.disabled = true;

            try {
                const isProtected = !!document.getElementById('encrypted-payload');
                if (isProtected) {
                    // Use the persisted key stored at auth time — the input may be hidden/cleared
                    const key = window._portalDecryptKey || document.getElementById('auth-key').value;
                    if (!key) {
                        alert("Authentication required to download PDF.");
                        return;
                    }

                    const res = await fetch('report.pdf.enc');
                    if (!res.ok) throw new Error("PDF not found on server.");
                    // Trim to strip any trailing newlines the server might add
                    const encryptedBase64 = (await res.text()).trim();

                    const bytes = CryptoJS.AES.decrypt(encryptedBase64, key);
                    const pdfBase64 = bytes.toString(CryptoJS.enc.Utf8);
                    if (!pdfBase64) throw new Error("Decryption failed — check your key");

                    // Use Uint8Array.from for robust base64→binary conversion
                    const byteArray = Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0));
                    const blob = new Blob([byteArray], { type: 'application/pdf' });

                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = document.title.split(' | ')[0] + '.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                } else {
                    const a = document.createElement('a');
                    a.href = 'report.pdf';
                    a.download = document.title.split(' | ')[0] + '.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            } catch (e) {
                console.error("PDF Download Error:", e);
                alert("Failed to download PDF. " + e.message);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }

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
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Enter details to receive a secure signing link:</div>
                    <input type="text" id="sig-name" placeholder="Full Legal Name" style="padding: 10px; border-radius: 4px; border: 1px solid var(--border-subtle); background: var(--bg-core); color: var(--text-primary); font-family: var(--font-mono); width: 100%; box-sizing: border-box;">
                    <input type="email" id="sig-email" placeholder="Email Address" style="padding: 10px; border-radius: 4px; border: 1px solid var(--border-subtle); background: var(--bg-core); color: var(--text-primary); font-family: var(--font-mono); width: 100%; box-sizing: border-box;">
                    <button onclick="requestMagicLink(this.closest('.signature-card'))" style="padding: 10px; border-radius: 4px; border: none; background: var(--accent); color: white; cursor: pointer; font-weight: bold; width: 100%;">Send Secure Link</button>
                </div>
            `;
            line.style.height = 'auto';
            line.style.borderBottom = 'none';
            line.style.opacity = '1';
        }

        async function requestMagicLink(card) {
            const name = card.querySelector('#sig-name').value.trim();
            const email = card.querySelector('#sig-email').value.trim();
            if (!name || !email) return alert("Please enter both name and email.");
            
            const btn = card.querySelector('button');
            btn.innerText = 'Sending...';
            btn.disabled = true;

            const reportId = document.title.split(' | ')[0];
            localStorage.setItem('pending_sig_' + reportId, JSON.stringify({
                name, email, role: window.currentlySigningRole || 'unknown'
            }));
            
            const key = window._portalDecryptKey || (document.getElementById('auth-key') ? document.getElementById('auth-key').value : null);
            if (key) localStorage.setItem('temp_decrypt_key_' + reportId, key);

            const { data, error } = await supabaseClient.auth.signInWithOtp({ 
                email,
                options: {
                    emailRedirectTo: window.location.href
                }
            });
            
            if (error) {
                alert("Error sending link: " + error.message);
                btn.innerText = 'Send Secure Link';
                btn.disabled = false;
                return;
            }

            const line = card.querySelector('.signature-line');
            line.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; text-align: left; padding: 10px 0;">
                    <div style="font-size: 0.85rem; color: var(--accent); font-weight: bold;">
                        ✉ Secure link sent to ${email}
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">
                        Check your inbox. Clicking the link will instantly apply your signature.
                    </div>
                </div>
            `;
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
                refreshSearchIndex();
                checkSignatureStatus();
                initTelemetry();
                // Persist key so downloadPdf() can use it after lock-screen is hidden
                window._portalDecryptKey = key;
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
            
            initCommenting();
        }

        async function getStableBlockId(el) {
            const text = el.innerText.trim().substring(0, 100);
            const msgBuffer = new TextEncoder().encode(text);
            const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return 'block_' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 10);
        }

        function restoreHighlight(textToHighlight, hash) {
            if (!textToHighlight || document.getElementById(hash + '_thread')) return null;
            const walker = document.createTreeWalker(document.getElementById('decrypted-content'), NodeFilter.SHOW_TEXT, null, false);
            let node;
            while (node = walker.nextNode()) {
                const idx = node.nodeValue.indexOf(textToHighlight);
                if (idx >= 0) {
                    const span = document.createElement('mark');
                    span.className = 'client-highlight';
                    span.dataset.id = hash;
                    const textNode = node.splitText(idx);
                    textNode.splitText(textToHighlight.length);
                    span.appendChild(textNode.cloneNode(true));
                    textNode.parentNode.replaceChild(span, textNode);
                    
                    // Build thread if it doesn't exist
                    if (!document.getElementById(hash + '_thread')) {
                        const thread = document.createElement('div');
                        thread.id = hash + '_thread';
                        thread.className = 'comment-thread-container';
                        thread.innerHTML = `
                            <div class="comment-form">
                                <textarea placeholder="Type your comment for this text..."></textarea>
                                <button onclick="submitComment('${hash}', this.previousElementSibling.value, this, \`${textToHighlight.replace(/`/g, '\\`')}\`)">Post Comment</button>
                            </div>
                        `;
                        const parentCard = span.closest('.finding-card, .action-card, .proposal-card, .deliverable-card, .lang-block');
                        if (parentCard) {
                            if (getComputedStyle(parentCard).position === 'static') parentCard.style.position = 'relative';
                            parentCard.appendChild(thread);
                            thread.style.top = span.offsetTop + 'px';
                            thread.dataset.intendedTop = span.offsetTop;
                        }
                    }
                    return span;
                }
            }
            return null;
        }
        function resolveCommentCollisions() {
            if (window.innerWidth <= 1300) {
                document.querySelectorAll('.comment-thread-container').forEach(t => {
                    t.style.top = '';
                    t.dataset.intendedTop = '';
                });
                return;
            }

            const threads = Array.from(document.querySelectorAll('.comment-thread-container.open'))
                .sort((a, b) => {
                    const aRect = a.parentElement.getBoundingClientRect();
                    const bRect = b.parentElement.getBoundingClientRect();
                    const aTop = aRect.top + (parseFloat(a.dataset.intendedTop) || 0);
                    const bTop = bRect.top + (parseFloat(b.dataset.intendedTop) || 0);
                    return aTop - bTop;
                });

            let lastBottom = 0;
            threads.forEach(thread => {
                if (thread.dataset.intendedTop === undefined || thread.dataset.intendedTop === '') {
                    thread.dataset.intendedTop = thread.offsetTop;
                }
                
                thread.style.top = thread.dataset.intendedTop + 'px';
                const rect = thread.getBoundingClientRect();
                const currentTopAbsolute = rect.top + window.scrollY;
                
                if (currentTopAbsolute < lastBottom + 16) {
                    const shift = (lastBottom + 16) - currentTopAbsolute;
                    thread.style.top = (parseFloat(thread.dataset.intendedTop) + shift) + 'px';
                }
                
                const newRect = thread.getBoundingClientRect();
                lastBottom = newRect.bottom + window.scrollY;
            });
        }

        async function fetchComments() {
            if (!supabaseClient) return;
            const reportId = document.title.split(' | ')[0];
            const { data, error } = await supabaseClient
                .from('comments')
                .select('*')
                .eq('report_id', reportId)
                .order('created_at', { ascending: true });
            if (error) { console.error('Error fetching comments:', error); return; }
            
            data.forEach(comment => {
                if (comment.highlight_text) restoreHighlight(comment.highlight_text, comment.block_id);
                
                const thread = document.getElementById(comment.block_id + '_thread');
                if (thread) {
                    thread.classList.add('open');
                    const date = new Date(comment.created_at).toLocaleString();
                    const item = document.createElement('div');
                    item.className = 'comment-item';
                    item.innerHTML = `
                        <div class="comment-meta">
                            <span class="comment-author">${comment.client_name}</span>
                            <span>${date}</span>
                        </div>
                        <div class="comment-text">${comment.comment_text}</div>
                    `;
                    thread.insertBefore(item, thread.querySelector('.comment-form'));
                }
            });
            setTimeout(resolveCommentCollisions, 100);
        }

        async function submitComment(blockId, text, btn, highlightText = null) {
            if (!supabaseClient || !text.trim()) return;
            btn.disabled = true;
            btn.textContent = 'Posting...';
            const reportId = document.title.split(' | ')[0];
            const name = localStorage.getItem('client_name') || 'Client';
            
            const payload = { report_id: reportId, block_id: blockId, client_name: name, comment_text: text };
            if (highlightText) payload.highlight_text = highlightText;

            const { data, error } = await supabaseClient
                .from('comments')
                .insert([payload])
                .select();
                
            if (error) {
                alert("Failed to post comment.");
            } else if (data && data.length > 0) {
                const comment = data[0];
                const thread = document.getElementById(blockId + '_thread');
                if (thread) {
                    const date = new Date(comment.created_at).toLocaleString();
                    const item = document.createElement('div');
                    item.className = 'comment-item';
                    item.innerHTML = `
                        <div class="comment-meta">
                            <span class="comment-author">${comment.client_name}</span>
                            <span>${date}</span>
                        </div>
                        <div class="comment-text">${comment.comment_text}</div>
                    `;
                    thread.insertBefore(item, thread.querySelector('.comment-form'));
                    thread.querySelector('textarea').value = '';
                    setTimeout(resolveCommentCollisions, 50);
                }
            }
            btn.disabled = false;
            btn.textContent = 'Post Comment';
        }

        async function initCommenting() {
            const blocks = document.querySelectorAll('.finding-card, .action-card, .proposal-card, .deliverable-card');
            for (const el of blocks) {
                if (el.querySelector('.comment-toggle-btn')) continue;
                
                const blockId = await getStableBlockId(el);
                
                const btn = document.createElement('button');
                btn.className = 'comment-toggle-btn';
                btn.title = 'Add Comment';
                btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> <span>Discuss</span>`;
                
                const thread = document.createElement('div');
                thread.id = blockId + '_thread';
                thread.className = 'comment-thread-container';
                thread.innerHTML = `
                    <div class="comment-form">
                        <textarea placeholder="Type your comment..."></textarea>
                        <button onclick="submitComment('${blockId}', this.previousElementSibling.value, this)">Post Comment</button>
                    </div>
                `;
                
                btn.addEventListener('click', () => {
                    thread.classList.toggle('open');
                    if (thread.classList.contains('open')) thread.querySelector('textarea').focus();
                    resolveCommentCollisions();
                });
                
                el.appendChild(btn);
                el.appendChild(thread);
            }
            
            // Highlight Selection Logic
            document.addEventListener('mouseup', async (e) => {
                const selection = window.getSelection();
                const text = selection.toString().trim();
                
                const existingBtn = document.getElementById('floating-comment-btn');
                if (existingBtn && !existingBtn.contains(e.target)) {
                    existingBtn.remove();
                }
                
                if (text.length > 0 && e.target.closest('#decrypted-content') && !e.target.closest('.comment-thread-container')) {
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    
                    const btn = document.createElement('div');
                    btn.id = 'floating-comment-btn';
                    btn.className = 'floating-selection-btn';
                    btn.innerHTML = '💬';
                    btn.style.left = (rect.left + rect.width / 2 + window.scrollX) + 'px';
                    btn.style.top = (rect.top + window.scrollY - 5) + 'px';
                    
                    btn.onmousedown = async (ev) => {
                        ev.preventDefault();
                        btn.remove();
                        
                        const msgBuffer = new TextEncoder().encode(text);
                        const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
                        const hashArray = Array.from(new Uint8Array(hashBuffer));
                        const hash = 'highlight_' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 10);
                        
                        const mark = document.createElement('mark');
                        mark.className = 'client-highlight';
                        mark.dataset.id = hash;
                        range.surroundContents(mark);
                        
                        let thread = document.getElementById(hash + '_thread');
                        if (!thread) {
                            thread = document.createElement('div');
                            thread.id = hash + '_thread';
                            thread.className = 'comment-thread-container open';
                            thread.innerHTML = `
                                <div class="comment-form">
                                    <textarea placeholder="Type your comment for this text..."></textarea>
                                    <button onclick="submitComment('${hash}', this.previousElementSibling.value, this, \`${text.replace(/`/g, '\\`')}\`)">Post Comment</button>
                                </div>
                            `;
                            const parentCard = mark.closest('.finding-card, .action-card, .proposal-card, .deliverable-card, .lang-block');
                            if (parentCard) {
                                if (getComputedStyle(parentCard).position === 'static') parentCard.style.position = 'relative';
                                parentCard.appendChild(thread);
                                thread.style.top = mark.offsetTop + 'px';
                                thread.dataset.intendedTop = mark.offsetTop;
                            }
                        } else {
                            thread.classList.add('open');
                        }
                        
                        thread.querySelector('textarea').focus();
                        selection.removeAllRanges();
                        resolveCommentCollisions();
                    };
                    
                    document.body.appendChild(btn);
                }
            });

            window.addEventListener('resize', resolveCommentCollisions);
            fetchComments();
        }

        let searchOriginalContentMap = new Map();
        function refreshSearchIndex() {
            searchOriginalContentMap.clear();
            document.querySelectorAll('section, .lang-block, .proposal-card, .deliverable-card, .finding-card, blockquote').forEach((el, index) => {
                if (!el.id) el.id = 'search-block-' + index;
                searchOriginalContentMap.set(el.id, el.innerHTML);
            });
        }

        // DOM Search Feature
        function initSearch() {
            const searchInput = document.getElementById('portal-search');
            if (!searchInput) return;

            refreshSearchIndex();

            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.trim();
                
                document.querySelectorAll('section, .lang-block, .proposal-card, .deliverable-card, .finding-card, blockquote').forEach(el => {
                    const orig = searchOriginalContentMap.get(el.id);
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

        async function initTelemetry() {
            if (localStorage.getItem('tal_admin_mode') === 'true') {
                console.log('Admin mode: Telemetry disabled.');
                return;
            }
            if (!supabaseClient) return;
            const parts = window.location.pathname.split('/').filter(Boolean);
            let reportId = parts[parts.length - 1] || 'unknown';
            if (reportId === 'index.html' && parts.length > 1) reportId = parts[parts.length - 2];
            const name = localStorage.getItem('client_name') || 'Client';
            const sessionId = crypto.randomUUID();
            let maxScroll = 0;
            
            window.addEventListener('scroll', () => {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                if (max <= 0) return;
                const scrollPercent = Math.round((window.scrollY / max) * 100);
                if (scrollPercent > maxScroll) maxScroll = scrollPercent;
            }, { passive: true });
            
            const { error } = await supabaseClient.from('telemetry_sessions').insert([{
                session_id: sessionId,
                report_id: reportId,
                client_name: name,
                max_scroll_depth: 0
            }]);
            
            if (error) {
                console.error('Telemetry init failed:', error);
                return;
            }
            
            setInterval(async () => {
                await supabaseClient.from('telemetry_sessions')
                    .update({ last_ping: new Date().toISOString(), max_scroll_depth: maxScroll })
                    .eq('session_id', sessionId);
            }, 30000);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const reportId = document.title.split(' | ')[0];
            const tempKey = localStorage.getItem('temp_decrypt_key_' + reportId);
            if (tempKey && document.getElementById('auth-key')) {
                document.getElementById('auth-key').value = tempKey;
                attemptDecrypt();
                // Clean up so it doesn't linger forever
                localStorage.removeItem('temp_decrypt_key_' + reportId);
            }

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
            
            const requiresAuth = !!document.getElementById('lock-screen');
            if (!requiresAuth) {
                initTelemetry();
            }
        });
