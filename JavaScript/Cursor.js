// ===== CURSOR PULSE ENHANCED =====

class CursorPulse {
  constructor() {
    this.cursor = null;
    this.pulseAlpha = 0.4;
    this.increasing = true;
    this.intervalId = null;
    this.isActive = true;
  }

  init() {
    this.cursor = document.getElementById('cursorPulse');
    if (!this.cursor) return;

    this.setupMouseTracking();
    this.setupPulseAnimation();
    this.setupEventListeners();
    this.loadSettings();
  }

  setupMouseTracking() {
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      if (!ticking && this.cursor && this.isActive) {
        requestAnimationFrame(() => {
          this.cursor.style.left = `${e.clientX}px`;
          this.cursor.style.top = `${e.clientY}px`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupPulseAnimation() {
    this.intervalId = setInterval(() => {
      if (!this.isActive) return;

      this.pulseAlpha += this.increasing ? 0.02 : -0.02;
      if (this.pulseAlpha >= 0.6) this.increasing = false;
      if (this.pulseAlpha <= 0.2) this.increasing = true;

      if (this.cursor) {
        this.cursor.style.backgroundColor = `rgba(24, 112, 64, ${this.pulseAlpha.toFixed(2)})`;
      }
    }, 50);
  }

  setupEventListeners() {
    // Hide/show cursor
    document.addEventListener('mouseleave', () => this.hide());
    document.addEventListener('mouseenter', () => this.show());
    
    // Pause on visibility change
    document.addEventListener('visibilitychange', () => {
      document.hidden ? this.pause() : this.resume();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (e.key === 'c' && !e.ctrlKey) {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === 'Escape') this.reset();
    });
  }

  // ===== API FUNCTIONS =====

  async loadSettings() {
    try {
      const stored = localStorage.getItem('cursorSettings');
      if (stored) {
        const settings = JSON.parse(stored);
        this.pulseAlpha = settings.alpha || 0.4;
      }
    } catch (error) {
      console.log('Using default cursor settings');
    }
  }

  async saveSettings() {
    try {
      localStorage.setItem('cursorSettings', JSON.stringify({
        alpha: this.pulseAlpha
      }));
    } catch (error) {
      console.log('Could not save cursor settings');
    }
  }

  // ===== CONTROL METHODS =====

  show() {
    this.isActive = true;
    if (this.cursor) this.cursor.style.opacity = '1';
  }

  hide() {
    this.isActive = false;
    if (this.cursor) this.cursor.style.opacity = '0';
  }

  toggle() {
    this.isActive ? this.pause() : this.resume();
  }

  pause() {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resume() {
    if (!this.isActive) {
      this.isActive = true;
      this.setupPulseAnimation();
    }
  }

  reset() {
    this.pulseAlpha = 0.4;
    this.increasing = true;
  }

  destroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}

// ===== SIMPLE API EXAMPLE =====

async function fetchMotivationalQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=motivational');
    const data = await response.json();
    
    const quoteElement = document.getElementById('daily-quote');
    if (quoteElement) {
      quoteElement.textContent = `"${data.content}" — ${data.author}`;
    }
  } catch (error) {
    console.log('Quote fetch failed:', error);
  }
}

// ===== INITIALIZATION =====

let cursorInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  cursorInstance = new CursorPulse();
  cursorInstance.init();
  fetchMotivationalQuote();
});

window.addEventListener('beforeunload', () => {
  if (cursorInstance) {
    cursorInstance.saveSettings();
    cursorInstance.destroy();
  }
});