document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".notebook-page");
  if (!pages.length) return;

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    threshold: 0.3
  });

  pages.forEach(page => observer.observe(page));
});
