const colors = [
  ["#5f5143", "#d17609"],
  ["#7a5c4b", "#e88b10"],
  ["#8b684c", "#f99e14"],
  ["#6e4b3a", "#c16706"],
  ["#5f5143", "#d17609"] // loop back to start
];

let colorIndex = 0;
let angle = 120;
let step = 0;
let shift = 0; // for background movement

const transitionSteps = 100;
const intervalTime = 50;

function lerpColor(a, b, t) {
  const ah = parseInt(a.replace('#', ''), 16),
        bh = parseInt(b.replace('#', ''), 16);

  const ar = ah >> 16,
        ag = (ah >> 8) & 0xff,
        ab = ah & 0xff;

  const br = bh >> 16,
        bg = (bh >> 8) & 0xff,
        bb = bh & 0xff;

  const rr = ar + t * (br - ar),
        rg = ag + t * (bg - ag),
        rb = ab + t * (bb - ab);

  return `rgb(${Math.round(rr)}, ${Math.round(rg)}, ${Math.round(rb)})`;
}

function updateBackground() {
  const [start1, end1] = colors[colorIndex];
  const [start2, end2] = colors[(colorIndex + 1) % colors.length];
  const t = step / transitionSteps;

  const lerpedStart = lerpColor(start1, start2, t);
  const lerpedEnd = lerpColor(end1, end2, t);

  angle = 120 + Math.sin(Date.now() / 2000) * 20; // smoothly oscillating angle
  shift += 0.5;

  document.body.style.background = `linear-gradient(${angle}deg, ${lerpedStart}, ${lerpedEnd})`;
  document.body.style.backgroundSize = `200% 200%`;
  document.body.style.backgroundPosition = `${Math.sin(shift / 50) * 50 + 50}% ${Math.cos(shift / 80) * 50 + 50}%`;

  step++;
  if (step >= transitionSteps) {
    step = 0;
    colorIndex = (colorIndex + 1) % colors.length;
  }
}

setInterval(updateBackground, intervalTime);
