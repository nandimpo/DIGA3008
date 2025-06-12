// ===== UTILITY FUNCTIONS =====

/**
 * Linear interpolation between two colors
 * @param {string} color1 - First color in hex format
 * @param {string} color2 - Second color in hex format  
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {string} Interpolated color in hex format
 */
function lerpColor(color1, color2, factor) {
  if (factor > 1) factor = 1;
  if (factor < 0) factor = 0;
  
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// ===== HANDWRITING ANIMATION =====

function initHandwritingAnimation() {
  // Inject keyframes if they don't exist
  if (!document.getElementById("handwriting-keyframes")) {
    const style = document.createElement("style");
    style.id = "handwriting-keyframes";
    style.textContent = `
      @keyframes draw {
        to { stroke-dashoffset: 0; }
      }
      @keyframes draw-sub {
        to { stroke-dashoffset: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");

  document.fonts.ready.then(() => {
    if (title) {
      const titleLength = title.getComputedTextLength();
      title.style.strokeDasharray = titleLength;
      title.style.strokeDashoffset = titleLength;
      title.style.animation = "draw 4s ease forwards";
      title.style.visibility = "visible";
    }

    if (subtitle) {
      const subLength = subtitle.getComputedTextLength();
      subtitle.style.strokeDasharray = subLength;
      subtitle.style.strokeDashoffset = subLength;
      subtitle.style.animation = "draw-sub 3s ease forwards";
      subtitle.style.animationDelay = "2.5s";
      subtitle.style.visibility = "visible";
    }
  });
}

// ===== SIMPLE API EXAMPLE =====

async function loadRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    
    const quoteElement = document.getElementById('daily-quote');
    if (quoteElement) {
      quoteElement.innerHTML = `"${data.content}" — ${data.author}`;
    }
  } catch (error) {
    console.log('Quote loading failed:', error);
  }
}

// ===== EVENT LISTENERS =====

function setupEventListeners() {
  // Reset handwriting animation on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resetHandwritingAnimation();
    }
  });

  // Replay animation when clicking on SVG elements
  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");
  
  if (title) {
    title.addEventListener('click', () => {
      resetHandwritingAnimation();
    });
  }
  
  if (subtitle) {
    subtitle.addEventListener('click', () => {
      resetHandwritingAnimation();
    });
  }
}

function resetHandwritingAnimation() {
  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");

  // Reset animations
  if (title) {
    title.style.animation = 'none';
    title.offsetHeight; // Trigger reflow
  }
  
  if (subtitle) {
    subtitle.style.animation = 'none';
    subtitle.offsetHeight; // Trigger reflow
  }

  // Restart animation
  setTimeout(() => {
    initHandwritingAnimation();
  }, 100);
}

// ===== INITIALIZATION =====

document.addEventListener("DOMContentLoaded", () => {
  initHandwritingAnimation();
  setupEventListeners();
  loadRandomQuote();
});

// Make lerpColor available globally for other scripts
window.lerpColor = lerpColor;