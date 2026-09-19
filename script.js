'use strict';
(() => {
  const $ = (s) => document.querySelector(s);
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motionQuery.matches;
  let userMotionChoice = false;
  let heroVisible = true;
  let frameId = 0;
  let rotation = 0;
  let lastTime = 0;
  const motionButton = $('#motion-toggle');
  const canvas = $('#neural-canvas');
  const ctx = canvas.getContext('2d');
  let width = 0, height = 0;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  // Fibonacci sphere: a lightweight, procedural visualization. No model inference is performed.
  const points = Array.from({ length: 260 }, (_, i) => {
    const y = 1 - i / 259 * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = Math.PI * (3 - Math.sqrt(5)) * i;
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
  });
  const edges = [];
  points.forEach((a, i) => {
    for (let j = i + 1; j < points.length; j++) {
      const b = points[j];
      if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < .29) edges.push([i, j]);
    }
  });
  function draw() {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0, 0, width, height);
    const radius = Math.min(width * .38, height * .365);
    const centerX = width * .51, centerY = height * .48;
    const angle = rotation + pointer.x * .22;
    const tilt = -.23 + pointer.y * .14;
    const ca = Math.cos(angle), sa = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt);
    const projected = points.map(p => {
      const rx = p.x * ca + p.z * sa;
      const rz = -p.x * sa + p.z * ca;
      const ry = p.y * ct - rz * st;
      const z = p.y * st + rz * ct;
      const scale = 3.5 / (3.5 - z);
      return { x: centerX + rx * radius * scale, y: centerY + ry * radius * scale, z, scale };
    });
    const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.6);
    glow.addColorStop(0, 'rgba(153,200,99,.055)');
    glow.addColorStop(1, 'rgba(153,200,99,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    // Orbital paths remain deliberately subtle behind the network.
    ctx.save(); ctx.translate(centerX, centerY); ctx.rotate(-.38);
    ctx.strokeStyle = 'rgba(197,241,138,.14)'; ctx.lineWidth = .7;
    ctx.beginPath(); ctx.ellipse(0, 0, radius * 1.36, radius * .34, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.rotate(.75); ctx.strokeStyle = 'rgba(197,241,138,.075)';
    ctx.beginPath(); ctx.ellipse(0, 0, radius * 1.26, radius * .59, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    edges.forEach(([i, j]) => {
      const a = projected[i], b = projected[j];
      const depth = (a.z + b.z + 2) / 4;
      ctx.strokeStyle = `rgba(181,218,139,${.035 + depth * .28})`;
      ctx.lineWidth = .55 + depth * .2;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });
    projected.forEach((p, i) => {
      const depth = (p.z + 1) / 2;
      ctx.fillStyle = `rgba(206,245,164,${.17 + depth * .75})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, (.55 + depth * .85) * p.scale, 0, Math.PI * 2); ctx.fill();
      if (i % 31 === 0 && depth > .4) {
        ctx.fillStyle = 'rgba(197,241,138,.10)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2); ctx.fill();
      }
    });
  }
  function animate(time) {
    frameId = 0;
    if (paused || !heroVisible || document.hidden) { lastTime = 0; return; }
    const delta = lastTime ? Math.min(time - lastTime, 50) : 16;
    lastTime = time;
    rotation += delta * .000085;
    pointer.x += (pointer.targetX - pointer.x) * .04;
    pointer.y += (pointer.targetY - pointer.y) * .04;
    draw(); frameId = requestAnimationFrame(animate);
  }
  function startAnimation() {
    if (!frameId && !paused && heroVisible && !document.hidden) frameId = requestAnimationFrame(animate);
  }
  function syncMotion() {
    document.documentElement.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Play visual effects' : 'Pause visual effects');
    motionButton.innerHTML = paused ? 'Play motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    if (paused) { cancelAnimationFrame(frameId); frameId = 0; lastTime = 0; draw(); }
    else startAnimation();
  }
  motionButton.addEventListener('click', () => { userMotionChoice = true; paused = !paused; syncMotion(); });
  motionQuery.addEventListener('change', () => { if (!userMotionChoice) { paused = motionQuery.matches; syncMotion(); } });
  function resize() {
    const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas); else window.addEventListener('resize', resize);
  canvas.addEventListener('pointermove', event => {
    if (paused || event.pointerType === 'touch') return;
    const rect = canvas.getBoundingClientRect();
    pointer.targetX = (event.clientX - rect.left) / rect.width - .5;
    pointer.targetY = (event.clientY - rect.top) / rect.height - .5;
  });
  canvas.addEventListener('pointerleave', () => { pointer.targetX = 0; pointer.targetY = 0; });
  document.addEventListener('visibilitychange', startAnimation);
  resize(); syncMotion();
  // Content is visible by default, including when JavaScript is unavailable.
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold: .08 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; startAnimation(); }, { threshold: 0 }).observe(canvas);
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) document.querySelectorAll('#navigation a').forEach(a => {
          const active = a.hash === '#' + entry.target.id;
          a.classList.toggle('active', active);
          if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(el => navObserver.observe(el));
  }
  const menuButton = $('.menu-toggle');
  const nav = $('#navigation');
  function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('open'); }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width:741px)').addEventListener('change', closeMenu);
  const slider = $('#color-slider');
  function updateComparison() {
    const value = Number(slider.value);
    $('#gray-rect').setAttribute('width', String(640 * value / 100));
    $('.compare-line').style.left = value + '%';
    slider.setAttribute('aria-valuetext', `${value} percent grayscale`);
  }
  slider.addEventListener('input', updateComparison);
  // The SVG uses slice fitting. Map the visible split back to SVG coordinates on resize.
  function updateComparisonFit() {
    const art = $('.colorization'), svg = art.querySelector('svg');
    svg.setAttribute('preserveAspectRatio', 'none'); updateComparison();
  }
  updateComparisonFit();
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)');
  document.querySelectorAll('.project-card:not(.compact-card)').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (paused || !finePointer.matches) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 4}deg`);
      card.style.setProperty('--rx', `${-((event.clientY - rect.top) / rect.height - .5) * 3}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
  let scrollPending = false;
  const progress = $('.scroll-progress');
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    scrollPending = false;
  }
  window.addEventListener('scroll', () => { if (!scrollPending) { requestAnimationFrame(updateScroll); scrollPending = true; } }, { passive: true });
  updateScroll(); $('#year').textContent = String(new Date().getFullYear());
})();
