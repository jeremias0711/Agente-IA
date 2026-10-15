/*-----Validación de la contraseña----------------------------*/

/* Expresión regular completa. Cada (?=...) es una "condición" que se revisa desde el inicio
sin consumir caracteres, así las tres se pueden cumplir en cualquier orden:
  (?=.*[A-ZÁÉÍÓÚÑ])            -> al menos 1 letra mayúscula
  (?=(?:\D*\d){7})             -> al menos 7 números (no necesitan estar seguidos)
  (?=.*[^A-Za-z0-9ÁÉÍÓÚÑáéíóúñ\s]) -> al menos 1 carácter especial (ni letra, ni número, ni espacio) */

const regexContrasena = /^(?=.*[A-ZÁÉÍÓÚÑ])(?=(?:\D*\d){7})(?=.*[^A-Za-z0-9ÁÉÍÓÚÑáéíóúñ\s]).+$/;

// Las mismas condiciones por separado, para marcar en pantalla cuál falta.
const requisitos = {
  mayuscula: /[A-ZÁÉÍÓÚÑ]/,
  numeros: /(?:\D*\d){7}/,
  especial: /[^A-Za-z0-9ÁÉÍÓÚÑáéíóúñ\s]/
};

function contrasenaValida(contrasena) {
  return regexContrasena.test(contrasena);
}


/*-----Validación del email----------------------------*/

/* Estructura usuario@dominio.extension:
  ^[A-Za-z0-9._%+-]+   -> usuario: letras, números y . _ % + - (al menos 1 carácter)
  @                    -> una arroba
  [A-Za-z0-9.-]+       -> dominio: letras, números, puntos y guiones (ej. gmail, unbosque.edu)
  \.[A-Za-z]{2,}$      -> un punto y una extensión de 2 o más letras (ej. .com, .co) */

const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function emailValido(email) {
  return regexEmail.test(email);
}


/*-----Juego dentro del garage----------------------------*/

/* Si game.html está cargado dentro del iframe del garage, el enlace "Volver al garage"
sobra (el garage ya está detrás): se oculta. Abierto solo, el enlace sí se muestra. */

if (window.self !== window.top) {
  document.getElementById("volver-garage").hidden = true;
}


/*-----Formulario de registro----------------------------*/

const registro = document.getElementById("registro");
const formRegistro = document.getElementById("form-registro");
const registroError = document.getElementById("registro-error");
const listaRequisitos = document.querySelectorAll("#requisitos li");
const inputContrasena = formRegistro.elements.contrasena;

const estadoContrasena = document.getElementById("estado-contrasena");
const inputEmail = formRegistro.elements.email;
const estadoEmail = document.getElementById("estado-email");

// Campo que causó el último error ("datos", "email" o "contrasena"). Cuando ese
// campo se corrige, el aviso de error se quita solo.
let campoConError = null;

// Pinta debajo de un campo si cumple su expresión regular, y el borde en
// verde o rojo. Con el campo vacío no muestra nada.
function mostrarEstado(input, estado, valido, textoValido, textoInvalido) {
  const vacio = input.value === "";
  estado.textContent = vacio ? "" : valido ? textoValido : textoInvalido;
  estado.classList.toggle("estado-contrasena--valida", valido);
  input.classList.toggle("input-valido", !vacio && valido);
  input.classList.toggle("input-invalido", !vacio && !valido);
}

// Mientras se escribe, cada requisito se pinta en verde si ya se cumple, y
// debajo se muestra si la contraseña cumple la expresión regular completa.
function actualizarRequisitos() {
  const valor = inputContrasena.value;

  listaRequisitos.forEach(function(li) {
    const cumple = requisitos[li.dataset.requisito].test(valor);
    li.classList.toggle("cumple", cumple);
  });

  const valida = contrasenaValida(valor);
  mostrarEstado(inputContrasena, estadoContrasena, valida,
    "✓ La contraseña cumple la expresión regular",
    "✕ La contraseña todavía no cumple la expresión regular");

  if (valida && campoConError === "contrasena") ocultarError();
}

