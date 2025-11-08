(() => {
  const root = document.getElementById('compass-root');
  const tape = document.getElementById('tape');
  const streetEl = document.getElementById('street-name');

  const PX_PER_DEG = 5;   
  const VIEWPORT_W = 720; 

  const eightDirs = ['N','NE','E','SE','S','SW','W','NW'];

  const buildTape = () => {
    const segmentW = 360 * PX_PER_DEG;
    const totalW = segmentW * 2; 
    tape.style.width = totalW + 'px';

    const makeSegment = (xOffset) => {
      for (let deg = 0; deg <= 360; deg++) {
        const x = xOffset + deg * PX_PER_DEG;

        if (deg % 45 === 0) {
          const tick = document.createElement('div');
          tick.className = 'tick major';
          tick.style.left = x + 'px';
          tape.appendChild(tick);

          const lbl = document.createElement('div');
          lbl.className = 'label';
          lbl.style.left = x + 'px';
          lbl.textContent = eightDirs[(deg / 45) % 8];
          tape.appendChild(lbl);
        } else if (deg % 9 === 0) {
          const tick = document.createElement('div');
          tick.className = 'tick minor';
          tick.style.left = x + 'px';
          tape.appendChild(tick);
        }
      }
    };

    makeSegment(0);
    makeSegment(segmentW);
  };

  buildTape();

  let visualHeading = 0;           
  let targetHeading = 0;          
  let lastTime = performance.now();

  const RESPONSIVENESS = 8;       

  const angleDelta = (from, to) => {
    return ((to - from + 540) % 360) - 180;
  };

  const render = (headingDeg) => {
    const segmentW = 360 * PX_PER_DEG;
    const centerOffset = VIEWPORT_W / 2;
    let shift = -(headingDeg * PX_PER_DEG) + centerOffset;
    shift = ((shift % segmentW) + segmentW) % segmentW - segmentW; 
    tape.style.transform = `translateX(${shift}px)`;
  };

  const animate = (t) => {
    const dt = Math.min(0.1, (t - lastTime) / 1000); 
    lastTime = t;

    const alpha = 1 - Math.exp(-RESPONSIVENESS * dt);
    visualHeading = (visualHeading + angleDelta(visualHeading, targetHeading) * alpha + 360) % 360;

    render(visualHeading);
    requestAnimationFrame(animate);
  };

  window.addEventListener('message', (e) => {
    const data = e.data;
    if (!data || !data.action) return;

    if (data.action === 'visibility') {
      const visible = !!data.show;
      root.classList.toggle('hidden', !visible);     
      root.style.display = visible ? 'flex' : 'none'; 
    }

    if (data.action === 'update') {
      targetHeading = (data.heading || 0) % 360;
      if (data.street) streetEl.textContent = (data.street || '').toUpperCase();
    }
  });

  requestAnimationFrame((t) => { lastTime = t; requestAnimationFrame(animate); });
})();
