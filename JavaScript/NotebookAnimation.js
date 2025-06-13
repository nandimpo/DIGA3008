document.addEventListener("DOMContentLoaded", () => {
  const mainTitle = document.getElementById("mainTitle");
  const subTitle = document.getElementById("subTitle");

  // Animate main title with both classes
  if (mainTitle) {
    setTimeout(() => {
      mainTitle.classList.add("title-animate-in", "reveal");
    }, 200);
  }

  // Animate subtitle if it exists
  if (subTitle) {
    setTimeout(() => {
      subTitle.classList.add("title-animate-in");
    }, 600);
  }
});
