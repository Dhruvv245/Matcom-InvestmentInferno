setTimeout(function () {
  window.location.reload();
}, 15000);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementByClassName("menu-link").click(function () {
    document.getElementByClassName("menu-link").classList.remove("is-active");
    this.classList.add("is-active");
  });
});

(function () {
  document.getElementByClassName("main-header-link").click(function () {
    document
      .getElementByClassName("main-header-link")
      .classList.remove("is-active");
    this.classList.add("is-active");
  });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdowns.forEach((c) => c.classList.remove("is-active"));
    dropdown.classList.add("is-active");
  });
});

document
  .querySelectorAll(".search-bar input")
  .focus(function () {
    document.getElementByClassName("header").classList.add("wide");
  })
  .blur(function () {
    document.getElementByClassName("header").classList.remove("wide");
  });

document.click(function (e) {
  let container = document.getElementByClassName("status-button");
  let dd = document.getElementByClassName("dropdown");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    dd.classList.remove("is-active");
  }
});

$(function () {
  document.getElementByClassName("dropdown").on("click", function (e) {
    document.getElementByClassName("content-wrapper").classList.add("overlay");
    e.stopPropagation();
  });
  document.on("click", function (e) {
    if ($(e.target).is(".dropdown") === false) {
      document
        .getElementByClassName("content-wrapper")
        .classList.remove("overlay");
    }
  });
});

(function () {
  ".status-button:not(.open)".on("click", function (e) {
    document.getElementByClassName("overlay-app").classList.add("is-active");
  });
  ".pop-up .close".click(function () {
    document.getElementByClassName("overlay-app").classList.remove("is-active");
  });
});

".status-button:not(.open)".click(function () {
  document.getElementByClassName("pop-up").classList.add("visible");
});

".pop-up .close".click(function () {
  document.getElementByClassName("pop-up").classList.remove("visible");
});

const toggleButton = document.querySelector(".dark-light");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
