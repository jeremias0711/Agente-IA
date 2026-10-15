// Los datos (el arreglo "autos") vienen de data.js, que se carga antes
// que este archivo en index.html. Es el mismo arreglo que edita gestion.html.

// Comprobaciones rápidas en consola: cuántos autos hay y cómo se accede
// a un elemento del arreglo (autos[0]) y a una propiedad anidada (mods[1]).
console.log(autos.length);
if (autos.length > 0) {
    console.log(autos[0].nombre);
    console.log(autos[0].mods[1]);
}

// Recibe UN objeto auto y devuelve el HTML (como string) de su ficha.
// Cada propiedad se coloca en su propia etiqueta en vez de mezclarse
// todo en un solo texto, igual que en el patrón de la clase.
function crearFichaAuto(auto, index, extraClass = "") {
    // mods es un arreglo de strings -> lo convertimos en una lista de <li>.
    // map() transforma cada mod en un <li>...</li>, join("") une todo sin separador.
    const modsHtml = auto.mods.map(mod => `<li>${mod}</li>`).join("");

    // La ficha de potencia usa un degradado cónico (conic-gradient) como
    // velocímetro: --gauge define qué porcentaje del círculo se pinta.
    // Tomamos la potencia sobre un techo de 1000 HP para sacar ese porcentaje.
    const gauge = Math.min(100, Math.round((auto.potencia / 1000) * 100));

    // La cinta "ROBADO" solo se agrega al HTML si auto.robado es true
    // (propiedad booleana controlando qué se renderiza).
    const ribbonHtml = auto.robado ? `<span class="card__ribbon">Robado</span>` : "";

    // data-index identifica qué auto del arreglo es esta carta, para poder
    // recuperarlo al hacer click y mostrarlo expandido en abrirCarta().
    const claseCard = extraClass ? `card ${extraClass}` : "card";

    // Template literal (backticks) para armar el HTML de la carta,
    // insertando los valores del objeto con ${...}.
    return `
        <div class="${claseCard}" data-index="${index}">
            ${ribbonHtml}

            <div class="card__media">
                <img class="card__image" src="${auto.image}" alt="${auto.nombre}">
                <div class="card__power-badge" style="--gauge: ${gauge}%">
                    <div class="card__power-badge-inner">
                        <span class="card__power-value">${auto.potencia}</span>
                        <span class="card__power-label">HP</span>
                    </div>
                </div>
            </div>

            <div class="card__stripe">
                <span class="card__name">${auto.nombre}</span>
                <span class="card__driver">${auto.conductor}</span>
            </div>

            <dl class="card__quickstats">
                <div class="card__quickstat">
                    <dt>Tipo</dt>
                    <dd>${auto.tipo}</dd>
                </div>
                <div class="card__quickstat">
                    <dt>Año</dt>
                    <dd>${auto.año}</dd>
                </div>
                <div class="card__quickstat">
                    <dt>Vel. máx</dt>
                    <dd>${auto.velocidadMax} km/h</dd>
                </div>
            </dl>

            <dl class="card__specs">
                <div class="card__spec-line">
                    <dt>Motor</dt>
                    <dd>${auto.motor}</dd>
                </div>
                <div class="card__spec-line">
                    <dt>Color</dt>
                    <dd>${auto.color}</dd>
                </div>
                <div class="card__spec-line">
                    <dt>Origen</dt>
                    <dd>${auto.origen}</dd>
                </div>
                <div class="card__spec-line">
                    <dt>Precio est.</dt>
                    <dd>${auto.precioEstimado}</dd>
                </div>
                <div class="card__spec-line">
                    <dt>Escena clave</dt>
                    <dd>${auto.escena}</dd>
                </div>
            </dl>

            <p class="card__desc">${auto.descripcion}</p>

            <span class="card__mods-label">Modificaciones</span>
            <ul class="card__mods">${modsHtml}</ul>

            <div class="card__footer">
                <span class="card__footer-pelicula">${auto.pelicula}</span>
                <span class="card__footer-meta">${auto.equipo} · ${auto.estado}</span>
            </div>
        </div>
    `;
}

// Última lista pintada en el grid. abrirCarta() busca aquí el auto
// clicado, porque data-index es su posición en ESTA lista (que puede
// ser filtrada u ordenada), no en el arreglo completo de data.js.
let objetosRenderizados = [];

// Recibe cualquier arreglo de autos y es la única responsable de
// pintarlos en #garage. Primero vacía el grid, así se puede llamar
// varias veces sin duplicar tarjetas, y luego agrega una ficha por
// objeto reutilizando crearFichaAuto().
function renderizarObjetos(listaObjetos) {
    const garage = document.getElementById("garage");
    garage.innerHTML = "";
    objetosRenderizados = listaObjetos;
    listaObjetos.forEach((objeto, i) => {
        garage.insertAdjacentHTML("beforeend", crearFichaAuto(objeto, i));
    });
}

// Dispara el render apenas carga el script: sin esta llamada
// el garage se quedaría vacío.
renderizarObjetos(autos);

