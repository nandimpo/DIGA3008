const cursor = document.getElementById('cursorPulse');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Color pulse using JavaScript
let pulseAlpha = 0.4;
let increasing = true;

setInterval(() => {
  if (increasing) {
    pulseAlpha += 0.02;
    if (pulseAlpha >= 0.6) increasing = false;
  } else {
    pulseAlpha -= 0.02;
    if (pulseAlpha <= 0.2) increasing = true;
  }
  cursor.style.backgroundColor = `rgba(24, 112, 64, ${pulseAlpha.toFixed(2)})`;
}, 50);