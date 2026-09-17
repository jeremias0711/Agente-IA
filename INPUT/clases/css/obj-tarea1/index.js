// Fuente de datos: un arreglo de objetos, uno por auto de la saga
// Rápidos y Furiosos. Todos comparten la misma forma (las mismas
// propiedades) para que crearFichaAuto() pueda dibujar cualquiera de
// ellos con el mismo template. Cada objeto mezcla texto, números,
// booleanos y un arreglo (mods), tal como pide el ejercicio.
let autos = [
    {
        nombre: "Toyota Supra MK4",
        conductor: "Brian O'Conner",
        pelicula: "The Fast and the Furious (2001)",
        año: 1994,
        potencia: 900,
        velocidadMax: 330,
        precioEstimado: "USD 100.000 (modificado)",
        image: "images/01-toyota-supra-mk4.jpg",
        descripcion: "El auto icónico de Brian, un tuner japonés modificado hasta el límite para la carrera final contra Dom.",
        robado: false,
        sobrealimentado: true,
        tipo: "Sport compacto (JDM)",
        color: "Naranja Fénix",
        motor: "2JZ-GTE Inline-6 Twin Turbo",
        origen: "Japón",
        escena: "Carrera de cuarto de milla final contra el Charger de Dom",
        equipo: "Equipo de Brian",
        estado: "Destruido",
        mods: ["Turbo doble", "Nitro NOS", "Spoiler de fibra de carbono", "Kit de carrocería APR", "Llantas Racing Hart"],
    },
    {
        nombre: "Dodge Charger R/T 1970",
        conductor: "Dominic Toretto",
        pelicula: "The Fast and the Furious (2001)",
        año: 1970,
        potencia: 900,
        velocidadMax: 210,
        precioEstimado: "USD 250.000 (restaurado)",
        image: "images/02-dodge-charger-rt-1970.jpg",
        descripcion: "El muscle car insignia de Dom, heredado de su padre, protagonista de la carrera final.",
        robado: false,
        sobrealimentado: true,
        tipo: "Muscle car",
        color: "Negro mate",
        motor: "426 HEMI V8 + NOS",
        origen: "Estados Unidos",
        escena: "Carrera final de cuarto de milla; vuelca tras el impacto",
        equipo: "Equipo de Dom",
        estado: "Reconstruido",
        mods: ["Sistema NOS doble", "Motor 426 HEMI", "Suspensión reforzada", "Llantas American Racing"],
    },
    {
        nombre: "Nissan Skyline GT-R R34",
        conductor: "Brian O'Conner",
        pelicula: "2 Fast 2 Furious (2003)",
        año: 1999,
        potencia: 620,
        velocidadMax: 300,
        precioEstimado: "USD 80.000 (modificado)",
        image: "images/03-nissan-skyline-r34.jpg",
        descripcion: "El icónico GT-R azul eléctrico que Brian conduce tras dejar el FBI.",
        robado: false,
        sobrealimentado: true,
        tipo: "Sport compacto (JDM)",
        color: "Azul eléctrico",
        motor: "RB26DETT Twin Turbo I6",
        origen: "Japón",
        escena: "Persecución policial inicial en las calles de Miami",
        equipo: "Independiente",
        estado: "Activo",
        mods: ["Turbos gemelos", "Body kit aerodinámico", "Nitro", "Llantas Racing Titan"],
    },
    {
        nombre: "Chevrolet Chevelle SS 1970",
        conductor: "Letty Ortiz",
        pelicula: "Fast & Furious (2009)",
        año: 1970,
        potencia: 450,
        velocidadMax: 190,
        precioEstimado: "USD 60.000",
        image: "images/04-chevrolet-chevelle-ss-1970.webp",
        descripcion: "El muscle car de Letty, símbolo de su independencia dentro del equipo de Dom.",
        robado: false,
        sobrealimentado: false,
        tipo: "Muscle car",
        color: "Negro",
        motor: "454 Big Block V8",
        origen: "Estados Unidos",
        escena: "Carreras clandestinas en República Dominicana",
        equipo: "Equipo de Dom",
        estado: "Activo",
        mods: ["Motor Big Block", "Escape dual", "Llantas cromadas"],
    },
    {
        nombre: "Mazda RX-7 FD (Han)",
        conductor: "Han Seoul-Oh",
        pelicula: "Tokyo Drift (2006)",
        año: 1997,
        potencia: 480,
        velocidadMax: 280,
        precioEstimado: "USD 38.000 (modificado)",
        image: "images/05-mazda-rx7-han-tokyo-drift.jpg",
        descripcion: "El RX-7 naranja y negro de Han, con kit VeilSide, protagonista del drift en las calles de Tokio.",
        robado: false,
        sobrealimentado: true,
        tipo: "Sport compacto (JDM)",
        color: "Naranja y negro",
        motor: "13B-REW Rotativo Twin Turbo",
        origen: "Japón",
        escena: "Carreras de drift en las montañas y calles de Tokio",
        equipo: "Equipo de Han",
        estado: "Destruido",
        mods: ["Kit de carrocería VeilSide", "Suspensión para drift", "Llantas Work Meister", "Turbo de gran tamaño"],
    },
    {
        nombre: "Ford Gran Torino Sport 1972",
        conductor: "Fenix Rise",
        pelicula: "Fast & Furious (2009)",
        año: 1972,
        potencia: 400,
        velocidadMax: 210,
        precioEstimado: "USD 55.000 (modificado)",
        image: "images/06-ford-gran-torino-sport.webp",
        descripcion: "El único auto que corre con nitrometano en el túnel de contrabando de la frontera; lo conduce el villano Fenix.",
        robado: false,
        sobrealimentado: true,
        tipo: "Muscle car",
        color: "Verde",
        motor: "V8 con inyección de nitrometano",
        origen: "Estados Unidos",
        escena: "Persecución por el túnel de contrabando en la frontera México-Estados Unidos",
        equipo: "Contrabandistas de Braga",
        estado: "Activo",
        mods: ["Inyección de nitrometano", "Suspensión reforzada", "Llantas todoterreno"],
    },
    {
        nombre: "Mitsubishi Eclipse Spyder",
        conductor: "Roman Pearce",
        pelicula: "2 Fast 2 Furious (2003)",
        año: 2003,
        potencia: 420,
        velocidadMax: 250,
        precioEstimado: "USD 40.000 (modificado)",
        image: "images/07-mitsubishi-eclipse-spyder.jpg",
        descripcion: "El convertible rosa que Roman reclama para sí, con un sistema NOS que se activa con un beso, protagonista de las calles de Miami.",
        robado: false,
        sobrealimentado: true,
        tipo: "Sport compacto convertible (import)",
        color: "Rosa lila",
        motor: "V6 modificado con NOS",
        origen: "Estados Unidos",
        escena: "Carreras callejeras de Miami junto a Brian y Tej",
        equipo: "Equipo de Roman",
        estado: "Activo",
        mods: ["NOS activado por beso", "Pintura personalizada", "Llantas cromadas", "Sistema de audio personalizado"],
    },
    {
        nombre: "Mazda RX-7 FD",
        conductor: "Dominic Toretto",
        pelicula: "The Fast and the Furious (2001)",
        año: 1993,
        potencia: 500,
        velocidadMax: 290,
        precioEstimado: "USD 35.000 (modificado)",
        image: "images/08-mazda-rx7-fd.jpg",
        descripcion: "El primer auto de Dom en la saga, con motor rotativo modificado.",
        robado: false,
        sobrealimentado: true,
        tipo: "Sport compacto (JDM)",
        color: "Rojo",
        motor: "13B-REW Rotativo Twin Turbo",
        origen: "Japón",
        escena: "Primera carrera callejera contra Brian",
        equipo: "Equipo de Dom",
        estado: "Destruido",
        mods: ["Motor rotativo modificado", "Turbo doble", "Kit de carrocería"],
    },
    {
        nombre: "Lykan Hypersport",
        conductor: "Equipo de Dom",
        pelicula: "Furious 7 (2015)",
        año: 2014,
        potencia: 750,
        velocidadMax: 390,
        precioEstimado: "USD 3.400.000",
        image: "images/09-lykan-hypersport.webp",
        descripcion: "Superdeportivo usado para el salto entre las tres Torres Etihad en Abu Dabi.",
        robado: true,
        sobrealimentado: true,
        tipo: "Hiperdeportivo",
        color: "Dorado y negro",
        motor: "3.7L Flat-6 Biturbo",
        origen: "Emiratos Árabes Unidos (W Motors)",
        escena: "Salto entre las Torres Etihad en Abu Dabi",
        equipo: "Equipo de Dom",
        estado: "Activo",
        mods: ["Faros con diamantes incrustados", "Pantalla holográfica", "Aerodinámica de fibra de carbono"],
    },
];

// Comprobaciones rápidas en consola: cuántos autos hay y cómo se accede
// a un elemento del arreglo (autos[0]) y a una propiedad anidada (mods[1]).
console.log(autos.length);
console.log(autos[0].nombre);
console.log(autos[0].mods[1]);

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

// Recorre TODO el arreglo de autos, genera el HTML de cada uno
// (crearFichaAuto) y lo mete de una sola vez dentro de #garage.
function renderAutos(autos) {
    const garage = document.getElementById("garage");
    garage.innerHTML = autos.map((auto, i) => crearFichaAuto(auto, i)).join("");
}

// Dispara el render apenas carga el script: sin esta llamada
// el garage se quedaría vacío.
renderAutos(autos);

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
    const auto = autos[index];
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

// Cerrar también con la tecla Escape.
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarCarta();
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