// --- Filtros: autos robados + velocidad máxima ---

// Los dos filtros se combinan: una carta se muestra solo si cumple ambos.
// Cada vez que cambia uno, aplicarFiltros() vuelve a pintar con
// renderizarObjetos() la lista resultante.
const btnFiltroRobados = document.getElementById("filtro-robados");
const filtroContador = document.getElementById("filtro-contador");
const sliderVelocidad = document.getElementById("slider-velocidad");
const valorVelocidad = document.getElementById("valor-velocidad");
const selectDueno = document.getElementById("filtro-dueno");
let soloRobados = false;

// Las opciones del select salen de los datos: un dueño (conductor) por
// opción, sin repetidos y en orden alfabético. La opción "Todos" (value "")
// ya viene escrita en index.html.
const duenos = [...new Set(autos.map(auto => auto.conductor))].sort();
duenos.forEach(dueno => {
    const opcion = document.createElement("option");
    opcion.value = dueno;
    opcion.textContent = dueno;
    selectDueno.appendChild(opcion);
});

// El rango del slider sale de los propios datos: va desde la velocidad
// más baja hasta la más alta del garage, así nunca queda fuera ningún auto.
const velocidades = autos.map(auto => auto.velocidadMax);
sliderVelocidad.min = velocidades.length ? Math.min(...velocidades) : 0;
sliderVelocidad.max = velocidades.length ? Math.max(...velocidades) : 0;
sliderVelocidad.value = sliderVelocidad.min;

function aplicarFiltros() {
    const velocidadMinima = Number(sliderVelocidad.value);
    const duenoElegido = selectDueno.value;
    const lista = autos.filter(auto =>
        (!soloRobados || auto.robado) &&
        auto.velocidadMax >= velocidadMinima &&
        (duenoElegido === "" || auto.conductor === duenoElegido)
    );
    renderizarObjetos(lista);

    btnFiltroRobados.textContent = soloRobados ? "Mostrar todos" : "🚨 Solo robados";
    btnFiltroRobados.setAttribute("aria-pressed", soloRobados);
    btnFiltroRobados.classList.toggle("filtro-btn--activo", soloRobados);
    valorVelocidad.textContent = `≥ ${velocidadMinima} km/h`;
    filtroContador.textContent = `${lista.length} de ${autos.length} autos`;

    // "Limpiar filtros" solo se puede usar si hay algún filtro activo.
    const hayFiltros = soloRobados || sliderVelocidad.value !== sliderVelocidad.min || duenoElegido !== "";
    document.getElementById("limpiar-filtros").disabled = !hayFiltros;
}

btnFiltroRobados.addEventListener("click", () => {
    soloRobados = !soloRobados;
    aplicarFiltros();
});

// "input" se dispara en cada movimiento del slider (no solo al soltarlo),
// así las cartas se actualizan mientras se arrastra.
sliderVelocidad.addEventListener("input", aplicarFiltros);

selectDueno.addEventListener("change", aplicarFiltros);

// Devuelve los tres filtros a su estado inicial (que no filtra nada)
// y vuelve a pintar: así se ven todos los autos otra vez.
const btnLimpiarFiltros = document.getElementById("limpiar-filtros");

btnLimpiarFiltros.addEventListener("click", () => {
    soloRobados = false;
    sliderVelocidad.value = sliderVelocidad.min;
    selectDueno.value = "";
    aplicarFiltros();
});

aplicarFiltros();

// --- Expandir carta al hacer click ---

// Overlay fijo (se crea una sola vez y se reutiliza) donde se muestra la
// carta seleccionada en el centro de la pantalla, con las demás difuminadas
// detrás gracias al backdrop-filter definido en styles.css.
const cardOverlay = document.createElement("div");
cardOverlay.className = "card-overlay";
document.body.appendChild(cardOverlay);

// --- Animación de "carrera" antes de abrir la ficha ---

// Capa fija (se crea una sola vez) donde corre el auto de izquierda a
// derecha con su rastro de polvo, antes de que aparezca la ficha ampliada.
const raceOverlay = document.createElement("div");
raceOverlay.className = "race-intro";
raceOverlay.innerHTML = `<div class="race-intro__road"></div>`;
document.body.appendChild(raceOverlay);

