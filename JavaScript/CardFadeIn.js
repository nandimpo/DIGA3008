document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll('.inspiration-block');

  blocks.forEach((block, index) => {
    block.style.opacity = 0;
    block.style.transform = "translateY(40px)";
    block.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

    setTimeout(() => {
      block.style.opacity = 1;
      block.style.transform = "translateY(0)";
    }, index * 200); 
  });
});
