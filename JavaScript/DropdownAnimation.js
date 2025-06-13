document.addEventListener("DOMContentLoaded", async () => {
  try {
    const config = await fetchDropdownConfig();
    const buttons = document.querySelectorAll(".read-more-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const dropdown = button.nextElementSibling;

        const isExpanded = dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px";

        if (isExpanded) {
          dropdown.style.maxHeight = "0px";
          dropdown.style.opacity = 0;
          dropdown.style.transition = `max-height ${config.speed} ease, opacity ${config.speed} ease`;
        } else {
          dropdown.style.maxHeight = `${config.expandHeight}`;
          dropdown.style.opacity = 1;
          dropdown.style.transition = `max-height ${config.speed} ease, opacity ${config.speed} ease`;
        }
      });
    });
  } catch (error) {
    console.error("Dropdown config fetch failed:", error);
  }
});

async function fetchDropdownConfig() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/2");
    if (!response.ok) throw new Error("Fetch failed");
    const data = await response.json();

    return {
      expandHeight: "500px",
      speed: "0.4s"
    };
  } catch (err) {
    throw new Error("Unable to fetch dropdown configuration");
  }
}