// Igual que la contraseña: en cada tecla se revisa el email con regexEmail.
function actualizarEmail() {
  const valor = inputEmail.value.trim();
  const valido = emailValido(valor);
  mostrarEstado(inputEmail, estadoEmail, valido,
    "✓ El email es válido",
    "✕ El email debe tener la forma usuario@dominio.com");

  if (valido && campoConError === "email") ocultarError();
}

inputContrasena.addEventListener("input", actualizarRequisitos);
inputEmail.addEventListener("input", actualizarEmail);

function mostrarError(mensaje, campo) {
  registroError.textContent = mensaje;
  registroError.hidden = false;
  campoConError = campo;
}

function ocultarError() {
  registroError.hidden = true;
  campoConError = null;
}

/*-----Jugadores registrados (JSON en localStorage)----------------------------*/

/* Los jugadores se guardan en localStorage bajo la clave "jugadores" como un texto JSON.
Cada jugador tiene un id autogenerado y un arreglo "intentos" con cada partida completada:
  [
    {
      "id": 1,
      "nombre": "Dominic", "alias": "Dom", "email": "dom@gmail.com", "contrasena": "Toretto1234567!",
      "intentos": [
        { "id": 1, "fecha": "2026-09-25T20:15:03.120Z", "numeroIntentos": 12,
          "tiempoSegundos": 74, "tiempo": "01:14", "pares": 8, "rango": "🔥 Corredor callejero" }
      ]
    }
  ]
JSON.stringify convierte el arreglo en texto para guardarlo y JSON.parse lo vuelve arreglo.

OJO: la contraseña queda guardada tal cual en el navegador. Sirve para practicar, pero en un
proyecto real el registro va en un servidor y la contraseña se guarda cifrada (hash). */

const CLAVE_JUGADORES = "jugadores";

// Siguiente id libre: el mayor id existente + 1 (empieza en 1). Como nunca se reutiliza un id
// mayor, no se repiten aunque se borren registros.
function siguienteIdDe(lista) {
  return lista.reduce(function(max, item) { return Math.max(max, Number(item.id) || 0); }, 0) + 1;
}

// Los jugadores registrados antes de este cambio no tenían id ni "intentos": se les agregan.
// Devuelve true si tuvo que cambiar algo (para guardarlo).
function completarJugadores(jugadores) {
  let cambio = false;
  jugadores.forEach(function(j) {
    if (!Array.isArray(j.intentos)) {
      j.intentos = [];
      cambio = true;
    }
    if (!j.id) {
      j.id = siguienteIdDe(jugadores);
      cambio = true;
    }
  });
  return cambio;
}

function leerJugadores() {
  try {
    const guardado = localStorage.getItem(CLAVE_JUGADORES);
    const jugadores = guardado ? JSON.parse(guardado) : [];
    if (!Array.isArray(jugadores)) return [];
    if (completarJugadores(jugadores)) guardarJugadores(jugadores);
    return jugadores;
  } catch (error) {
    // Si el JSON está dañado (o el navegador bloquea localStorage), se empieza vacío.
    return [];
  }
}

function guardarJugadores(jugadores) {
  localStorage.setItem(CLAVE_JUGADORES, JSON.stringify(jugadores));
}

// El email se compara sin distinguir mayúsculas: Dom@Gmail.com y dom@gmail.com son el mismo.
function buscarJugador(email) {
  return leerJugadores().find(function(j) {
    return j.email.toLowerCase() === email.toLowerCase();
  });
}

// Agrega al jugador con un id nuevo y sin intentos. Devuelve el jugador ya con su id.
function registrarJugador(datos) {
  const jugadores = leerJugadores();
  const nuevoJugador = {
    id: siguienteIdDe(jugadores),
    nombre: datos.nombre,
    alias: datos.alias,
    email: datos.email,
    contrasena: datos.contrasena,
    intentos: []
  };
  jugadores.push(nuevoJugador);
  guardarJugadores(jugadores);
  return nuevoJugador;
}