// Anima el auto cruzando la pantalla y llama a onFinish() cuando termina,
// que es quien realmente abre la ficha ampliada.
function lanzarAnimacionCarrera(onFinish) {
    // Por si quedó algo de un click anterior, se limpia antes de empezar.
    raceOverlay.querySelectorAll(".race-intro__car, .race-intro__dust").forEach(el => el.remove());

    // La animación siempre usa la misma imagen (un auto haciendo burnout),
    // sin importar cuál tarjeta se haya abierto: es solo el efecto visual
    // de "arrancando a toda velocidad" antes de mostrar la ficha real.
    const carImg = document.createElement("img");
    carImg.className = "race-intro__car";
    carImg.src = "images/race-burnout-charger.png";
    carImg.alt = "Auto acelerando";
    raceOverlay.appendChild(carImg);
    raceOverlay.classList.add("race-intro--visible");
    document.body.classList.add("no-scroll");

    const duracionMs = 1100;
    const numPuffs = 7;

    // El auto (definido en CSS con @keyframes race-across) recorre de
    // -35% a 115% del ancho de pantalla. Cada nube de polvo se crea en
    // el punto horizontal donde va el auto en ese instante, simulando
    // que las ruedas levantan tierra al pasar.
    for (let i = 1; i <= numPuffs; i++) {
        setTimeout(() => {
            const dust = document.createElement("span");
            dust.className = "race-intro__dust";
            const progreso = i / (numPuffs + 1);
            const leftPercent = -35 + progreso * (115 - -35);
            dust.style.left = `calc(${leftPercent}% - 12px)`;
            raceOverlay.appendChild(dust);
            // Cada nube se elimina sola cuando termina su propia animación.
            dust.addEventListener("animationend", () => dust.remove());
        }, (duracionMs / (numPuffs + 1)) * i);
    }

    // Cuando el auto termina de cruzar la pantalla, se oculta esta capa
    // y recién ahí se muestra la ficha ampliada.
    setTimeout(() => {
        raceOverlay.classList.remove("race-intro--visible");
        carImg.remove();
        onFinish();
    }, duracionMs);
}

function abrirCarta(index) {
    const auto = objetosRenderizados[index];
    lanzarAnimacionCarrera(() => {
        cardOverlay.innerHTML = `
            <button class="card-overlay__close" aria-label="Cerrar">✕</button>
            ${crearFichaAuto(auto, index, "card--expanded")}
        `;
        cardOverlay.classList.add("card-overlay--visible");
    });
}

function cerrarCarta() {
    cardOverlay.classList.remove("card-overlay--visible");
    document.body.classList.remove("no-scroll");
}

// Delegación de eventos: un solo listener en #garage detecta el click
// en cualquier carta (actual o futura) y busca su índice en data-index.
document.getElementById("garage").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    abrirCarta(Number(card.dataset.index));
});

// Cerrar al hacer click fuera de la carta (el fondo difuminado) o en la ✕.
cardOverlay.addEventListener("click", (e) => {
    if (e.target === cardOverlay || e.target.closest(".card-overlay__close")) {
        cerrarCarta();
    }
});

// --- Juego dentro del garage ---

// El botón 🎮 abre game.html dentro de un iframe en una ventana sobre las
// cartas. El src se asigna solo la primera vez: al cerrar y volver a abrir,
// el juego sigue donde estaba (no se pierde el registro del jugador).
const juegoModal = document.getElementById("juego-modal");
const juegoIframe = document.getElementById("juego-iframe");

// Llama a una función de memoria.js dentro del iframe (si ya cargó).
// El iframe es del mismo sitio, así que se puede acceder a su window.
function avisarAlJuego(nombreFuncion) {
    const ventanaJuego = juegoIframe.contentWindow;
    if (ventanaJuego && typeof ventanaJuego[nombreFuncion] === "function") {
        ventanaJuego[nombreFuncion]();
    }
}

function abrirJuego() {
    if (!juegoIframe.src) juegoIframe.src = "game.html";
    juegoModal.hidden = false;
    document.body.classList.add("no-scroll");
    avisarAlJuego("reanudarMemoria");
}

// Al cerrar la ventana, el cronómetro del juego se pausa.
function cerrarJuego() {
    juegoModal.hidden = true;
    document.body.classList.remove("no-scroll");
    avisarAlJuego("pausarMemoria");
}

document.getElementById("btn-juego").addEventListener("click", abrirJuego);
document.getElementById("juego-cerrar").addEventListener("click", cerrarJuego);

// Click en el fondo oscuro (fuera de la caja) también cierra.
juegoModal.addEventListener("click", (e) => {
    if (e.target === juegoModal) cerrarJuego();
});

// Cerrar también con la tecla Escape (la carta ampliada o el juego).
document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    cerrarCarta();
    if (!juegoModal.hidden) cerrarJuego();
});

// --- Modo oscuro ---

// Cambia el tema de toda la página: pone data-theme="light"/"dark" en <html>
// (styles.css usa ese atributo para elegir la paleta de colores),
// actualiza el ícono del botón y guarda la elección para la próxima visita.
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("theme-toggle").textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
}

// Al cargar la página: si el usuario ya eligió un tema antes, se usa ese
// (queda guardado en localStorage); si no, se respeta la preferencia
// del sistema operativo/navegador (prefers-color-scheme).
const themeGuardado = localStorage.getItem("theme");
const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(themeGuardado || (prefiereOscuro ? "dark" : "light"));

// Cada clic en el botón invierte el tema actual (claro <-> oscuro).
document.getElementById("theme-toggle").addEventListener("click", () => {
    const actual = document.documentElement.getAttribute("data-theme");
    setTheme(actual === "dark" ? "light" : "dark");
});
