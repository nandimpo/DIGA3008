// ===== DYNAMIC BACKGROUND ENHANCED =====

class DynamicBackground {
  constructor() {
    this.bg = null;
    this.isActive = true;
    this.color = '#d17609';
    this.intensity = 60;
  }

  init() {
    this.bg = document.createElement("div");
    this.bg.id = "dynamic-bg";
    document.body.appendChild(this.bg);

    this.setupMouseTracking();
    this.setupEventListeners();
    this.loadSettings();
  }

  setupMouseTracking() {
    let ticking = false;
    document.addEventListener("mousemove", (e) => {
      if (!ticking && this.isActive) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          this.bg.style.background = `radial-gradient(circle at ${x}% ${y}%, ${this.color} 0%, transparent ${this.intensity}%)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupEventListeners() {
    // Center gradient when mouse leaves
    document.addEventListener('mouseleave', () => {
      this.bg.style.background = `radial-gradient(circle at 50% 50%, ${this.color} 0%, transparent ${this.intensity}%)`;
    });

    // Pause on visibility change
    document.addEventListener('visibilitychange', () => {
      this.isActive = !document.hidden;
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (e.key === 'b' && !e.ctrlKey) {
        e.preventDefault();
        this.toggle();
      }
      if (e.key === '1') this.changeColor('#d17609'); // Orange
      if (e.key === '2') this.changeColor('#e1b808'); // Yellow
      if (e.key === '3') this.changeColor('#5f5143'); // Brown
    });

    // Touch support
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0 && this.isActive) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 100;
        const y = (touch.clientY / window.innerHeight) * 100;
        this.bg.style.background = `radial-gradient(circle at ${x}% ${y}%, ${this.color} 0%, transparent ${this.intensity}%)`;
      }
    });
  }

  // ===== API FUNCTIONS =====

  async loadSettings() {
    try {
      const stored = localStorage.getItem('bgSettings');
      if (stored) {
        const settings = JSON.parse(stored);
        this.color = settings.color || this.color;
        this.intensity = settings.intensity || this.intensity;
      }
      
      // Load daily color
      await this.fetchDailyColor();
    } catch (error) {
      console.log('Using default settings');
    }
  }

  async fetchDailyColor() {
    try {
      const response = await fetch('https://www.colr.org/json/random');
      const data = await response.json();
      
      if (data.new_color) {
        const colorDisplay = document.getElementById('daily-color');
        if (colorDisplay) {
          colorDisplay.textContent = `Today's color: #${data.new_color}`;
          colorDisplay.style.color = `#${data.new_color}`;
        }
      }
    } catch (error) {
      console.log('Color fetch failed');
    }
  }

  async saveSettings() {
    try {
      localStorage.setItem('bgSettings', JSON.stringify({
        color: this.color,
        intensity: this.intensity
      }));
    } catch (error) {
      console.log('Save failed');
    }
  }

  // ===== CONTROLS =====

  toggle() {
    this.isActive = !this.isActive;
    this.bg.style.opacity = this.isActive ? '1' : '0';
  }

  changeColor(newColor) {
    this.color = newColor;
    this.saveSettings();
  }

  destroy() {
    if (this.bg) this.bg.remove();
  }
}

// ===== SIMPLE API =====

async function fetchQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    
    const quoteEl = document.getElementById('bg-quote');
    if (quoteEl) {
      quoteEl.textContent = `"${data.content}" — ${data.author}`;
    }
  } catch (error) {
    console.log('Quote failed');
  }
}

// ===== INITIALIZATION =====

let bgInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  bgInstance = new DynamicBackground();
  bgInstance.init();
  fetchQuote();
});

window.addEventListener('beforeunload', () => {
  if (bgInstance) {
    bgInstance.saveSettings();
    bgInstance.destroy();
  }
});