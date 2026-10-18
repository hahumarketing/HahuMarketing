"use strict";
(() => {
  const marquee = document.querySelector(".audience-marquee");
  if (!marquee) return;
  const button = marquee.querySelector(".audience-pause");
  button.addEventListener("click", () => {
    const paused = marquee.classList.toggle("is-paused");
    button.setAttribute("aria-pressed", String(paused));
    button.setAttribute(
      "aria-label",
      paused ? "Resume scrolling categories" : "Pause scrolling categories",
    );
    button.firstElementChild.textContent = paused ? "▷" : "Ⅱ";
  });
})();
