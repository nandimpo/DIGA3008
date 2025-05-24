// Cursor.js
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById('cursorPulse');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  let pulseAlpha = 0.4;
  let increasing = true;

  setInterval(() => {
    pulseAlpha += increasing ? 0.02 : -0.02;
    if (pulseAlpha >= 0.6) increasing = false;
    if (pulseAlpha <= 0.2) increasing = true;

    cursor.style.backgroundColor = `rgba(24, 112, 64, ${pulseAlpha.toFixed(2)})`;
  }, 50);
});
