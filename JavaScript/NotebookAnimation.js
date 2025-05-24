document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".notebook-page");

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target); // only trigger once
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    threshold: 0.3
  });

  pages.forEach(page => observer.observe(page));
});