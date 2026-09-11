// Fuente de datos: un arreglo de objetos, uno por personaje.
// Todos comparten la misma forma (las mismas propiedades) para que
// crearFichaHeroe() pueda dibujar cualquiera de ellos con el mismo template.
let heroes = [
    {
        nombre: "Spider-man",
        alterEgo: "Peter Parker",
        poderes: [
            "⚠️ Sentido arácnido",
            "🧗 Trepar paredes",
            "💪 Fuerza sobrehumana",
            "🤸 Agilidad y equilibrio sobrehumanos",
            "⚡ Reflejos sobrehumanos",
            "🛡️ Resistencia sobrehumana",
            "🩹 Factor de curación acelerado",
            "🕸️ Lanzatelarañas",
            "✊ Fuerza de agarre sobrehumana",
        ],
        descripcion: "Un superhéroe con habilidades arácnidas que lucha contra el crimen en Nueva York.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/3/35/Amazing_Fantasy_15.jpg",
        edad: 18,
        fuerza: 85,
        altura: "1.78 m",
        peso: "76 kg",
        origen: "Nueva York, Estados Unidos",
        primeraAparicion: "Amazing Fantasy #15 (1962)",
        editorial: "Marvel Comics",
        universo: "Marvel",
        equipo: "Los Vengadores",
        debilidad: "Gas y ácidos corrosivos",
        estado: "Activo",
    },
    {
        nombre: "Iron Man",
        alterEgo: "Tony Stark",
        poderes: [
            "🛡️ Armadura de titanio-oro",
            "✈️ Vuelo propulsado",
            "🔫 Repulsores de energía",
            "🧠 Inteligencia genio",
            "🤖 Control de inteligencia artificial",
        ],
        descripcion: "Un genio multimillonario que usa una armadura tecnológica para proteger al mundo.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png",
        edad: 48,
        fuerza: 75,
        altura: "1.85 m",
        peso: "102 kg (con armadura)",
        origen: "Malibú, Estados Unidos",
        primeraAparicion: "Tales of Suspense #39 (1963)",
        editorial: "Marvel Comics",
        universo: "Marvel",
        equipo: "Los Vengadores",
        debilidad: "Dependencia de la tecnología y el reactor arc",
        estado: "Activo",
    },
    {
        nombre: "Batman",
        alterEgo: "Bruce Wayne",
        poderes: [
            "🧠 Detective genio",
            "🥋 Artes marciales",
            "🦇 Sigilo e intimidación",
            "🛠️ Gadgets tecnológicos",
            "💰 Recursos ilimitados",
        ],
        descripcion: "Un vigilante que protege Gotham City usando su intelecto, disciplina y tecnología, sin poderes sobrehumanos.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/c/c7/Batman_Infobox.jpg",
        edad: 40,
        fuerza: 55,
        altura: "1.88 m",
        peso: "95 kg",
        origen: "Gotham City, Estados Unidos",
        primeraAparicion: "Detective Comics #27 (1939)",
        editorial: "DC Comics",
        universo: "DC",
        equipo: "Liga de la Justicia",
        debilidad: "Es completamente humano, sin poderes",
        estado: "Activo",
    },
    {
        nombre: "Wonder Woman",
        alterEgo: "Diana Prince",
        poderes: [
            "💪 Fuerza sobrehumana",
            "🛡️ Brazaletes indestructibles",
            "🪢 Lazo de la verdad",
            "✈️ Vuelo",
            "⚔️ Maestría en combate",
        ],
        descripcion: "Princesa amazona y guerrera semidiosa que lucha por la paz y la justicia.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/6/6b/Wonder_Woman_750.jpg",
        edad: 30,
        fuerza: 90,
        altura: "1.83 m",
        peso: "74 kg",
        origen: "Themyscira",
        primeraAparicion: "All Star Comics #8 (1941)",
        editorial: "DC Comics",
        universo: "DC",
        equipo: "Liga de la Justicia",
        debilidad: "Puede ser controlada si atan juntos sus propios brazaletes",
        estado: "Activo",
    },
    {
        nombre: "Superman",
        alterEgo: "Clark Kent",
        poderes: [
            "💪 Fuerza sobrehumana",
            "✈️ Vuelo",
            "👁️ Visión de calor",
            "❄️ Aliento helado",
            "🦴 Invulnerabilidad",
        ],
        descripcion: "Último hijo de Krypton, protector de la Tierra con poderes casi ilimitados bajo el sol amarillo.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png",
        edad: 35,
        fuerza: 100,
        altura: "1.91 m",
        peso: "107 kg",
        origen: "Krypton / Smallville, Kansas",
        primeraAparicion: "Action Comics #1 (1938)",
        editorial: "DC Comics",
        universo: "DC",
        equipo: "Liga de la Justicia",
        debilidad: "Kryptonita y magia",
        estado: "Activo",
    },
    {
        nombre: "Thor",
        alterEgo: "Thor Odinson",
        poderes: [
            "🔨 Mjolnir (control del rayo)",
            "💪 Fuerza de dios asgardiano",
            "✈️ Vuelo",
            "⚡ Manipulación del clima",
            "🦴 Resistencia divina",
        ],
        descripcion: "Dios asgardiano del trueno, defensor de los nueve reinos y miembro fundador de los Vengadores.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/1/1a/Thor_%28Marvel_Comics%29.png",
        edad: 1500,
        fuerza: 100,
        altura: "1.98 m",
        peso: "290 kg",
        origen: "Asgard",
        primeraAparicion: "Journey into Mystery #83 (1962)",
        editorial: "Marvel Comics",
        universo: "Marvel",
        equipo: "Los Vengadores",
        debilidad: "Vulnerable a la magia oscura",
        estado: "Activo",
    },
    {
        nombre: "Black Widow",
        alterEgo: "Natasha Romanoff",
        poderes: [
            "🥋 Combate cuerpo a cuerpo experto",
            "🕵️ Espionaje y sigilo",
            "🔫 Puntería experta",
            "⚡ Guanteletes de choque",
            "🧠 Manipulación psicológica",
        ],
        descripcion: "Ex espía rusa convertida en agente de S.H.I.E.L.D. y Vengadora, sin poderes pero con habilidades de élite.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/3/37/Natasha_Romanova_incarnations.jpg",
        edad: 39,
        fuerza: 40,
        altura: "1.70 m",
        peso: "59 kg",
        origen: "Stalingrado, Rusia",
        primeraAparicion: "Tales of Suspense #52 (1964)",
        editorial: "Marvel Comics",
        universo: "Marvel",
        equipo: "Los Vengadores",
        debilidad: "Es completamente humana, vulnerable físicamente",
        estado: "Fallecida",
    },
    {
        nombre: "Flash",
        alterEgo: "Barry Allen",
        poderes: [
            "🏃 Súper velocidad",
            "⚡ Viaje en el tiempo",
            "🌀 Vibración molecular",
            "🩹 Curación acelerada",
            "🧠 Reflejos hipersónicos",
        ],
        descripcion: "El hombre más rápido con vida, forense de Central City conectado a la Fuerza de Velocidad.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/b/b7/Flash_%28Barry_Allen%29.png",
        edad: 28,
        fuerza: 60,
        altura: "1.83 m",
        peso: "81 kg",
        origen: "Central City, Estados Unidos",
        primeraAparicion: "Showcase #4 (1956)",
        editorial: "DC Comics",
        universo: "DC",
        equipo: "Liga de la Justicia",
        debilidad: "Fricción extrema y desconexión de la Fuerza de Velocidad",
        estado: "Activo",
    },
    {
        nombre: "Hulk",
        alterEgo: "Bruce Banner",
        poderes: [
            "💪 Fuerza ilimitada",
            "🩹 Regeneración celular",
            "🦴 Piel resistente al daño",
            "🦶 Saltos de gran distancia",
            "😡 Resistencia a la fatiga",
        ],
        descripcion: "Científico que se transforma en un gigante verde imparable cuando se enfurece.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/a/aa/Hulk_%28circa_2019%29.png",
        edad: 49,
        fuerza: 100,
        altura: "2.44 m",
        peso: "635 kg",
        origen: "Nuevo México, Estados Unidos",
        primeraAparicion: "The Incredible Hulk #1 (1962)",
        editorial: "Marvel Comics",
        universo: "Marvel",
        equipo: "Los Vengadores",
        debilidad: "Pérdida de control racional al transformarse",
        estado: "Activo",
    },
    {
        nombre: "Doctor Strange",
        alterEgo: "Stephen Strange",
        poderes: [
            "✨ Manipulación de la magia",
            "🌀 Portales dimensionales",
            "👁️ Control del tiempo",
            "📖 Maestría en artes místicas",
            "🛡️ Escudo místico",
        ],
        descripcion: "Ex cirujano convertido en el Hechicero Supremo, protector de la Tierra contra amenazas místicas.",
        bando: "Héroe",
        image: "https://upload.wikimedia.org/wikipedia/en/4/4f/Doctor_Strange_Vol_4_2_Ross_Variant_Textless.jpg",
        edad: 44,
        fuerza: 35,
        altura: "1.80 m",
        peso: "81 kg",
        origen: "Nueva York, Estados Unidos",
        primeraAparicion: "Strange Tales #110 (1963)",
        editorial: "Marvel Comics",
        universo: "Marvel",
        equipo: "Los Vengadores",
        debilidad: "Manos dañadas y dependencia de artefactos mágicos",
        estado: "Activo",
    },
    {
        nombre: "Thanos",
        alterEgo: "El Titán Loco",
        poderes: [
            "💪 Fuerza descomunal",
            "🧤 Guantelete del Infinito",
            "🦴 Regeneración e invulnerabilidad",
            "🧠 Estrategia militar",
            "✋ Control de la realidad",
        ],
        descripcion: "Titán que busca el equilibrio del universo eliminando la mitad de toda vida existente.",
        bando: "Villano",
        image: "https://upload.wikimedia.org/wikipedia/en/b/b7/Thanos_%28Infobox_image%29.png",
        edad: 1000,
        fuerza: 100,
        altura: "2.03 m",
        peso: "453 kg",
        origen: "Titán",
        primeraAparicion: "The Invincible Iron Man #55 (1973)",
        editorial: "Marvel Comics",
        universo: "Marvel",
        equipo: "La Orden Negra",
        debilidad: "Su propio orgullo y apego emocional",
        estado: "Fallecido",
    },
    {
        nombre: "Joker",
        alterEgo: "Desconocido",
        poderes: [
            "🧠 Genio criminal",
            "🤡 Manipulación psicológica",
            "☣️ Uso de toxinas y gas de la risa",
            "🔪 Impredecibilidad extrema",
            "🎭 Maestro del caos",
        ],
        descripcion: "El archienemigo de Batman, un criminal caótico sin poderes sobrehumanos pero extremadamente peligroso.",
        bando: "Villano",
        image: "https://upload.wikimedia.org/wikipedia/en/5/5f/Batman_Three_Jokers.jpg",
        edad: 45,
        fuerza: 30,
        altura: "1.85 m",
        peso: "77 kg",
        origen: "Gotham City, Estados Unidos",
        primeraAparicion: "Batman #1 (1940)",
        editorial: "DC Comics",
        universo: "DC",
        equipo: "Ninguno",
        debilidad: "Es completamente humano, sin poderes",
        estado: "Activo",
    },
];

