document.addEventListener("DOMContentLoaded", async () => {
  try {
    const config = await fetchTitleAnimationConfig();

    const mainTitle = document.getElementById("mainTitle");
    const subTitle = document.getElementById("subTitle");

    if (mainTitle) {
      mainTitle.style.opacity = 0;
      mainTitle.style.transform = `translateY(${config.initialOffset})`;
      mainTitle.style.transition = `opacity ${config.speed} ease-out, transform ${config.speed} ease-out`;

      setTimeout(() => {
        mainTitle.style.opacity = 1;
        mainTitle.style.transform = "translateY(0)";
      }, config.mainDelay);
    }

    if (subTitle) {
      subTitle.style.opacity = 0;
      subTitle.style.transform = `translateY(${config.initialOffset})`;
      subTitle.style.transition = `opacity ${config.speed} ease-out, transform ${config.speed} ease-out`;

      setTimeout(() => {
        subTitle.style.opacity = 1;
        subTitle.style.transform = "translateY(0)";
      }, config.subDelay);
    }

  } catch (error) {
    console.error("Title animation config failed:", error);
  }
});

async function fetchTitleAnimationConfig() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/3");
    if (!response.ok) throw new Error("Fetch failed");
    const data = await response.json();

    return {
      initialOffset: "40px",
      speed: "0.8s",
      mainDelay: 200,
      subDelay: 600
    };
  } catch (err) {
    throw new Error("Unable to fetch animation configuration");
  }
}
