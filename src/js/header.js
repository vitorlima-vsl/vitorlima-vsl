const header = document.querySelector(".header");
const toggle = document.querySelector(".header__toggle");
const nav = document.querySelector("#header-nav");

if (header && toggle && nav) {
  const icon = toggle.querySelector("i");

  const setMenuOpen = (open) => {
    header.classList.toggle("header--open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");

    if (icon) {
      icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }

    document.body.classList.toggle("menu-open", open);
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(!header.classList.contains("header--open"));
  });

  nav.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      header.classList.contains("header--open") &&
      !header.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  });

  window.matchMedia("(min-width: 1025px)").addEventListener("change", (event) => {
    if (event.matches) {
      setMenuOpen(false);
    }
  });
}
