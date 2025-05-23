document.addEventListener("DOMContentLoaded", () => {
  const bg = document.createElement("div");
  bg.id = "dynamic-bg";
  document.body.appendChild(bg);

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.background = `radial-gradient(circle at ${x}% ${y}%, #d17609 0%, transparent 60%)`;
  });
});