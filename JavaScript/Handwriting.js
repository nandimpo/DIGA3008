document.addEventListener("DOMContentLoaded", () => {
  const mainTitle = document.getElementById("mainTitle");
  const subTitle = document.getElementById("subTitle");

  // === Title animation on load ===
  setTimeout(() => {
    mainTitle.classList.add("title-animate-in");
  }, 200);

  setTimeout(() => {
    subTitle.classList.add("title-animate-in");
  }, 600);

  // === Event Listener: Change title color on hover and touch ===
  function highlightTitle() {
    mainTitle.style.color = "#E1B808";
  }

  function resetTitleColor() {
    mainTitle.style.color = "";
  }

  mainTitle.addEventListener("mouseover", highlightTitle);
  mainTitle.addEventListener("mouseout", resetTitleColor);
  mainTitle.addEventListener("touchstart", highlightTitle);

  // === Event Listener: Animate subtitle when it scrolls into view ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("title-animate-in");
      }
    });
  });

  observer.observe(subTitle);

  // === Async API Example ===
  async function fetchExampleData() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await response.json();
      console.log("Fetched data:", data); // For demonstration only
    } catch (error) {
      console.error("API fetch failed:", error);
    }
  }

  fetchExampleData();
});
