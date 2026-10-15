/* Juego de memoria con los autos del garage.
Adaptado de css/ejemplo juego (cardGame de CodePen): la lógica de voltear, comparar pares,
cronómetro y victoria es la misma; cambian los datos (autos en vez de productos), la cantidad
de pares (ya no está fija en 8) y las cartas se arman con createElement + textContent.

Todo va dentro de una función (IIFE) para no chocar con las variables de data.js y game.js.
Solo se exponen iniciarMemoria, pausarMemoria y reanudarMemoria. */

(function() {

  /*-----Configuración----------------------------*/

  const MAX_PARES = 8;                            // tablero de 4x4 como el ejemplo
  const IMAGEN_RESPALDO = "images/race-burnout-charger.png"; // si la imagen del auto falla


  /*-----Estado del juego----------------------------*/

  let autosEnJuego = [];      // los autos elegidos para esta partida
  let carta1 = null;          // primera carta volteada
  let carta2 = null;          // segunda carta volteada
  let esperando = false;      // bloquea clics mientras se comparan dos cartas
  let paresEncontrados = 0;
  let intentos = 0;

  let timerInterval = null;
  let segundosJuego = 0;
  let juegoActivo = false;    // el cronómetro corre solo si es true


  /*-----Elementos----------------------------*/

  const tablero = document.getElementById("tablero");
  const aviso = document.getElementById("memoria-aviso");
  const hudTimer = document.getElementById("hud-timer");
  const hudIntentos = document.getElementById("hud-intentos");
  const hudPares = document.getElementById("hud-pares");
  const overlayVictoria = document.getElementById("overlay-victoria");


  /*-----Cronómetro----------------------------*/

  function formatearTiempo(segs) {
    const mm = String(Math.floor(segs / 60)).padStart(2, "0");
    const ss = String(segs % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  function iniciarTimer() {
    clearInterval(timerInterval);
    segundosJuego = 0;
    juegoActivo = true;
    timerInterval = setInterval(function() {
      if (!juegoActivo) return;
      segundosJuego++;
      hudTimer.textContent = formatearTiempo(segundosJuego);
      hudTimer.classList.toggle("memoria__valor--peligro", segundosJuego >= 120);
    }, 1000);
  }

  function detenerTimer() {
    juegoActivo = false;
    clearInterval(timerInterval);
  }


  /*-----Mazo----------------------------*/

  // Mezcla una copia del arreglo (algoritmo Fisher-Yates), sin tocar el original.
  function shuffle(array) {
    const copia = array.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  // Elige hasta 8 autos al azar del arreglo "autos" (data.js, que ya usa localStorage si hay
  // datos guardados). Así cada partida trae autos distintos.
  function elegirAutos() {
    return shuffle(autos).slice(0, MAX_PARES);
  }


  /*-----Cartas----------------------------*/

  // Crea una carta con createElement y textContent: los nombres pueden venir de gestión,
  // así que nunca se insertan como HTML.
  function crearCarta(auto) {
    const carta = document.createElement("button");
    carta.type = "button";
    carta.className = "memoria__carta";
    carta.dataset.idAuto = auto.id;
    carta.setAttribute("aria-label", "Carta boca abajo");

    const interior = document.createElement("div");
    interior.className = "memoria__carta-interior";

    // Reverso (lo que se ve al inicio)
    const reverso = document.createElement("div");
    reverso.className = "memoria__cara memoria__cara--reverso";
    reverso.innerHTML = `<span class="memoria__reverso-icono">🏁</span><span class="memoria__reverso-marca">F&amp;F</span>`;

    // Frente (el auto)
    const frente = document.createElement("div");
    frente.className = "memoria__cara memoria__cara--frente";

    const img = document.createElement("img");
    img.src = auto.image || IMAGEN_RESPALDO;
    img.alt = auto.nombre;
    img.addEventListener("error", function() {
      if (!img.src.endsWith(IMAGEN_RESPALDO)) img.src = IMAGEN_RESPALDO;
    });

    const info = document.createElement("div");
    info.className = "memoria__info";
    const nombre = document.createElement("p");
    nombre.className = "memoria__nombre";
    nombre.textContent = auto.nombre;
    const conductor = document.createElement("p");
    conductor.className = "memoria__conductor";
    conductor.textContent = auto.conductor;
    info.append(nombre, conductor);

    frente.append(img, info);
    interior.append(reverso, frente);
    carta.appendChild(interior);

    carta.addEventListener("click", function() {
      manejarClic(carta, auto);
    });
    return carta;
  }

  function renderizarTablero() {
    tablero.innerHTML = "";
    autosEnJuego = elegirAutos();

    // Con menos de 2 autos no se puede jugar (por ejemplo, si se borraron desde gestión).
    if (autosEnJuego.length < 2) {
      aviso.textContent = "Se necesitan al menos 2 autos en el garage para jugar. Agrega autos desde gestión.";
      aviso.hidden = false;
      hudPares.textContent = "0/0";
      detenerTimer();
      return;
    }
    aviso.hidden = true;

    // Cada auto aparece dos veces (concat) y luego se mezclan.
    const mazo = shuffle(autosEnJuego.concat(autosEnJuego));
    mazo.forEach(function(auto) {
      tablero.appendChild(crearCarta(auto));
    });

    hudPares.textContent = `0/${autosEnJuego.length}`;
    iniciarTimer();
  }


  /*-----Lógica de pares----------------------------*/

  function manejarClic(carta, auto) {
    if (esperando) return;
    if (carta.classList.contains("volteada")) return;
    if (carta.classList.contains("encontrada")) return;

    carta.classList.add("volteada");
    carta.setAttribute("aria-label", auto.nombre);

    if (!carta1) {
      carta1 = carta;
      return; // se espera la segunda carta
    }

    carta2 = carta;
    intentos++;
    hudIntentos.textContent = intentos;
    esperando = true;

    if (carta1.dataset.idAuto === carta2.dataset.idAuto) {
      procesarParEncontrado();
    } else {
      setTimeout(voltearDeNuevo, 900);
    }
  }

  function procesarParEncontrado() {
    [carta1, carta2].forEach(function(c) {
      c.classList.remove("volteada");
      c.classList.add("encontrada");
      c.disabled = true;
    });
    paresEncontrados++;
    hudPares.textContent = `${paresEncontrados}/${autosEnJuego.length}`;
    limpiarSeleccion();

    if (paresEncontrados === autosEnJuego.length) {
      detenerTimer();
      setTimeout(mostrarVictoria, 500);
    }
  }

  function voltearDeNuevo() {
    [carta1, carta2].forEach(function(c) {
      c.classList.remove("volteada");
      c.setAttribute("aria-label", "Carta boca abajo");
    });
    limpiarSeleccion();
  }

  function limpiarSeleccion() {
    carta1 = null;
    carta2 = null;
    esperando = false;
  }


  /*-----Victoria----------------------------*/

  // En vez de códigos de descuento, un rango según intentos y tiempo.
  // Con menos pares, los límites se ajustan en proporción (pensados para 8 pares).
  function calcularRango() {
    const factor = autosEnJuego.length / MAX_PARES;
    if (intentos <= 10 * factor && segundosJuego <= 60 * factor) {
      return { titulo: "🏆 Leyenda del cuarto de milla", desc: "Memoria de familia Toretto. Nadie te alcanza." };
    }
    if (intentos <= 14 * factor) {
      return { titulo: "🔥 Corredor callejero", desc: "Buen ritmo: ya te ganaste un lugar en el equipo." };
    }
    if (intentos <= 20 * factor) {
      return { titulo: "🚗 Piloto en entrenamiento", desc: "Vas bien, pero Han todavía te gana en el drift." };
    }
    return { titulo: "🔧 Novato del garage", desc: "Sigue practicando: vuelve a intentarlo." };
  }

  function mostrarVictoria() {
    const rango = calcularRango();
    document.getElementById("rango-titulo").textContent = rango.titulo;
    document.getElementById("rango-desc").textContent = rango.desc;
    document.getElementById("stat-tiempo").textContent = formatearTiempo(segundosJuego);
    document.getElementById("stat-intentos").textContent = intentos;
    overlayVictoria.hidden = false;

    // Guarda la partida en el JSON de jugadores (función de game.js).
    registrarIntento({
      numeroIntentos: intentos,
      tiempoSegundos: segundosJuego,
      tiempo: formatearTiempo(segundosJuego),
      pares: autosEnJuego.length,
      rango: rango.titulo
    });
  }


  /*-----Reiniciar----------------------------*/

  function reiniciarJuego() {
    overlayVictoria.hidden = true;
    limpiarSeleccion();
    paresEncontrados = 0;
    intentos = 0;
    hudIntentos.textContent = "0";
    hudTimer.textContent = "00:00";
    hudTimer.classList.remove("memoria__valor--peligro");
    renderizarTablero();
  }

  document.getElementById("btn-reiniciar").addEventListener("click", reiniciarJuego);
  document.getElementById("btn-jugar-de-nuevo").addEventListener("click", reiniciarJuego);


  /*-----Funciones públicas----------------------------*/

  // game.js la llama después del login.
  window.iniciarMemoria = reiniciarJuego;

  // index.js las llama al cerrar/abrir la ventana del juego en el garage, para que el
  // cronómetro no siga corriendo mientras la ventana está cerrada.
  window.pausarMemoria = function() {
    juegoActivo = false;
  };

  window.reanudarMemoria = function() {
    // Solo si hay una partida en curso (hay cartas y no se ha ganado todavía).
    const enCurso = tablero.children.length > 0 && paresEncontrados < autosEnJuego.length;
    if (enCurso) juegoActivo = true;
  };

})();
