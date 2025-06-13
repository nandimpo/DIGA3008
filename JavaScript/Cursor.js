class CursorPulse {
  constructor() {
    this.cursor = null;
    this.pulseAlpha = 0.4;
    this.increasing = true;
    this.intervalId = null;
    this.isActive = true;
    this.lastX = 0;
    this.lastY = 0;

    // Bind methods so they can be removed later
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  init() {
    this.cursor = document.getElementById('cursorPulse');
    if (!this.cursor) return;

    this.cursor.classList.add('cursor-pulse');
    this.setupMouseTracking();
    this.setupPulseAnimation();
    this.setupEventListeners();
    this.loadSettings();
  }

  setupMouseTracking() {
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      if (!ticking && this.isActive) {
        requestAnimationFrame(() => {
          this.cursor.style.setProperty('--cursor-x', `${this.lastX}px`);
          this.cursor.style.setProperty('--cursor-y', `${this.lastY}px`);
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

      this.cursor.style.setProperty('--cursor-opacity', this.pulseAlpha.toFixed(2));
    }, 50);
  }

  setupEventListeners() {
    document.addEventListener('mouseleave', this.hide);
    document.addEventListener('mouseenter', this.show);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    document.addEventListener('keydown', this.handleKeydown);
  }

  handleVisibilityChange() {
    document.hidden ? this.pause() : this.resume();
  }

  handleKeydown(e) {
    if (e.key === 'c' && !e.ctrlKey) {
      e.preventDefault();
      this.toggle();
    }
    if (e.key === 'Escape') this.reset();
  }

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

  show() {
    this.isActive = true;
    this.cursor.classList.remove('hidden');
  }

  hide() {
    this.isActive = false;
    this.cursor.classList.add('hidden');
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
    document.removeEventListener('mouseleave', this.hide);
    document.removeEventListener('mouseenter', this.show);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    document.removeEventListener('keydown', this.handleKeydown);
  }
}

// ===== INITIALIZATION =====
let cursorInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  cursorInstance = new CursorPulse();
  cursorInstance.init();
});

window.addEventListener('beforeunload', () => {
  if (cursorInstance) {
    cursorInstance.saveSettings();
    cursorInstance.destroy();
  }
});
