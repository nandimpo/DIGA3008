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
  console.log('Initializing handwriting animation...');
  
  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");

  if (!title && !subtitle) {
    console.log('No handwriting elements found');
    return;
  }

  // Wait for fonts to load
  document.fonts.ready.then(() => {
    console.log('Fonts loaded, starting animation');
    
    if (title) {
      // Set up stroke properties
      title.style.fill = 'none';
      title.style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--heading-color').trim();
      title.style.strokeWidth = '2px';
      title.style.strokeLinecap = 'round';
      title.style.strokeLinejoin = 'round';
      
      // Calculate text length for animation
      try {
        const titleLength = title.getComputedTextLength();
        title.style.strokeDasharray = titleLength;
        title.style.strokeDashoffset = titleLength;
        
        // Start animation
        title.style.animation = "draw 4s ease forwards";
        title.style.visibility = "visible";
        
        console.log('Title animation started, length:', titleLength);
      } catch (error) {
        console.log('Error with title animation:', error);
        // Fallback: just show the text
        title.style.fill = getComputedStyle(document.documentElement).getPropertyValue('--heading-color');
        title.style.stroke = 'none';
        title.style.visibility = "visible";
      }
    }

    if (subtitle) {
      // Set up stroke properties
      subtitle.style.fill = 'none';
      subtitle.style.stroke = getComputedStyle(document.documentElement).getPropertyValue('--heading-color').trim();
      subtitle.style.strokeWidth = '1.5px';
      subtitle.style.strokeLinecap = 'round';
      subtitle.style.strokeLinejoin = 'round';
      
      // Calculate text length for animation
      try {
        const subLength = subtitle.getComputedTextLength();
        subtitle.style.strokeDasharray = subLength;
        subtitle.style.strokeDashoffset = subLength;
        
        // Start animation with delay
        subtitle.style.animation = "draw-sub 3s ease forwards";
        subtitle.style.animationDelay = "2.5s";
        subtitle.style.visibility = "visible";
        
        console.log('Subtitle animation started, length:', subLength);
      } catch (error) {
        console.log('Error with subtitle animation:', error);
        // Fallback: just show the text
        subtitle.style.fill = getComputedStyle(document.documentElement).getPropertyValue('--heading-color');
        subtitle.style.stroke = 'none';
        subtitle.style.visibility = "visible";
      }
    }
  }).catch(err => {
    console.log('Font loading error:', err);
    // Fallback without waiting for fonts
    if (title) {
      title.style.fill = getComputedStyle(document.documentElement).getPropertyValue('--heading-color');
      title.style.visibility = "visible";
    }
    if (subtitle) {
      subtitle.style.fill = getComputedStyle(document.documentElement).getPropertyValue('--heading-color');
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
  console.log('Setting up event listeners...');
  
  // Reset handwriting animation on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      console.log('ESC pressed, resetting animation');
      resetHandwritingAnimation();
    }
  });

  // Replay animation when clicking on SVG elements
  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");
  
  if (title) {
    title.addEventListener('click', () => {
      console.log('Title clicked, resetting animation');
      resetHandwritingAnimation();
    });
    title.style.cursor = 'pointer';
  }
  
  if (subtitle) {
    subtitle.addEventListener('click', () => {
      console.log('Subtitle clicked, resetting animation');
      resetHandwritingAnimation();
    });
    subtitle.style.cursor = 'pointer';
  }
}

function resetHandwritingAnimation() {
  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");

  console.log('Resetting handwriting animation...');

  // Reset animations
  if (title) {
    title.style.animation = 'none';
    title.style.visibility = 'hidden';
    title.offsetHeight; // Trigger reflow
  }
  
  if (subtitle) {
    subtitle.style.animation = 'none';
    subtitle.style.visibility = 'hidden';
    subtitle.offsetHeight; // Trigger reflow
  }

  // Restart animation
  setTimeout(() => {
    initHandwritingAnimation();
  }, 100);
}

// ===== INITIALIZATION =====

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM loaded, initializing...');
  initHandwritingAnimation();
  setupEventListeners();
  loadRandomQuote();
});

// Also try to initialize when page is fully loaded
window.addEventListener('load', () => {
  console.log('Page fully loaded');
  // Only reinitialize if elements are still hidden
  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");
  
  if ((title && title.style.visibility === 'hidden') || (subtitle && subtitle.style.visibility === 'hidden')) {
    console.log('Some elements still hidden, reinitializing...');
    initHandwritingAnimation();
  }
});

// Debug function - call this in console to test
window.testHandwriting = function() {
  console.log('Testing handwriting animation...');
  resetHandwritingAnimation();
};

// Make lerpColor available globally for other scripts
window.lerpColor = lerpColor;