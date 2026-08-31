// Seção de habilidades — abas dinâmicas no layout de cards.
const skills = {
  "front-end": [
    {
      icon: "fa-brands fa-vuejs",
      name: "Vue.js & Nuxt",
      feats: [
        { icon: "fa-solid fa-arrows-rotate", text: "SPAs Reativas" },
        { icon: "fa-solid fa-cube", text: "Componentização" },
      ],
    },
    {
      icon: "fa-brands fa-react",
      name: "React",
      feats: [
        { icon: "fa-solid fa-diagram-project", text: "Hooks e estado" },
        { icon: "fa-solid fa-bolt", text: "Componentes Modernos" },
      ],
    },
    {
      icon: "fa-brands fa-css3-alt",
      name: "Tailwind & CSS",
      feats: [
        { icon: "fa-solid fa-mobile-screen-button", text: "Responsividade" },
        { icon: "fa-solid fa-palette", text: "Sistema de design" },
      ],
    },
    {
      icon: "fa-brands fa-js",
      name: "JavaScript / TypeScript",
      feats: [
        { icon: "fa-solid fa-code", text: "Tipagem Forte" },
        { icon: "fa-solid fa-gears", text: "Lógica de Negócio" },
      ],
    },
  ],
  "back-end": [
    {
      icon: "fa-brands fa-laravel",
      name: "Laravel",
      feats: [
        { icon: "fa-solid fa-route", text: "APIs & Eloquent" },
        { icon: "fa-solid fa-shield-halved", text: "Auth & Segurança" },
      ],
    },
    {
      icon: "fa-brands fa-php",
      name: "PHP",
      feats: [
        { icon: "fa-solid fa-server", text: "Back-end Robusto" },
        { icon: "fa-solid fa-gear", text: "Automação" },
      ],
    },
    {
      icon: "fa-solid fa-database",
      name: "Banco de Dados",
      feats: [
        { icon: "fa-solid fa-table", text: "MySQL / SQL" },
        { icon: "fa-solid fa-diagram-project", text: "Modelagem" },
      ],
    },
    {
      icon: "fa-solid fa-plug",
      name: "Integração com APIs",
      feats: [
        { icon: "fa-solid fa-link", text: "REST & Inertia" },
        { icon: "fa-solid fa-arrows-turn-to-dots", text: "Conectividade" },
      ],
    },
  ],
  mobile: [
    {
      icon: "fa-brands fa-react",
      name: "React Native & Expo",
      feats: [
        { icon: "fa-solid fa-mobile-screen", text: "Apps Cross-Platform" },
        { icon: "fa-solid fa-cubes-stacked", text: "Build com Expo" },
      ],
    },
    {
      icon: "fa-solid fa-mobile-screen-button",
      name: "Layouts Mobile",
      feats: [
        { icon: "fa-solid fa-hand-pointer", text: "UX para toque" },
        { icon: "fa-solid fa-expand", text: "Telas Adaptáveis" },
      ],
    },
    {
      icon: "fa-solid fa-plug-circle-bolt",
      name: "Consumo de APIs",
      feats: [
        { icon: "fa-solid fa-cloud-arrow-down", text: "Dados em Tempo Real" },
        { icon: "fa-solid fa-key", text: "Autenticação mobile" },
      ],
    },
  ],
  design: [
    {
      icon: "fa-solid fa-fingerprint",
      name: "UI / UX Design",
      feats: [
        { icon: "fa-solid fa-wand-magic-sparkles", text: "Interfaces Modernas" },
        { icon: "fa-solid fa-lightbulb", text: "Foco na Intuitividade" },
      ],
    },
    {
      icon: "fa-brands fa-figma",
      name: "Prototipagem",
      feats: [
        { icon: "fa-solid fa-object-group", text: "Figma & Canva" },
        { icon: "fa-solid fa-ruler-combined", text: "Wireframes" },
      ],
    },
    {
      icon: "fa-solid fa-paintbrush",
      name: "Direção de Arte",
      feats: [
        { icon: "fa-solid fa-swatchbook", text: "Identidade Visual" },
        { icon: "fa-solid fa-eye", text: "Hierarquia & Contraste" },
      ],
    },
  ],
};

function skillCard(s) {
  const feats = s.feats
    .map(
      (f) => `
      <div class="services__feat">
        <i class="${f.icon}"></i>
        <span>${f.text}</span>
      </div>`
    )
    .join("");
  return `
    <div class="services__card">
      <div class="services__icon">
        <i class="${s.icon}"></i>
      </div>
      <div class="services__name">${s.name}</div>
      <div class="services__feats">${feats}</div>
    </div>`;
}

function handleService(type) {
  const body = document.querySelector(".services__main");
  if (!body) return;
  const list = skills[type] || [];
  body.innerHTML = list.map(skillCard).join("");
}

const servicesButtons = document.querySelectorAll(".services__button");

servicesButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");

    servicesButtons.forEach((b) =>
      b.classList.remove("services__button--active")
    );
    btn.classList.add("services__button--active");

    handleService(type);
  });
});

// Renderiza a aba ativa ao carregar a página
const initial =
  document.querySelector(".services__button--active")?.getAttribute("data-type") ||
  "front-end";
handleService(initial);
