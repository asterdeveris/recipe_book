export default function showTooltips(elements, eventType) {
  elements.forEach((el) => {
    el.addEventListener(eventType, (e) => {
      const ourTarget = e.target.parentElement;
      const tooltip = document.getElementById(`tooltip-${ourTarget.id}`);
      const tagName = ourTarget.tagName;

      if (tagName === "BUTTON" && eventType === "mouseover") {
        tooltip.classList.remove("hide");
      } else if (tagName === "BUTTON" && eventType === "mouseleave") {
        tooltip.classList.add("hide");
      }
    });
  });
}
