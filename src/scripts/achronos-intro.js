const SESSION_KEY = 'axios_achronos_intro_v1';
const TIMELINE_END = 5.1;
const clamp = (v) => Math.max(0, Math.min(1, v));
const ease = (t, start, end) => {
  const v = clamp((t - start) / (end - start));
  return v * v * (3 - 2 * v);
};

export async function startAchronosIntro(host) {
  const canvas = host.querySelector('canvas');
  const skip = host.querySelector('button');
  const caption = host.querySelector('.achronos-caption');
  const bottom = host.querySelector('.achronos-bottom');
  const grain = host.querySelector('.achronos-grain');
  const progress = host.querySelector('.achronos-track span');
  const eras = [...host.querySelectorAll('.achronos-eras span')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = Math.min(12, Math.max(4, Number(host.dataset.duration) || TIMELINE_END));
  const previousFocus = document.activeElement;
  const siblings = [...host.parentElement.children].filter((el) => el !== host && el instanceof HTMLElement && !['SCRIPT', 'STYLE'].includes(el.tagName));
  const inertStates = siblings.map((el) => el.inert);
  let scene;
  let done = false;
  let raf = 0;
  let loadingTimer = 0;
  let started = false;
  let elapsed = 0;
  let last = 0;
  const controller = new AbortController();
  const options = { signal: controller.signal };

  const finish = (focusPage = false) => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    clearTimeout(host._fallback);
    clearTimeout(loadingTimer);
    controller.abort();
    scene?.dispose();
    scene = undefined;
    skip.onclick = null;
    const restoreFocus = focusPage || host.contains(document.activeElement);
    siblings.forEach((el, i) => { el.inert = inertStates[i]; });
    host.hidden = true;
    host.dataset.state = 'finished';
    document.documentElement.classList.remove('achronos-active');
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
    if (restoreFocus) {
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body && !host.contains(previousFocus)) {
        previousFocus.focus({ preventScroll: true });
      } else {
        document.querySelector('header a, #welcome a')?.focus({ preventScroll: true });
      }
    }
  };

  host.addEventListener('achronos:abort', () => finish(), options);
  skip.onclick = () => finish(true);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') finish(true);
    if (event.key === 'Tab') { event.preventDefault(); skip.focus({ preventScroll: true }); }
  }, options);
  reduce.addEventListener('change', () => finish(), options);
  window.addEventListener('pagehide', () => finish(), options);
  document.addEventListener('astro:before-swap', () => finish(), options);
  canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); finish(); }, options);
  siblings.forEach((el) => { el.inert = true; });

  if (host.dataset.state === 'static' || reduce.matches) {
    loadingTimer = window.setTimeout(() => finish(), 400);
    return;
  }
  host.focus({ preventScroll: true });
  caption.style.opacity = '0';
  loadingTimer = window.setTimeout(() => finish(), 5000);

  try {
    // Neither Three.js nor the SVG geometry is downloaded on repeat visits.
    const { createTimeScene } = await import('./achronos-scene.js');
    if (done) return;
    scene = createTimeScene(canvas);
    clearTimeout(loadingTimer);
    clearTimeout(host._fallback);
    host.dataset.state = 'playing';

    const resize = () => scene.resize(host.clientWidth, host.clientHeight);
    window.addEventListener('resize', resize, options);
    resize();
    // Hidden tabs pause the sequence instead of returning to a missed reveal.
    let lastPaint = performance.now();
    document.addEventListener('visibilitychange', () => { last = 0; lastPaint = performance.now(); }, options);
    let watchdog;
    const watch = () => {
      if (done) return;
      if (!document.hidden && performance.now() - lastPaint > 3500) finish();
      else watchdog = window.setTimeout(watch, 2000);
    };
    watchdog = window.setTimeout(watch, 4000);
    controller.signal.addEventListener('abort', () => clearTimeout(watchdog), { once: true });

    const frame = (now) => {
      if (done) return;
      raf = requestAnimationFrame(frame);
      if (document.hidden) { last = 0; return; }
      lastPaint = performance.now();
      if (last) elapsed += Math.min((now - last) / 1000, .1);
      last = now;
      const t = Math.min(TIMELINE_END, elapsed * TIMELINE_END / duration);
      try {
        scene.render(t);
        caption.style.opacity = String(ease(t, .3, 1.1) * (1 - ease(t, 3.95, 4.4)));
        bottom.style.opacity = String(1 - ease(t, 3.95, 4.4));
        skip.style.opacity = String(1 - ease(t, 3.95, 4.4));
        grain.style.opacity = String(.16 * (1 - ease(t, 4.15, 4.45)));
        progress.style.transform = `scaleX(${clamp(t / 4.6)})`;
        eras.forEach((el, i) => {
          const active = ease(t, i * 1.25, i * 1.25 + .5);
          el.style.opacity = String(.38 + .62 * active);
        });
        // Reveal the actual landing page in one fade, including its logo.
        // There is no intermediate wordmark or separate background recolouring.
        host.style.opacity = String(1 - ease(t, 4.45, TIMELINE_END));
        if (!started) { started = true; host.dispatchEvent(new Event('achronos:ready')); }
        if (t >= TIMELINE_END) finish();
      } catch (error) {
        console.warn('The ACHRONOS intro could not render.', error);
        finish();
      }
    };
    raf = requestAnimationFrame(frame);
  } catch (error) {
    console.warn('The ACHRONOS intro is unavailable.', error);
    finish();
  }
}