// Comprobaciones rápidas en consola: cuántos héroes hay y cómo se accede
// a un elemento del arreglo (heroes[0]) y a una propiedad anidada (poderes[2]).
console.log(heroes.length);
console.log(heroes[0].nombre);
console.log(heroes[0].poderes[2]);

// Recibe UN objeto héroe y devuelve el HTML (como string) de su ficha.
// Cada propiedad se coloca en su propia etiqueta (h2, p, dd, li, etc.)
// en vez de mezclarse todo en un solo texto.
function crearFichaHeroe(heroe, index, extraClass = "") {
    // poderes es un arreglo de strings -> lo convertimos en una lista de <li>
    // map() transforma cada poder en un <li>...</li>, join("") une todo sin separador
    const poderesHtml = heroe.poderes.map(poder => `<li>${poder}</li>`).join("");

    // Si el héroe es de DC Comics, el texto junto a "Ficha técnica" se pinta de azul.
    const brandClass = heroe.editorial === "DC Comics" ? "card__footer-brand card__footer-brand--dc" : "card__footer-brand";

    // data-index identifica qué héroe del arreglo es esta carta, para poder
    // recuperarlo al hacer click y mostrarlo expandido en abrirCarta().
    const claseCard = extraClass ? `card ${extraClass}` : "card";

    // Template literal (backticks) para armar el HTML de la carta,
    // insertando los valores del objeto con ${...}
    return `
        <div class="${claseCard}" data-index="${index}">
            <div class="card__top">
                <dl class="card__badges">
                    <div class="card__badge card__badge--fuerza">
                        <dt>Fuerza</dt>
                        <dd>${heroe.fuerza}</dd>
                    </div>
                    <div class="card__badge card__badge--edad">
                        <dt>Edad</dt>
                        <dd>${heroe.edad}</dd>
                    </div>
                    <div class="card__badge card__badge--altura">
                        <dt>Altura</dt>
                        <dd>${heroe.altura}</dd>
                    </div>
                    <div class="card__badge card__badge--peso">
                        <dt>Peso</dt>
                        <dd>${heroe.peso}</dd>
                    </div>
                </dl>
                <img class="card__image" src="${heroe.image}" alt="${heroe.nombre}">
            </div>

            <div class="card__banner">
                <h2 class="card__name">${heroe.nombre}</h2>
                <p class="card__alter-ego">${heroe.alterEgo}</p>
            </div>

            <dl class="card__quickstats">
                <div class="card__quickstat">
                    <dt>Bando</dt>
                    <dd>${heroe.bando}</dd>
                </div>
                <div class="card__quickstat">
                    <dt>Estado</dt>
                    <dd>${heroe.estado}</dd>
                </div>
                <div class="card__quickstat">
                    <dt>Universo</dt>
                    <dd>${heroe.universo}</dd>
                </div>
            </dl>

            <dl class="card__info">
                <p class="card__descripcion">${heroe.descripcion}</p>
                <div class="card__info-line">
                    <dt>Origen</dt>
                    <dd>${heroe.origen}</dd>
                </div>
                <div class="card__info-line">
                    <dt>Primera aparición</dt>
                    <dd>${heroe.primeraAparicion}</dd>
                </div>
                <div class="card__info-line">
                    <dt>Equipo</dt>
                    <dd>${heroe.equipo}</dd>
                </div>
                <div class="card__info-line">
                    <dt>Debilidad</dt>
                    <dd>${heroe.debilidad}</dd>
                </div>
            </dl>

            <div class="card__poderes-wrap">
                <span class="card__poderes-label">Poderes</span>
                <ul class="card__poderes">${poderesHtml}</ul>
            </div>

            <div class="card__footer">
                <span>Ficha técnica</span>
                <span class="${brandClass}">${heroe.editorial}</span>
            </div>
        </div>
    `;
}

