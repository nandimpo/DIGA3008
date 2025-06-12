document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("handwrittenPath");
  const subtitle = document.getElementById("subtitlePath");

  document.fonts.ready.then(() => {
    if (title) {
      const titleLength = title.getComputedTextLength();
      title.style.strokeDasharray = titleLength;
      title.style.strokeDashoffset = titleLength;
      title.style.animation = "draw 4s ease forwards";
      title.style.visibility = "visible";
    }

    if (subtitle) {
      const subLength = subtitle.getComputedTextLength();
      subtitle.style.strokeDasharray = subLength;
      subtitle.style.strokeDashoffset = subLength;
      subtitle.style.animation = "draw-sub 3s ease forwards";
      subtitle.style.animationDelay = "2.5s";
      subtitle.style.visibility = "visible";
    }
  });
});
