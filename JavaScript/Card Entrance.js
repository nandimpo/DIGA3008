document.addEventListener("DOMContentLoaded", async () => {
  try {
    const config = await fetchAnimationConfig();
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCard(entry.target, config);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: config.threshold });

    cards.forEach(card => {
      card.style.opacity = 0;
      card.style.transform = "translateY(40px)";
      card.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
      observer.observe(card);
    });
  } catch (error) {
    console.error("Failed to load animation config:", error);
  }
});

async function fetchAnimationConfig() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    return {
      threshold: 0.2,
      opacity: 1,
      transform: "translateY(0)"
    };
  } catch (err) {
    throw new Error("Unable to fetch animation configuration");
  }
}

function animateCard(card, config) {
  card.style.opacity = config.opacity;
  card.style.transform = config.transform;
}
