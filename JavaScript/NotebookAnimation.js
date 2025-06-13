document.addEventListener("DOMContentLoaded", () => {
  const mainTitle = document.getElementById("mainTitle");
  const subTitle = document.getElementById("subTitle");

  // Add animation classes
  setTimeout(() => {
    mainTitle?.classList.add("title-animate-in");
  }, 200);

  setTimeout(() => {
    subTitle?.classList.add("title-animate-in");
  }, 600);
});