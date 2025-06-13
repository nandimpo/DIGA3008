document.addEventListener("DOMContentLoaded", async () => {
  try {
    const config = await fetchBlockAnimationConfig();
    const blocks = document.querySelectorAll('.inspiration-block');

    blocks.forEach((block, index) => {
      block.style.opacity = 0;
      block.style.transform = `translateY(${config.initialOffset})`;
      block.style.transition = `opacity ${config.duration} ease-out, transform ${config.duration} ease-out`;

      setTimeout(() => {
        block.style.opacity = config.finalOpacity;
        block.style.transform = config.finalTransform;
      }, index * config.stagger);
    });
  } catch (error) {
    console.error("Failed to fetch block animation config:", error);
  }
});

async function fetchBlockAnimationConfig() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    if (!response.ok) throw new Error("Network response failed");

    const data = await response.json();

    return {
      initialOffset: "40px",
      finalTransform: "translateY(0)",
      finalOpacity: 1,
      duration: "0.6s",
      stagger: 200
    };
  } catch (err) {
    throw new Error("Could not load animation configuration");
  }
}