/* Guarda una partida completada en el arreglo "intentos" del jugador que inició sesión.
La llama memoria.js al ganar. El id del intento es único entre TODOS los intentos de todos
los jugadores (el mayor id existente + 1). */
function registrarIntento(resultado) {
  if (!jugador) return null;

  const jugadores = leerJugadores();
  const registroJugador = jugadores.find(function(j) { return j.id === jugador.id; });
  if (!registroJugador) return null;

  const todosLosIntentos = jugadores.reduce(function(lista, j) { return lista.concat(j.intentos); }, []);

  const intento = {
    id: siguienteIdDe(todosLosIntentos),
    fecha: new Date().toISOString(),         // fecha y hora exacta (formato estándar ISO, en UTC)
    numeroIntentos: resultado.numeroIntentos, // cuántas veces volteó un par de cartas
    tiempoSegundos: resultado.tiempoSegundos, // tiempo empleado, en segundos
    tiempo: resultado.tiempo,                 // el mismo tiempo en formato mm:ss
    pares: resultado.pares,
    rango: resultado.rango
  };

  registroJugador.intentos.push(intento);
  guardarJugadores(jugadores);
  return intento;
}


/*-----Login / registro----------------------------*/

/* Al presionar "Continuar":
  1. El email y la contraseña deben cumplir sus expresiones regulares.
  2. Si el email ya está registrado y la contraseña coincide -> entra al juego.
     Si la contraseña no coincide -> error, no entra.
  3. Si el email NO está registrado -> un confirm pregunta si quiere registrarse.
     Para registrarse también hacen falta nombre y alias. */

formRegistro.addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = formRegistro.elements.nombre.value.trim();
  const alias = formRegistro.elements.alias.value.trim();
  const email = inputEmail.value.trim();
  const contrasena = inputContrasena.value;

  // Si el email no cumple su expresión regular, no se deja continuar.
  if (!emailValido(email)) {
    mostrarError("El email no es válido.", "email");
    inputEmail.focus();
    return;
  }

  // Si la contraseña no cumple la expresión regular, no se deja continuar.
  if (!contrasenaValida(contrasena)) {
    mostrarError("La contraseña no cumple todos los requisitos.", "contrasena");
    inputContrasena.focus();
    return;
  }

  const registrado = buscarJugador(email);

  // Caso 1: el email existe -> login si la contraseña coincide.
  if (registrado) {
    if (registrado.contrasena !== contrasena) {
      mostrarError("Contraseña incorrecta para este email.", "contrasena");
      inputContrasena.value = "";
      actualizarRequisitos();
      inputContrasena.focus();
      return;
    }
    ocultarError();
    iniciarJuego(registrado);
    return;
  }

  // Caso 2: el email no existe -> se pregunta si quiere registrarse.
  const quiereRegistrarse = confirm(`No hay ningún jugador registrado con ${email}.\n\n¿Deseas registrarte?`);
  if (!quiereRegistrarse) return;

  if (nombre === "" || alias === "") {
    mostrarError("Para registrarte escribe tu nombre y tu alias.", "datos");
    (nombre === "" ? formRegistro.elements.nombre : formRegistro.elements.alias).focus();
    return;
  }

  const nuevoJugador = registrarJugador({ nombre: nombre, alias: alias, email: email, contrasena: contrasena });
  ocultarError();
  iniciarJuego(nuevoJugador);
});

// El aviso "escribe tu nombre y tu alias" se quita cuando ya están los dos.
["nombre", "alias"].forEach(function(campo) {
  formRegistro.elements[campo].addEventListener("input", function() {
    const completos = formRegistro.elements.nombre.value.trim() !== "" && formRegistro.elements.alias.value.trim() !== "";
    if (completos && campoConError === "datos") ocultarError();
  });
});


/*-----Juego----------------------------*/

const juego = document.getElementById("juego");
const bienvenida = document.getElementById("bienvenida");

// Datos del jugador que entró al juego. La contraseña no se copia aquí.
let jugador = null;

function iniciarJuego(datosJugador) {
  // El id se guarda para saber a quién se le registran los intentos.
  jugador = { id: datosJugador.id, nombre: datosJugador.nombre, alias: datosJugador.alias, email: datosJugador.email };
  bienvenida.textContent = `¡Bienvenido, ${jugador.alias}!`;
  registro.hidden = true;
  juego.hidden = false;
  iniciarMemoria(); // de memoria.js: reparte las cartas y arranca el cronómetro
}
