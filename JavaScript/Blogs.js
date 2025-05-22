document.addEventListener("DOMContentLoaded", () => {
  const wave1 = document.querySelector(".wave1");
  const wave2 = document.querySelector(".wave2");

  const wavePath1 = "M0,64L48,96C96,128,192,192,288,208C384,224,480,192,576,154.7C672,117,768,75,864,85.3C960,96,1056,160,1152,176C1248,192,1344,160,1392,144L1440,128L1440,0L0,0Z";
  const wavePath2 = "M0,192L48,165.3C96,139,192,85,288,85.3C384,85,480,139,576,160C672,181,768,171,864,144C960,117,1056,75,1152,85.3C1248,96,1344,160,1392,192L1440,224L1440,0L0,0Z";

  // Set initial path
  wave1.setAttribute("d", wavePath1);
  wave2.setAttribute("d", wavePath2);

  // Animate wave fill based on scroll
  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const percent = Math.min(scroll / 600, 1); // max at 600px scroll

    const blend = (color1, color2, percent) => {
      const c1 = parseInt(color1.replace("#", ""), 16);
      const c2 = parseInt(color2.replace("#", ""), 16);
      const r = Math.floor(((c2 >> 16) - (c1 >> 16)) * percent + (c1 >> 16));
      const g = Math.floor((((c2 >> 8) & 0xff) - ((c1 >> 8) & 0xff)) * percent + ((c1 >> 8) & 0xff));
      const b = Math.floor(((c2 & 0xff) - (c1 & 0xff)) * percent + (c1 & 0xff));
      return `rgb(${r}, ${g}, ${b})`;
    };

    const blended = blend("5F5143", "D17609", percent);
    wave1.style.fill = blended;
    wave2.style.fill = blended;

    document.body.style.background = `linear-gradient(to bottom, ${blended}, var(--accent-color))`;
  });

  // Optional: wave shift with mouse movement
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 50;
    const y = (e.clientY / window.innerHeight) * 50;
    wave1.setAttribute("transform", `translate(${x / 2},${y / 3})`);
    wave2.setAttribute("transform", `translate(${x / 3},${y / 4})`);
  });
});
