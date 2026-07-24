// Projects data — pulled from the vitorlima-vsl portfolio.
// Each card keeps the numbered/tagged card style with the hover button.
const projects = [
  {
    type: "LANDING PAGE",
    icon: "fa-globe",
    title: "Zdoc",
    desc: "Proposta de Landing Page da Zdoc.",
    tags: ["VUE", "TAILWIND", "TYPESCRIPT"],
    img: "img/zdoc.png",
    link: "https://zdoc-vitorlima-vsls-projects.vercel.app/",
  },
  {
    type: "WEB APP",
    icon: "fa-cart-shopping",
    title: "E-commerce",
    desc: "E-commerce em andamento, em conjunto com Anthony Aragão.",
    tags: ["VUE", "LARAVEL", "INERTIA", "PHP"],
    img: "img/e-commerce.png",
    link: "https://github.com/AnthonyAragao/e-commerce",
    featured: true,
  },
  {
    type: "WEB SITE",
    icon: "fa-briefcase",
    title: "Emprega+",
    desc: "Banco de Currículos e Cursos de uma cidade.",
    tags: ["TAILWIND", "CSS", "HTML"],
    img: "img/banco-de-curriculos.png",
    link: "https://empregamais.saocristovao.se.gov.br/",
    featured: true,
  },
  {
    type: "PORTAL",
    icon: "fa-window-restore",
    title: "Portal de Aplicações",
    desc: "Portal que apresenta as aplicações desenvolvidas e a equipe.",
    tags: ["VUE", "TAILWIND"],
    img: "img/inomeado.png",
    link: "https://ssa.saocristovao.se.gov.br/",
    featured: true,
  },
  {
    type: "SOCIAL",
    icon: "fa-hand-holding-heart",
    title: "Casa Feliz",
    desc: "Programa beneficente para ajudar famílias carentes.",
    tags: ["VUE", "LARAVEL", "API"],
    img: "img/casa-feliz.png",
    link: "https://casafeliz.saocristovao.se.gov.br/requisitos",
  },
  {
    type: "WEB APP",
    icon: "fa-file-lines",
    title: "Formulários",
    desc: "Front-end reativo a uma API de formulários, automatizando a criação de formulários.",
    tags: ["VUE", "API", "TAILWIND"],
    img: "img/formularios.png",
    link: "https://credenciamentodeambulante.saocristovao.se.gov.br/login",
  },
  {
    type: "FULLSTACK",
    icon: "fa-calendar-days",
    title: "Agenda",
    desc: "Projeto back-end e front-end 100% individual, estudo de Banco de Dados e Laravel.",
    tags: ["LARAVEL", "TAILWIND", "MYSQL"],
    img: "img/agenda.png",
    link: "https://github.com/vitorlima-vsl/agenda",
  },
  {
    type: "LANDING PAGE",
    icon: "fa-microchip",
    title: "Index Technology",
    desc: "Meu primeiro projeto — landing page de uma loja de eletrônicos.",
    tags: ["HTML", "CSS", "JAVASCRIPT"],
    img: "img/index_tec.svg",
    link: "https://vitorlima-vsl.github.io/index_technology/",
  },
  {
    type: "DASHBOARD",
    icon: "fa-table-columns",
    title: "Dashboard",
    desc: "Template-esqueleto para projetos com tabelas, formulários e gráficos.",
    tags: ["VUE", "TAILWIND"],
    img: "img/dashboard.svg",
    link: "https://github.com/vitorlima-vsl",
  },
  {
    type: "PORTFÓLIO",
    icon: "fa-user-astronaut",
    title: "Vitor Lima — VSL",
    desc: "Meu portfólio, onde apresento meus projetos e habilidades.",
    tags: ["HTML", "CSS", "JAVASCRIPT"],
    img: "img/vitorlima-vsl.png",
    link: "https://github.com/vitorlima-vsl",
  },
];

function projectCard(p, index) {
  const num = String(index + 1).padStart(2, "0");
  const tags = p.tags.map((t) => `<span>${t}</span>`).join("");
  return `
    <a href="${p.link}" target="_blank" rel="noopener" class="project__card">
      <div class="project__header">
        <div class="project__type">
          <span>${num}</span>
          <span>${p.type}</span>
        </div>
        <div class="project__icon">
          <i class="fa-solid ${p.icon}"></i>
        </div>
      </div>

      <div class="project__img">
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
      </div>

      <div class="project__text">
        <div class="project__title">${p.title}</div>
        <p class="project__desc">${p.desc}</p>
        <div class="project__tags">${tags}</div>
      </div>

      <div class="project__button">
        <div class="project__button-square"></div>
        <i class="fa-solid fa-play"></i>
        <span>VER PROJETO</span>
      </div>
    </a>
  `;
}

// Featured order requested: Portal de Aplicações, Emprega+, E-commerce
const featuredOrder = ["Portal de Aplicações", "Emprega+", "E-commerce"];
const featured = featuredOrder
  .map((t) => projects.find((p) => p.title === t))
  .filter(Boolean);

const featuredGrid = document.querySelector(".project__grid--featured");
const allGrid = document.querySelector(".project__grid--all");

if (featuredGrid) {
  featuredGrid.innerHTML = featured.map(projectCard).join("");
}
if (allGrid) {
  allGrid.innerHTML = projects.map(projectCard).join("");
}

// ---- toggle between featured view and full view (same page) ----
const featuredView = document.querySelector(".project__view--featured");
const allView = document.querySelector(".project__view--all");
const section = document.getElementById("projetos");

function scrollToProjects() {
  if (!section) return;
  const top = section.getBoundingClientRect().top + window.scrollY - 40;
  window.scrollTo({ top, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.getAttribute("data-action");
  if (action === "show-all") {
    featuredView.hidden = true;
    allView.hidden = false;
    scrollToProjects();
  } else if (action === "show-featured") {
    allView.hidden = true;
    featuredView.hidden = false;
    scrollToProjects();
  }
});