// Recorre TODO el arreglo de héroes, genera el HTML de cada uno
// (crearFichaHeroe) y lo mete de una sola vez dentro de #galeria.
function renderHeroes(heroes) {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = heroes.map((heroe, i) => crearFichaHeroe(heroe, i)).join("");
}

// Dispara el render apenas carga el script: sin esta llamada
// la galería se quedaría vacía.
renderHeroes(heroes);

// --- Expandir carta al hacer click ---

// Overlay fijo (se crea una sola vez y se reutiliza) donde se muestra la
// carta seleccionada en el centro de la pantalla, con las demás difuminadas
// detrás gracias al backdrop-filter definido en styles.css.
const cardOverlay = document.createElement("div");
cardOverlay.className = "card-overlay";
document.body.appendChild(cardOverlay);

function abrirCarta(index) {
    const heroe = heroes[index];
    cardOverlay.innerHTML = `
        <button class="card-overlay__close" aria-label="Cerrar">✕</button>
        ${crearFichaHeroe(heroe, index, "card--expanded")}
    `;
    cardOverlay.classList.add("card-overlay--visible");
    document.body.classList.add("no-scroll");
}

function cerrarCarta() {
    cardOverlay.classList.remove("card-overlay--visible");
    document.body.classList.remove("no-scroll");
}

// Delegación de eventos: un solo listener en #galeria detecta el click
// en cualquier carta (actual o futura) y busca su índice en data-index.
document.getElementById("galeria").addEventListener("click", (e) => {
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
