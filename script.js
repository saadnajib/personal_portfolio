'use strict';
/* ═══════════════════════════════════════════════════════════════
   Muhammad Saad Najib — self-inferring portfolio
   All effects are procedural and run locally. No tracking.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)');
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const state = { paused: reduceQuery.matches, scrollY: 0, progress: 0, mouse: { x: innerWidth / 2, y: innerHeight / 2 } };
  html.classList.remove('no-js');

  /* ── Motion control ─────────────────────────────────────────── */
  const motionBtn = $('#motion-toggle');
  const loops = new Set();
  function syncMotion(fromUser) {
    if (fromUser) html.classList.add('motion-user');
    html.classList.toggle('motion-paused', state.paused);
    motionBtn.setAttribute('aria-pressed', String(state.paused));
    motionBtn.setAttribute('aria-label', state.paused ? 'Play visual effects' : 'Pause visual effects');
    loops.forEach(fn => fn(state.paused));
  }
  motionBtn.addEventListener('click', () => { state.paused = !state.paused; syncMotion(true); });
  reduceQuery.addEventListener('change', () => { if (!html.classList.contains('motion-user')) { state.paused = reduceQuery.matches; syncMotion(false); } });

  /* ── Boot sequence ──────────────────────────────────────────── */
  const boot = $('#boot');
  function runBoot() {
    if (state.paused || sessionStorage.getItem('booted')) { html.classList.add('no-boot', 'ready'); startPortrait(); return; }
    document.body.classList.add('locked');
    const items = $$('#boot-log li'), bar = $('#boot-bar'), pct = $('#boot-pct');
    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(100, p + Math.random() * 14 + 4);
      bar.style.width = p + '%'; pct.textContent = Math.round(p) + '%';
      items.forEach((li, i) => { if (p >= (i + 1) * 18) li.classList.add('on'); });
      if (p >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          boot.classList.add('done'); document.body.classList.remove('locked');
          sessionStorage.setItem('booted', '1');
          setTimeout(() => { html.classList.add('ready'); startPortrait(); }, 300);
        }, 420);
      }
    }, 110);
  }

  /* ── Text splitting ─────────────────────────────────────────── */
  $$('[data-split]').forEach((word, l) => {
    const text = word.textContent; word.textContent = '';
    [...text].forEach((ch, i) => { const s = document.createElement('span'); s.className = 'char'; s.textContent = ch; s.style.setProperty('--i', i); s.style.setProperty('--l', l); word.appendChild(s); });
  });
  $$('.split-heading').forEach(h => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
            w.appendChild(inner); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(h);
  });

  /* ── Role typewriter ────────────────────────────────────────── */
  const roles = ['machine learning engineer', 'computer vision researcher', 'deep learning practitioner', 'm.sc. computer science @ rptu', 'ex-dfki research assistant'];
  const roleEl = $('#role-type');
  let ri = 0, rc = roles[0].length, dir = -1, roleTimer;
  function typeRole() {
    if (state.paused) { roleEl.textContent = roles[0]; return; }
    rc += dir;
    roleEl.textContent = roles[ri].slice(0, rc);
    let wait = dir < 0 ? 28 : 55;
    if (rc <= 0) { dir = 1; ri = (ri + 1) % roles.length; wait = 300; }
    if (rc >= roles[ri].length) { dir = -1; wait = 2200; }
    roleTimer = setTimeout(typeRole, wait);
  }
  setTimeout(typeRole, 2600);
  loops.add(p => { clearTimeout(roleTimer); if (!p) roleTimer = setTimeout(typeRole, 800); else roleEl.textContent = roles[0]; });

  /* ── Clock (Kaiserslautern) ─────────────────────────────────── */
  const clockEl = $('#clock-time');
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' });
  const setClock = () => { clockEl.textContent = fmt.format(new Date()); };
  setClock(); setInterval(setClock, 15000);
  $('#year').textContent = String(new Date().getFullYear());

  /* ── Portrait viewfinder ────────────────────────────────────── */
  const pCanvas = $('#portrait'), pImg = $('#portrait-src'), vfFrame = $('.vf-frame'), vfBox = $('#vf-box'), vfScan = $('#vf-scan');
  const hudMode = $('#hud-mode'), hudRead = $('#hud-readout'), vfModeBtn = $('#vf-mode');
  const pctx = pCanvas.getContext('2d', { willReadFrequently: false });
  const modes = ['edges', 'thermal', 'pixels', 'depth'];
  const modeLabels = { edges: 'SOBEL ∇', thermal: 'HEATMAP', pixels: 'PATCHES 16×', depth: 'DEPTH (est.)' };
  let modeIdx = 0, layers = null, W = 0, H = 0, colorT = 0, colorStart = 0, lens = { x: -1, y: -1, tx: -1, ty: -1, r: 0, tr: 0 }, portraitReady = false, portraitFrame = 0, grayData = null;
  if (!pctx) html.classList.add('no-canvas');

  function buildLayers() {
    if (!pctx || !pImg.naturalWidth) return;
    const rect = vfFrame.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = Math.round(rect.width * dpr); H = Math.round(rect.height * dpr);
    if (!W || !H) return;
    pCanvas.width = W; pCanvas.height = H;
    const make = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
    // cover-fit source
    const s = Math.max(W / pImg.naturalWidth, H / pImg.naturalHeight);
    const dw = pImg.naturalWidth * s, dh = pImg.naturalHeight * s, dx = (W - dw) / 2, dy = (H - dh) / 2 - dh * .02;
    const color = make(); color.getContext('2d').drawImage(pImg, dx, dy, dw, dh);
    let src;
    try { src = color.getContext('2d').getImageData(0, 0, W, H); } catch (e) { layers = { color }; return; }
    const n = W * H, gray = new Float32Array(n), d = src.data;
    for (let i = 0; i < n; i++) gray[i] = d[i * 4] * .299 + d[i * 4 + 1] * .587 + d[i * 4 + 2] * .114;
    grayData = gray;
    const grayC = make(), gctx = grayC.getContext('2d'), gImg = gctx.createImageData(W, H);
    for (let i = 0; i < n; i++) { const v = gray[i] * .92 + 8; gImg.data[i * 4] = v; gImg.data[i * 4 + 1] = v + 2; gImg.data[i * 4 + 2] = v + 6; gImg.data[i * 4 + 3] = 255; }
    gctx.putImageData(gImg, 0, 0);
    // Sobel edges
    const edgeC = make(), ectx = edgeC.getContext('2d'), eImg = ectx.createImageData(W, H);
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      const gx = -gray[i - W - 1] - 2 * gray[i - 1] - gray[i + W - 1] + gray[i - W + 1] + 2 * gray[i + 1] + gray[i + W + 1];
      const gy = -gray[i - W - 1] - 2 * gray[i - W] - gray[i - W + 1] + gray[i + W - 1] + 2 * gray[i + W] + gray[i + W + 1];
      const m = Math.min(255, Math.hypot(gx, gy) * 1.4);
      const o = i * 4; eImg.data[o] = m * .37; eImg.data[o + 1] = m * .95; eImg.data[o + 2] = m * .88; eImg.data[o + 3] = 255;
    }
    ectx.putImageData(eImg, 0, 0);
    // thermal palette
    const thC = make(), tctx = thC.getContext('2d'), tImg = tctx.createImageData(W, H);
    const stops = [[10, 8, 40], [124, 92, 255], [255, 92, 122], [255, 180, 84], [255, 250, 235]];
    for (let i = 0; i < n; i++) {
      const t = gray[i] / 255 * (stops.length - 1), k = Math.min(stops.length - 2, Math.floor(t)), f = t - k;
      const a = stops[k], b = stops[k + 1], o = i * 4;
      tImg.data[o] = lerp(a[0], b[0], f); tImg.data[o + 1] = lerp(a[1], b[1], f); tImg.data[o + 2] = lerp(a[2], b[2], f); tImg.data[o + 3] = 255;
    }
    tctx.putImageData(tImg, 0, 0);
    // pixel patches
    const pxC = make(), pxctx = pxC.getContext('2d');
    pxctx.imageSmoothingEnabled = false;
    const tiny = document.createElement('canvas'); tiny.width = 24; tiny.height = 32;
    tiny.getContext('2d').drawImage(color, 0, 0, 24, 32);
    pxctx.drawImage(tiny, 0, 0, W, H);
    // pseudo-depth: blurred inverse luminance + radial prior
    const dpC = make(), dctx = dpC.getContext('2d');
    dctx.filter = 'blur(6px) grayscale(1) contrast(1.4)';
    dctx.drawImage(color, 0, 0);
    dctx.filter = 'none';
    dctx.globalCompositeOperation = 'multiply';
    const rg = dctx.createRadialGradient(W * .5, H * .38, H * .08, W * .5, H * .5, H * .75);
    rg.addColorStop(0, '#ffffff'); rg.addColorStop(1, '#2a1a60');
    dctx.fillStyle = rg; dctx.fillRect(0, 0, W, H);
    dctx.globalCompositeOperation = 'screen';
    dctx.fillStyle = 'rgba(124,92,255,.35)'; dctx.fillRect(0, 0, W, H);
    layers = { color, gray: grayC, edges: edgeC, thermal: thC, pixels: pxC, depth: dpC };
  }

  function drawPortrait() {
    if (!layers) return;
    pctx.clearRect(0, 0, W, H);
    pctx.drawImage(layers.color, 0, 0);
    if (colorT < 1 && layers.gray) {
      const yLine = H * colorT;
      pctx.save(); pctx.beginPath(); pctx.rect(0, yLine, W, H - yLine); pctx.clip();
      pctx.drawImage(layers.gray, 0, 0); pctx.restore();
    }
    if (lens.r > .5 && layers[modes[modeIdx]]) {
      const dpr = W / vfFrame.clientWidth;
      const x = lens.x * dpr, y = lens.y * dpr, r = lens.r * dpr;
      pctx.save(); pctx.beginPath(); pctx.arc(x, y, r, 0, Math.PI * 2); pctx.clip();
      pctx.drawImage(layers[modes[modeIdx]], 0, 0);
      pctx.restore();
      pctx.beginPath(); pctx.arc(x, y, r, 0, Math.PI * 2);
      pctx.strokeStyle = 'rgba(94,242,224,.9)'; pctx.lineWidth = 1.5 * dpr; pctx.stroke();
      pctx.beginPath(); pctx.moveTo(x - r - 10 * dpr, y); pctx.lineTo(x - r + 8 * dpr, y); pctx.moveTo(x + r - 8 * dpr, y); pctx.lineTo(x + r + 10 * dpr, y);
      pctx.moveTo(x, y - r - 10 * dpr); pctx.lineTo(x, y - r + 8 * dpr); pctx.moveTo(x, y + r - 8 * dpr); pctx.lineTo(x, y + r + 10 * dpr);
      pctx.strokeStyle = 'rgba(94,242,224,.6)'; pctx.lineWidth = dpr; pctx.stroke();
    }
  }
  let readTick = 0;
  function readout() {
    if (!grayData || lens.r < .5) return;
    const dpr = W / vfFrame.clientWidth, cx = Math.round(lens.x * dpr), cy = Math.round(lens.y * dpr), r = Math.round(lens.r * dpr);
    let sum = 0, sq = 0, c = 0;
    for (let y = Math.max(0, cy - r); y < Math.min(H, cy + r); y += 4) for (let x = Math.max(0, cx - r); x < Math.min(W, cx + r); x += 4) {
      if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue;
      const v = grayData[y * W + x] / 255; sum += v; sq += v * v; c++;
    }
    if (!c) return;
    const mu = sum / c, sigma = Math.sqrt(Math.max(0, sq / c - mu * mu));
    hudRead.textContent = `σ ${sigma.toFixed(2)} · μ ${mu.toFixed(2)}`;
  }
  function portraitLoop(t) {
    portraitFrame = 0;
    if (!layers) return;
    if (colorStart && colorT < 1) colorT = clamp((t - colorStart) / 2600, 0, 1);
    if (colorT >= 1 && !vfBox.classList.contains('on')) { vfBox.classList.add('on'); hudMode.textContent = 'MODE · INFERENCE'; }
    lens.x = lerp(lens.x < 0 ? lens.tx : lens.x, lens.tx, .18); lens.y = lerp(lens.y < 0 ? lens.ty : lens.y, lens.ty, .18); lens.r = lerp(lens.r, lens.tr, .14);
    drawPortrait();
    if (++readTick % 6 === 0) readout();
    const active = colorT < 1 || lens.r > .5 || lens.tr > 0;
    if (active && !state.paused) portraitFrame = requestAnimationFrame(portraitLoop);
  }
  function kickPortrait() { if (!portraitFrame && layers) portraitFrame = requestAnimationFrame(portraitLoop); }
  function startPortrait() {
    if (portraitReady) return; portraitReady = true;
    const go = () => {
      buildLayers();
      if (!layers) { html.classList.add('no-canvas'); return; }
      if (state.paused) { colorT = 1; vfBox.classList.add('on'); hudMode.textContent = 'MODE · INFERENCE'; drawPortrait(); return; }
      vfScan.classList.add('run'); colorStart = performance.now(); kickPortrait();
    };
    if (pImg.complete && pImg.naturalWidth) go(); else { pImg.addEventListener('load', go, { once: true }); pImg.addEventListener('error', () => html.classList.add('no-canvas'), { once: true }); }
  }
  vfFrame.addEventListener('pointermove', e => {
    const r = vfFrame.getBoundingClientRect();
    lens.tx = e.clientX - r.left; lens.ty = e.clientY - r.top; lens.tr = Math.min(r.width, r.height) * .22;
    if (finePointer.matches) { vfFrame.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * 10}deg`); vfFrame.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - .5) * 8}deg`); }
    kickPortrait();
  });
  vfFrame.addEventListener('pointerdown', e => { const r = vfFrame.getBoundingClientRect(); lens.tx = e.clientX - r.left; lens.ty = e.clientY - r.top; lens.tr = Math.min(r.width, r.height) * .22; kickPortrait(); });
  vfFrame.addEventListener('pointerleave', () => { lens.tr = 0; vfFrame.style.setProperty('--rx', '0deg'); vfFrame.style.setProperty('--ry', '0deg'); kickPortrait(); });
  vfFrame.addEventListener('click', () => { if (!finePointer.matches) cycleMode(); });
  function cycleMode() { modeIdx = (modeIdx + 1) % modes.length; vfModeBtn.innerHTML = `lens: <b>${modes[modeIdx]}</b>`; hudMode.textContent = 'LENS · ' + modeLabels[modes[modeIdx]]; kickPortrait(); }
  vfModeBtn.addEventListener('click', cycleMode);
  new ResizeObserver(() => { if (portraitReady && pImg.naturalWidth) { buildLayers(); drawPortrait(); } }).observe(vfFrame);
  loops.add(p => { if (p) { colorT = 1; drawPortrait(); } else kickPortrait(); });

  /* ── Ambient particle field ─────────────────────────────────── */
  const field = $('#field'), fctx = field.getContext('2d');
  let fw = 0, fh = 0, particles = [], fieldFrame = 0, fieldTime = 0;
  const colors = [[94, 242, 224], [124, 92, 255], [255, 92, 122], [255, 180, 84]];
  function resizeField() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    fw = innerWidth; fh = innerHeight; field.width = fw * dpr; field.height = fh * dpr; fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(clamp(fw * fh / 14000, 40, 130));
    particles = Array.from({ length: count }, () => ({ x: Math.random() * fw, y: Math.random() * fh, vx: 0, vy: 0, s: Math.random() * 1.4 + .4, c: Math.floor(Math.random() * 4) }));
  }
  const noise = (x, y, t) => Math.sin(x * .0021 + t) * Math.cos(y * .0017 - t * .7) + Math.sin((x + y) * .0009 + t * .5);
  function fieldLoop(t) {
    fieldFrame = 0;
    if (state.paused || document.hidden) return;
    fieldTime = t * .00012;
    fctx.clearRect(0, 0, fw, fh);
    const mx = state.mouse.x, my = state.mouse.y, shift = state.progress * 3;
    for (const p of particles) {
      const a = noise(p.x, p.y, fieldTime) * Math.PI;
      p.vx = lerp(p.vx, Math.cos(a) * .45, .05); p.vy = lerp(p.vy, Math.sin(a) * .45, .05);
      const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
      if (d2 < 22000) { const f = (1 - d2 / 22000) * 1.6; p.vx += dx / Math.sqrt(d2 + 1) * f; p.vy += dy / Math.sqrt(d2 + 1) * f; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = fw + 20; if (p.x > fw + 20) p.x = -20; if (p.y < -20) p.y = fh + 20; if (p.y > fh + 20) p.y = -20;
    }
    fctx.lineWidth = .6;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
        if (d < 12000) { const al = (1 - d / 12000) * .22; const c = colors[(p.c + Math.floor(shift)) % 4]; fctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${al})`; fctx.beginPath(); fctx.moveTo(p.x, p.y); fctx.lineTo(q.x, q.y); fctx.stroke(); }
      }
      const c = colors[(p.c + Math.floor(shift)) % 4];
      fctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},.75)`; fctx.beginPath(); fctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); fctx.fill();
    }
    fieldFrame = requestAnimationFrame(fieldLoop);
  }
  function kickField() { if (!fieldFrame && !state.paused && !document.hidden) fieldFrame = requestAnimationFrame(fieldLoop); }
  resizeField(); addEventListener('resize', resizeField); kickField();
  document.addEventListener('visibilitychange', kickField);
  loops.add(p => { if (p) { cancelAnimationFrame(fieldFrame); fieldFrame = 0; fctx.clearRect(0, 0, fw, fh); } else kickField(); });

  /* ── Custom cursor ──────────────────────────────────────────── */
  const cursor = $('#cursor'), cLabel = $('#cursor-label'), cCoord = $('#cursor-coord');
  let cx = state.mouse.x, cy = state.mouse.y, cursorFrame = 0;
  function cursorLoop() {
    cursorFrame = 0;
    cx = lerp(cx, state.mouse.x, .35); cy = lerp(cy, state.mouse.y, .35);
    cursor.style.transform = `translate(${cx}px,${cy}px)`;
    if (Math.abs(cx - state.mouse.x) > .2 || Math.abs(cy - state.mouse.y) > .2) cursorFrame = requestAnimationFrame(cursorLoop);
  }
  function enableCursor() {
    const on = finePointer.matches && !state.paused;
    document.body.classList.toggle('has-cursor', on);
  }
  enableCursor(); finePointer.addEventListener('change', enableCursor); loops.add(enableCursor);
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    state.mouse.x = e.clientX; state.mouse.y = e.clientY;
    if (document.body.classList.contains('has-cursor')) {
      if (!cursorFrame) cursorFrame = requestAnimationFrame(cursorLoop);
      cCoord.textContent = `x ${String(Math.round(e.clientX)).padStart(4, '0')} · y ${String(Math.round(e.clientY + scrollY)).padStart(4, '0')}`;
      const hot = e.target.closest('a,button,[data-label],input,summary,.pt,.tl-item');
      cursor.classList.toggle('hot', !!hot);
      if (hot) { const lbl = hot.dataset.label || hot.getAttribute('aria-label') || hot.textContent.trim().slice(0, 22) || 'interact'; cLabel.textContent = `${lbl} · ${(0.9 + Math.random() * .099).toFixed(3)}`; }
    }
  }, { passive: true });
  addEventListener('pointerdown', () => cursor.classList.add('down')); addEventListener('pointerup', () => cursor.classList.remove('down'));

  /* ── Magnetic buttons + card tilt/sheen ─────────────────────── */
  $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      if (!finePointer.matches || state.paused) return;
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .28}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
  $$('.tilt').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${px * 100}%`); card.style.setProperty('--my', `${py * 100}%`);
      card.style.setProperty('--ang', `${Math.atan2(py - .5, px - .5) * 180 / Math.PI}deg`);
      if (!finePointer.matches || state.paused) return;
      card.style.setProperty('--ry', `${(px - .5) * 6}deg`); card.style.setProperty('--rx', `${-(py - .5) * 5}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });

  /* ── Scroll: progress, rail, nav, timeline fill ─────────────── */
  const progressBar = $('#scroll-progress'), timeline = $('#timeline');
  let scrollPending = false;
  function onScroll() {
    scrollPending = false;
    const max = html.scrollHeight - innerHeight;
    state.progress = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    progressBar.style.transform = `scaleX(${state.progress})`;
    if (timeline) { const r = timeline.getBoundingClientRect(); const f = clamp((innerHeight * .7 - r.top) / r.height, 0, 1); timeline.style.setProperty('--fill', `${f * 100}%`); }
  }
  addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  const navLinks = $$('#navigation a'), railLinks = $$('.rail a');
  const setActive = id => {
    navLinks.forEach(a => { const on = a.hash === '#' + id; a.classList.toggle('active', on); on ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'); });
    railLinks.forEach(a => a.classList.toggle('active', a.dataset.rail === id));
  };
  const sectionObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-35% 0px -55% 0px' });
  $$('main section[id]').forEach(s => sectionObs.observe(s));    /* ── Reveal + counters ──────────────────────────────────────── */   const revealObs = new IntersectionObserver(es => es.forEach(e => {     if (!e.isIntersecting) return;     e.target.classList.add('visible'); revealObs.unobserve(e.target);     $$
('[data-count]', e.target).forEach(runCounter);
  }), { threshold: .12 });
  $$('.reveal, .split-heading, .train, .hero-stats').forEach(el => revealObs.observe(el));   function runCounter(el) {     const end = Number(el.dataset.count), t0 = performance.now(), dur = state.paused ? 0 : 1400;     const step = t => { const k = dur ? clamp((t - t0) / dur, 0, 1) : 1; el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };     requestAnimationFrame(step);   }   // stagger reveal delays inside grids   $$
('.bento .card').forEach((c, i) => c.style.setProperty('--d', `${(i % 4) * .08}s`));

  /* ── Colorization slider ────────────────────────────────────── */
  const slider = $('#color-slider'), grayRect = $('#gray-rect'), compare = $('#compare-line');
  const updateCompare = () => { const v = Number(slider.value); grayRect.setAttribute('width', String(600 * v / 100)); compare.style.left = v + '%'; slider.setAttribute('aria-valuetext', `${v} percent grayscale`); };
  slider.addEventListener('input', updateCompare); updateCompare();
  let sliderAuto = 0;
  const autoSlide = t => { sliderAuto = 0; if (state.paused || slider.matches(':active')) return; slider.value = String(50 + Math.sin(t * .0009) * 38); updateCompare(); sliderAuto = requestAnimationFrame(autoSlide); };
  new IntersectionObserver(es => { if (es[0].isIntersecting && !sliderAuto && !state.paused) sliderAuto = requestAnimationFrame(autoSlide); else if (!es[0].isIntersecting) { cancelAnimationFrame(sliderAuto); sliderAuto = 0; } }).observe(slider);
  slider.addEventListener('pointerdown', () => { cancelAnimationFrame(sliderAuto); sliderAuto = 0; });

  /* ── Pixel grid art ─────────────────────────────────────────── */
  const pixels = $('#pixels');
  if (pixels) for (let i = 0; i < 96; i++) { const px = document.createElement('i'); px.style.setProperty('--d', (Math.random() * 3).toFixed(2)); px.style.setProperty('--o', (Math.random() * .8 + .2).toFixed(2)); if (Math.random() < .12) px.style.background = 'var(--coral)'; pixels.appendChild(px); }

  /* ── 3D skill sphere ────────────────────────────────────────── */
  const sphere = $('#sphere'), sphereWrap = $('#sphere-wrap');
  const skills = ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas', 'CNNs', 'GANs', 'FaceNet', 'ArcFace', 'OpenVINO', 'SMPL', '3D Vision', 'Datasets', 'scikit-learn', 'Docker', 'Linux', 'Git', 'C++', 'C#', 'JavaScript', 'React', 'SQL', 'Android', 'Research', 'Data analysis', 'Embeddings', 'Transformers'];
  const nodes = skills.map((name, i) => {
    const el = document.createElement('span'); el.textContent = name; if (i % 5 === 0) el.classList.add('hi'); sphere.appendChild(el);
    const y = 1 - (i / (skills.length - 1)) * 2, r = Math.sqrt(1 - y * y), a = Math.PI * (3 - Math.sqrt(5)) * i;
    return { el, x: Math.cos(a) * r, y, z: Math.sin(a) * r };
  });
  let rotX = -.3, rotY = 0, velX = 0, velY = .004, dragging = false, lastP = null, sphereFrame = 0, sphereVisible = false;
  function renderSphere() {
    const R = sphereWrap.clientWidth * .42;
    const cx_ = Math.cos(rotX), sx = Math.sin(rotX), cy_ = Math.cos(rotY), sy = Math.sin(rotY);
    for (const n of nodes) {
      const x1 = n.x * cy_ + n.z * sy, z1 = -n.x * sy + n.z * cy_;
      const y2 = n.y * cx_ - z1 * sx, z2 = n.y * sx + z1 * cx_;
      const s = .55 + (z2 + 1) * .35, op = .25 + (z2 + 1) * .4;
      n.el.style.transform = `translate(-50%,-50%) translate3d(${x1 * R}px,${y2 * R}px,${z2 * 60}px) scale(${s.toFixed(3)})`;
      n.el.style.opacity = op.toFixed(2); n.el.style.zIndex = String(Math.round((z2 + 1) * 50));
    }
  }
  function sphereLoop() {
    sphereFrame = 0;
    if (!dragging) { rotY += velY; rotX += velX; velX *= .96; velY = lerp(velY, .004, .02); }
    renderSphere();
    if (sphereVisible && !state.paused) sphereFrame = requestAnimationFrame(sphereLoop);
  }
  const kickSphere = () => { if (!sphereFrame && sphereVisible && !state.paused) sphereFrame = requestAnimationFrame(sphereLoop); };
  new IntersectionObserver(es => { sphereVisible = es[0].isIntersecting; kickSphere(); }).observe(sphereWrap);
  sphereWrap.addEventListener('pointerdown', e => { dragging = true; lastP = { x: e.clientX, y: e.clientY }; sphereWrap.setPointerCapture(e.pointerId); });
  sphereWrap.addEventListener('pointermove', e => { if (!dragging) return; const dx = e.clientX - lastP.x, dy = e.clientY - lastP.y; rotY += dx * .008; rotX += dy * .008; velY = dx * .002; velX = dy * .002; lastP = { x: e.clientX, y: e.clientY }; renderSphere(); });
  const endDrag = () => { dragging = false; };
  sphereWrap.addEventListener('pointerup', endDrag); sphereWrap.addEventListener('pointercancel', endDrag);
  renderSphere(); loops.add(p => { if (!p) kickSphere(); });

  /* ── Training log chart ─────────────────────────────────────── */
  const epochs = [
    { t: 2016.1, loss: 2.30, val: 2.42, date: 'FEB 2016', title: 'B.Sc. begins · IT Intern — PTV', body: 'Started Computer Science at Usman Institute of Technology while interning in the IT department of Pakistan Television Corporation.', tags: ['Foundations', 'IT'] },
    { t: 2018.7, loss: 1.72, val: 1.95, date: 'SEP 2018', title: 'Web Developer Intern — Pakistan Civil Aviation Authority', body: 'ASP.NET development inside the IT department — first production codebase and first real users.', tags: ['ASP.NET', 'Web'] },
    { t: 2020.1, loss: 1.28, val: 1.52, date: 'FEB 2020', title: 'AI Intern — Digital Landscape', body: 'Built a complete facial-recognition system at a software house — the project that turned an interest in vision into a direction.', tags: ['Face recognition', 'Python'] },
    { t: 2020.55, loss: 1.05, val: 1.30, date: 'JUL 2020', title: 'B.Sc. graduation · 4th in department', body: 'Graduated 4th in the Computer Science department. Final-year project: automatic image colorization with CNNs. Also became a GitHub Arctic Code Vault contributor.', tags: ['Top 4', 'Colorization', 'Arctic Vault'] },
    { t: 2020.9, loss: .84, val: 1.05, date: 'NOV 2020', title: 'Machine Learning Engineer — Aletheia AI', body: 'Joined as a deployment intern (after a front-end internship at Interns Pakistan) and was promoted within months to a full-time product-development role on the facial-recognition pipeline.', tags: ['Production ML', 'FaceNet · ArcFace', 'OpenVINO'] },
    { t: 2021.1, loss: .78, val: .92, date: 'DEC 2020 — FEB 2021', title: 'Career Prep Fellow — Amal Academy', body: 'Selected from 4,500+ applicants for a Stanford-funded, 150-hour fellowship in communication, leadership and problem-solving.', tags: ['Leadership', 'Communication'] },
    { t: 2021.6, loss: .66, val: .78, date: '2021', title: 'Paper published — KIET Journal', body: '“An efficient Convolutional Neural Network based Image Colorization Technique” published in the KIET Journal of Computing & Information Sciences (HEC-recognised).', tags: ['Publication', 'CNN'] },
    { t: 2022.3, loss: .56, val: .66, date: 'APR 2022', title: 'M.Sc. Computer Science — RPTU Kaiserslautern', body: 'Moved to Germany to study at RPTU Rheinland-Pfälzische Technische Universität, focusing on machine learning and computer vision.', tags: ['Germany', 'Graduate study'] },
    { t: 2022.8, loss: .42, val: .50, date: 'OCT 2022 — SEP 2023', title: 'Research Assistant — DFKI', body: 'German Research Center for AI. Machine-learning pipelines, semantic datatype checking and dataset generation; built predictive models on large datasets.', tags: ['ML pipelines', 'Research', 'Large datasets'] },
    { t: 2025.6, loss: .27, val: .33, date: '2025 — 2026', title: 'M.Sc. thesis — 3D human mesh recovery', body: 'Estimating 3D human pose and body shape from images: adapting large datasets to a new parametric body model and training multi-person recovery networks in PyTorch.', tags: ['3D vision', 'PyTorch', 'Datasets'] },
  ];
  const X = t => (t - 2016) / 10 * 1000, Y = v => 340 - (v / 2.6) * 300;
  const smooth = (pts) => pts.map((p, i, a) => { if (!i) return `M${p[0]} ${p[1]}`; const q = a[i - 1], c = (p[0] - q[0]) * .5; return `C${q[0] + c} ${q[1]} ${p[0] - c} ${p[1]} ${p[0]} ${p[1]}`; }).join(' ');
  const linePts = [[0, Y(2.5)], ...epochs.map(e => [X(e.t), Y(e.loss)]), [1000, Y(.22)]];
  const valPts = [[0, Y(2.6)], ...epochs.map(e => [X(e.t), Y(e.val)]), [1000, Y(.31)]];
  $('#train-line').setAttribute('d', smooth(linePts));
  $('#train-val').setAttribute('d', smooth(valPts));
  $('#train-area').setAttribute('d', smooth(linePts) + ` L1000 360 L0 360 Z`);
  const pointsWrap = $('#train-points'), log = $('#train-log');
  const logEls = { epoch: $('#log-epoch'), date: $('#log-date'), title: $('#log-title'), body: $('#log-body'), tags: $('#log-tags') };
  let activeEpoch = -1;
  function showEpoch(i) {
    if (i === activeEpoch) return; activeEpoch = i;
    const e = epochs[i];
    log.classList.remove('swap'); void log.offsetWidth; log.classList.add('swap');
    logEls.epoch.textContent = `epoch ${i + 1}/${epochs.length} · loss ${e.loss.toFixed(2)}`; logEls.date.textContent = e.date; logEls.title.textContent = e.title; logEls.body.textContent = e.body;
    logEls.tags.innerHTML = e.tags.map(t => `<span>${t}</span>`).join('');
    $$('.pt', pointsWrap).forEach((p, k) => p.classList.toggle('active', k === i));$$
('.tl-item').forEach(li => li.classList.toggle('active', Number(li.dataset.epoch) === i + 1));
  }
  epochs.forEach((e, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'pt'; b.style.left = `${X(e.t) / 10}%`; b.style.top = `${Y(e.loss) / 360 * 100}%`; b.style.setProperty('--i', i);
    b.setAttribute('aria-label', `Epoch ${i + 1}: ${e.title}`); b.dataset.label = `epoch ${i + 1}`;
    const s = document.createElement('span'); s.textContent = `e${i + 1}`; if (i % 2) s.style.top = '18px'; b.appendChild(s);
    b.addEventListener('pointerenter', () => showEpoch(i)); b.addEventListener('focus', () => showEpoch(i)); b.addEventListener('click', () => showEpoch(i));
    pointsWrap.appendChild(b);
  });
  $$('.tl-item').forEach(li => { const go = () => showEpoch(Number(li.dataset.epoch) - 1); li.addEventListener('pointerenter', go); li.addEventListener('click', go); });
  showEpoch(epochs.length - 1);
  // auto-walk the epochs once when the chart comes into view
  let walked = false;
  new IntersectionObserver(es => {
    if (!es[0].isIntersecting || walked || state.paused) return; walked = true;
    let k = 0; const step = () => { if (k < epochs.length && !pointsWrap.matches(':hover')) showEpoch(k); if (++k < epochs.length) setTimeout(step, 700); }; setTimeout(step, 900);
  }, { threshold: .4 }).observe($('#train-chart'));

  /* ── Résumé viewer ──────────────────────────────────────────── */
  const dlg = $('#resume-dialog'), frame = $('#resume-frame');
  $('#resume-view').addEventListener('click', () => {
    if (!frame.src) frame.src = './Muhammad_Saad_Najib_CV.pdf#view=FitH';
    if (typeof dlg.showModal === 'function') dlg.showModal(); else open('./Muhammad_Saad_Najib_CV.pdf', '_blank');
  });
  $('#resume-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  /* ── Command palette ────────────────────────────────────────── */
  const palette = $('#palette'), search = $('#palette-search'), items = $$('#palette-list li');
  let sel = 0;
  const openPalette = () => { if (palette.open) return; search.value = ''; filterPalette(); palette.showModal(); search.focus(); };
  const closePalette = () => palette.close();
  function filterPalette() {
    const norm = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const q = norm(search.value.trim());
    let first = -1;
    items.forEach((li, i) => { const hit = !q || norm(li.textContent + ' ' + (li.dataset.keywords || '')).includes(q); li.hidden = !hit; if (hit && first < 0) first = i; });
    sel = first; items.forEach((li, i) => li.classList.toggle('sel', i === sel));
  }
  function runItem(li) {
    const act = li.dataset.action; closePalette();
    if (act === 'toggle-motion') { motionBtn.click(); return; }
    if ('new' in li.dataset) { open(act, '_blank', 'noopener'); return; }
    if (act.startsWith('#')) { $(act)?.scrollIntoView({ behavior: state.paused ? 'auto' : 'smooth' }); return; }
    location.href = act;
  }
  $('#cmd-open').addEventListener('click', openPalette);
  search.addEventListener('input', filterPalette);
  items.forEach(li => li.addEventListener('click', () => runItem(li)));
  palette.addEventListener('click', e => { if (e.target === palette) closePalette(); });
  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.open ? closePalette() : openPalette(); return; }
    if (!palette.open) return;
    const vis = items.filter(li => !li.hidden);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); const idx = vis.indexOf(items[sel]); const next = vis[(idx + (e.key === 'ArrowDown' ? 1 : vis.length - 1)) % vis.length]; sel = items.indexOf(next); items.forEach((li, i) => li.classList.toggle('sel', i === sel)); next.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && sel >= 0) { e.preventDefault(); runItem(items[sel]); }
  });

  /* ── Terminal ───────────────────────────────────────────────── */
  const term = $('#terminal-out');
  const termLines = [
    ['<span class="k">$</span> whoami', 'Muhammad Saad Najib'],
    ['<span class="k">$</span> cat role.txt', 'ML / Computer Vision Engineer · M.Sc. CS @ RPTU'],
    ['<span class="k">$</span> contact --email', '<b>saadnajib97@hotmail.com</b>'],
    ['<span class="k">$</span> contact --phone', '<b>+49 152 3764 1530</b>'],
    ['<span class="k">$</span> contact --social', 'github.com/saadnajib · in/muhammad-saad-najib · ig: @saad__najib · fb: Muhammad Saad Najib'],
    ['<span class="k">$</span> status', '<b>open</b> to ML/CV roles · Kaiserslautern, DE'],
  ];
  let termStarted = false;
  function typeTerminal() {
    if (termStarted) return; termStarted = true;
    if (state.paused) { term.innerHTML = termLines.map(([c, o]) => `${c}\n${o}`).join('\n'); return; }
    let li = 0, ci = 0, html_ = '';
    const step = () => {
      if (li >= termLines.length) return;
      const [cmd, out] = termLines[li]; const plain = cmd.replace(/<[^>]+>/g, '');
      if (ci <= plain.length) { term.innerHTML = html_ + '<span class="k">$</span>' + plain.slice(1, ci); ci++; setTimeout(step, 35); }
      else { html_ += `${cmd}\n${out}\n`; term.innerHTML = html_; li++; ci = 0; setTimeout(step, 260); }
    };
    step();
  }
  new IntersectionObserver(es => { if (es[0].isIntersecting) typeTerminal(); }, { threshold: .3 }).observe(term);

  /* ── Copy buttons ───────────────────────────────────────────── */
  $$('.copy').forEach(b => b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'copied'; b.classList.add('ok'); setTimeout(() => { b.textContent = 'copy'; b.classList.remove('ok'); }, 1600); }
    catch { b.textContent = 'select'; }
  }));

  /* ── Mobile menu ────────────────────────────────────────────── */
  const menuBtn = $('#menu-toggle'), nav = $('#navigation');
  const closeMenu = () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('open'); };
  menuBtn.addEventListener('click', () => { const o = menuBtn.getAttribute('aria-expanded') !== 'true'; menuBtn.setAttribute('aria-expanded', String(o)); menuBtn.setAttribute('aria-label', o ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', o); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuBtn.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  matchMedia('(min-width:901px)').addEventListener('change', closeMenu);

  /* ── Go ─────────────────────────────────────────────────────── */
  syncMotion(false);
  runBoot();
})();