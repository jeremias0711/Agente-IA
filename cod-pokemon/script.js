/* ============================================================
   Carta holográfica interactiva
   ============================================================
   Lógica de seguimiento del puntero adaptada del repositorio
   open-source "pokemon-cards-css" de @simeydotme (licencia MIT):
   https://github.com/simeydotme/pokemon-cards-css

   El original usa Svelte + "springs" para suavizar el movimiento.
   Aquí se reimplementa en JavaScript puro: se leen las coordenadas
   del puntero, se convierten en variables CSS y las transiciones
   CSS (ver styles.css, seccion 4) hacen el suavizado.
============================================================ */

(function () {
  "use strict";

  // --- helpers matemáticos (idénticos a los del repo) ---------
  const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
  const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
  const adjust = (value, fromMin, fromMax, toMin, toMax) =>
    round(toMin + (toMax - toMin) * (value - fromMin) / (fromMax - fromMin));

  const backdrop = document.querySelector(".holo-backdrop");

  document.querySelectorAll(".card.interactive").forEach((card) => {
    const rotator = card.querySelector(".card__rotator");
    if (!rotator) return;

    let rafId = null;

    // Escribe las variables dinámicas en el elemento .card
    const setVars = (vars) => {
      for (const key in vars) card.style.setProperty(key, vars[key]);
    };

    const interact = (e) => {
      const point = e.touches ? e.touches[0] : e;
      const rect = rotator.getBoundingClientRect();

      const absolute = {
        x: point.clientX - rect.left,
        y: point.clientY - rect.top,
      };
      const percent = {
        x: clamp(round((100 / rect.width) * absolute.x)),
        y: clamp(round((100 / rect.height) * absolute.y)),
      };
      const center = { x: percent.x - 50, y: percent.y - 50 };

      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.classList.add("interacting");
        setVars({
          "--pointer-x": percent.x + "%",
          "--pointer-y": percent.y + "%",
          "--pointer-from-center": clamp(
            Math.hypot(percent.y - 50, percent.x - 50) / 50,
            0,
            1
          ),
          "--pointer-from-top": percent.y / 100,
          "--pointer-from-left": percent.x / 100,
          "--card-opacity": "1",
          "--rotate-x": round(-(center.x / 3.5)) + "deg",
          "--rotate-y": round(center.y / 3.5) + "deg",
          "--background-x": adjust(percent.x, 0, 100, 37, 63) + "%",
          "--background-y": adjust(percent.y, 0, 100, 33, 67) + "%",
        });
        rafId = null;
      });
    };

    const interactEnd = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      card.classList.remove("interacting");
      // Al quitar las propiedades, cada variable vuelve a su valor
      // por defecto definido en .card { ... } (styles.css)
      [
        "--pointer-x",
        "--pointer-y",
        "--pointer-from-center",
        "--pointer-from-top",
        "--pointer-from-left",
        "--card-opacity",
        "--rotate-x",
        "--rotate-y",
        "--background-x",
        "--background-y",
      ].forEach((v) => card.style.removeProperty(v));
    };

    // --- clic: ampliar / reducir la carta ---------------------
    const toggleActive = () => {
      const willActivate = !card.classList.contains("active");
      document
        .querySelectorAll(".card.active")
        .forEach((c) => c.classList.remove("active"));
      card.classList.toggle("active", willActivate);
      if (backdrop) {
        backdrop.hidden = false;
        backdrop.classList.toggle("is-visible", willActivate);
      }
    };

    const closeActive = () => {
      card.classList.remove("active");
      if (backdrop) backdrop.classList.remove("is-visible");
    };

    rotator.addEventListener("pointermove", interact);
    rotator.addEventListener("pointerleave", interactEnd);
    rotator.addEventListener("touchmove", interact, { passive: true });
    rotator.addEventListener("touchend", interactEnd);
    rotator.addEventListener("click", toggleActive);

    if (backdrop) backdrop.addEventListener("click", closeActive);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeActive();
    });
  });
})();
