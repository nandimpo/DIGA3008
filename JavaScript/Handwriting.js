document.addEventListener("DOMContentLoaded", () => {
  const mainTitle = document.getElementById("mainTitle");
  const subTitle = document.getElementById("subTitle");

  setTimeout(() => {
    mainTitle.classList.add("title-animate-in");
  }, 200);

  setTimeout(() => {
    subTitle.classList.add("title-animate-in");
  }, 600);
});