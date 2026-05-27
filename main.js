// ── SACRED GEOMETRY CANVAS ──
(function () {
  const canvas = document.getElementById('geo-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function ring(cx, cy, r, alpha, lw) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200,149,42,${alpha})`; ctx.lineWidth = lw || 0.5; ctx.stroke();
  }

  function flower(cx, cy, r, rot, base) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
    ring(0, 0, r, base * 0.9, 0.7);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      ring(Math.cos(a) * r, Math.sin(a) * r, r, base * 0.45, 0.5);
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      ring(Math.cos(a) * r * 2, Math.sin(a) * r * 2, r, base * 0.14, 0.4);
    }
    ring(0, 0, r * 2, base * 0.32, 0.5);
    ring(0, 0, r * 3, base * 0.14, 0.4);
    ring(0, 0, r * 3.46, base * 0.08, 0.3);
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.0018;
    const breath = 0.86 + Math.sin(t * 0.38) * 0.14;
    const r = Math.min(W, H) * 0.155 * breath;
    flower(W / 2, H / 2, r, t * 0.065, 0.42);
    flower(W * 0.1, H * 0.9, r * 0.26, -t * 0.045, 0.11);
    flower(W * 0.9, H * 0.1, r * 0.26,  t * 0.045, 0.11);
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── MOBILE NAV ──
(function () {
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => links.classList.toggle('open'));
})();

// ── COUNTDOWN ──
(function () {
  const els = {
    days:  document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins:  document.getElementById('cd-mins'),
    secs:  document.getElementById('cd-secs'),
  };
  if (!els.days) return;
  const target = new Date('2026-07-02T00:00:00');
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = target - new Date();
    if (diff <= 0) { ['days','hours','mins','secs'].forEach(k => els[k].textContent = '00'); return; }
    els.days.textContent  = pad(Math.floor(diff / 86400000));
    els.hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    els.mins.textContent  = pad(Math.floor((diff % 3600000) / 60000));
    els.secs.textContent  = pad(Math.floor((diff % 60000) / 1000));
  }
  tick(); setInterval(tick, 1000);
})();

// ── ACTIVE NAV LINK ──
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();
