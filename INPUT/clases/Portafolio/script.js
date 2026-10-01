// ============================================
// Jeremías Gutiérrez — Portafolio
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroRoles();
  initScrollReveal();
  initActiveNav();
  initToTop();
});

/* ---------- Mobile menu (hamburguesa + panel lateral arrastrable) ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const panel = document.getElementById("menuPanel");
  if (!toggle || !menu || !panel) return;

  const open = () => {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    panel.style.transform = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("is-open");
    isOpen ? close() : open();
  });

  menu.addEventListener("click", (e) => {
    if (e.target === menu) close();
  });

  menu.querySelectorAll(".menu__link, .menu__sub a").forEach((link) => {
    link.addEventListener("click", close);
  });

  // Swipe-to-close (arrastre horizontal del panel)
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  panel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    dragging = true;
    panel.style.transition = "none";
  }, { passive: true });

  panel.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    currentX = e.touches[0].clientX - startX;
    if (currentX > 0) {
      panel.style.transform = `translateX(${currentX}px)`;
    }
  }, { passive: true });

  panel.addEventListener("touchend", () => {
    dragging = false;
    panel.style.transition = "";
    const panelWidth = panel.offsetWidth;
    if (currentX > panelWidth * 0.3) {
      close();
    } else {
      panel.style.transform = "";
    }
    currentX = 0;
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------- Hero: roles rotativos (slider de texto) ---------- */
function initHeroRoles() {
  const roles = document.querySelectorAll(".hero__role");
  if (!roles.length) return;
  let index = 0;
  setInterval(() => {
    roles[index].classList.remove("is-active");
    index = (index + 1) % roles.length;
    roles[index].classList.add("is-active");
  }, 2600);
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- Nav activo según sección visible ---------- */
function initActiveNav() {
  const sections = ["index", "works", "studio", "archive", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const links = document.querySelectorAll(".nav__link[data-section]");
  if (!sections.length || !links.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Botón volver arriba ---------- */
function initToTop() {
  const btn = document.getElementById("toTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 700);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
