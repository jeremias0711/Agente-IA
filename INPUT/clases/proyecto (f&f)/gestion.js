/* Todo el código va dentro de esta función que se ejecuta sola (IIFE). Así sus variables y
funciones (sesionIniciada, refrescar, etc.) no quedan globales y no se pueden usar desde
la consola para saltarse el login. */

(function() {

  /*-----Sesión----------------------------*/

  /* Solo pasa a true cuando el login es correcto. Cada operación CRUD lo revisa antes de
  ejecutarse. Como todo el archivo está dentro de una función, esta variable no se puede
  cambiar desde la consola. */

  let sesionIniciada = false;

  function haySesion() {
    if (!sesionIniciada) console.warn("Operación bloqueada: primero inicia sesión.");
    return sesionIniciada;
  }


  /*-----Campos del formulario----------------------------*/

  const campos = [
    { clave: "nombre", etiqueta: "Nombre", tipo: "text" },
    { clave: "conductor", etiqueta: "Conductor", tipo: "text" },
    { clave: "pelicula", etiqueta: "Película", tipo: "text" },
    { clave: "año", etiqueta: "Año", tipo: "number" },
    { clave: "tipo", etiqueta: "Tipo", tipo: "text" },
    { clave: "potencia", etiqueta: "Potencia (HP)", tipo: "number" },
    { clave: "velocidadMax", etiqueta: "Velocidad máxima (km/h)", tipo: "number" },
    { clave: "precioEstimado", etiqueta: "Precio estimado", tipo: "text" },
    { clave: "color", etiqueta: "Color", tipo: "text" },
    { clave: "motor", etiqueta: "Motor", tipo: "text" },
    { clave: "origen", etiqueta: "Origen", tipo: "text" },
    { clave: "escena", etiqueta: "Escena clave", tipo: "text" },
    { clave: "equipo", etiqueta: "Equipo", tipo: "text" },
    { clave: "estado", etiqueta: "Estado", tipo: "text" },
    { clave: "mods", etiqueta: "Modificaciones (separadas por coma)", tipo: "text" },
    { clave: "descripcion", etiqueta: "Descripción", tipo: "text" },
    { clave: "image", etiqueta: "URL de la imagen", tipo: "text" },
    { clave: "robado", etiqueta: "Robado", tipo: "checkbox" },
    { clave: "sobrealimentado", etiqueta: "Sobrealimentado", tipo: "checkbox" }
  ];

  function construirFormulario(form, textoBoton) {
    form.innerHTML = "";
    campos.forEach(function(c) {
      const label = document.createElement("label");
      label.textContent = c.etiqueta;
      const input = document.createElement("input");
      input.type = c.tipo;
      input.name = c.clave;
      if (c.tipo !== "checkbox") input.required = true;
      label.appendChild(input);
      form.appendChild(label);
    });
    const boton = document.createElement("button");
    boton.type = "submit";
    boton.textContent = textoBoton;
    form.appendChild(boton);
  }

  function leerFormulario(form) {
    const datos = {};
    campos.forEach(function(c) {
      const input = form.elements[c.clave];
      if (c.tipo === "checkbox") datos[c.clave] = input.checked;
      else if (c.tipo === "number") datos[c.clave] = Number(input.value);
      else if (c.clave === "mods") datos[c.clave] = input.value.split(",").map(function(s) { return s.trim(); });
      else datos[c.clave] = input.value;
    });
    return datos;
  }

  function llenarFormulario(form, auto) {
    campos.forEach(function(c) {
      const input = form.elements[c.clave];
      if (c.tipo === "checkbox") input.checked = auto[c.clave];
      else if (c.clave === "mods") input.value = auto[c.clave].join(", ");
      else input.value = auto[c.clave];
    });
  }


  /*-----Mostrar todos----------------------------*/

  const cuerpo = document.querySelector("#tabla-autos tbody");

  function mostrarTodos() {
    cuerpo.innerHTML = "";
    autos.forEach(function(auto) {
      const fila = document.createElement("tr");
      [auto.nombre, auto.conductor, auto.pelicula, auto.año, auto.tipo, auto.potencia, auto.velocidadMax, auto.estado, auto.robado ? "Sí" : "No"].forEach(function(valor) {
        const celda = document.createElement("td");
        celda.textContent = valor;
        fila.appendChild(celda);
      });
      cuerpo.appendChild(fila);
    });
  }


  /*-----Selectores----------------------------*/

  const selectLeer = document.getElementById("select-leer");
  const selectActualizar = document.getElementById("select-actualizar");
  const selectEliminar = document.getElementById("select-eliminar");

  function llenarSelectores() {
    [selectLeer, selectActualizar, selectEliminar].forEach(function(select) {
      select.innerHTML = "";
      autos.forEach(function(auto, indice) {
        const opcion = document.createElement("option");
        opcion.value = indice;
        opcion.textContent = auto.nombre;
        select.appendChild(opcion);
      });
    });
  }


  /*-----Crear----------------------------*/

  const formCrear = document.getElementById("form-crear");
  construirFormulario(formCrear, "Crear");

  formCrear.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!haySesion()) return;
    const nuevo = leerFormulario(formCrear);
    nuevo.id = siguienteId;
    siguienteId++;
    autos.push(nuevo);
    formCrear.reset();
    guardarAutos();
    refrescar();
    cambiarVista("todos");
  });


  /*-----Consultar----------------------------*/

  const detalle = document.getElementById("detalle");

  function mostrarDetalle() {
    detalle.innerHTML = "";
    if (!sesionIniciada) return;
    const auto = autos[selectLeer.value];
    if (!auto) return;
    campos.forEach(function(c) {
      const p = document.createElement("p");
      let valor = auto[c.clave];
      if (c.tipo === "checkbox") valor = valor ? "Sí" : "No";
      if (c.clave === "mods") valor = valor.join(", ");
      p.textContent = `${c.etiqueta}: ${valor}`;
      detalle.appendChild(p);
    });
  }

  selectLeer.addEventListener("change", mostrarDetalle);


  /*-----Actualizar----------------------------*/

  const formActualizar = document.getElementById("form-actualizar");
  construirFormulario(formActualizar, "Guardar cambios");

  function cargarParaActualizar() {
    if (!sesionIniciada) return;
    const auto = autos[selectActualizar.value];
    if (auto) llenarFormulario(formActualizar, auto);
  }

  selectActualizar.addEventListener("change", cargarParaActualizar);

  formActualizar.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!haySesion()) return;
    const actualizado = leerFormulario(formActualizar);
    actualizado.id = autos[selectActualizar.value].id;
    autos[selectActualizar.value] = actualizado;
    guardarAutos();
    refrescar();
    cambiarVista("todos");
  });


  /*-----Eliminar----------------------------*/

  const btnEliminar = document.getElementById("btn-eliminar");

  btnEliminar.addEventListener("click", function() {
    if (!haySesion()) return;
    const auto = autos[selectEliminar.value];
    if (!auto || !confirm(`¿Eliminar el auto "${auto.nombre}"?`)) return;
    autos.splice(selectEliminar.value, 1);
    guardarAutos();
    refrescar();
    cambiarVista("todos");
  });


  /*-----Sidebar----------------------------*/

  const items = document.querySelectorAll(".sidebar-item");
  const vistas = document.querySelectorAll(".vista");

  function cambiarVista(nombre) {
    vistas.forEach(function(v) { v.hidden = v.id !== `vista-${nombre}`; });
    items.forEach(function(i) { i.classList.toggle("activo", i.dataset.vista === nombre); });
  }

  items.forEach(function(item) {
    item.addEventListener("click", function() {
      cambiarVista(item.dataset.vista);
      // Se relee localStorage al abrir la pestaña, por si alguien se registró en el juego
      // mientras gestión estaba abierta.
      if (item.dataset.vista === "usuarios") mostrarUsuarios();
    });
  });

  function refrescar() {
    if (!sesionIniciada) return;
    mostrarTodos();
    llenarSelectores();
    mostrarDetalle();
    cargarParaActualizar();
    mostrarUsuarios();
  }


  /*-----Usuarios registrados----------------------------*/

  /* Lee los jugadores que game.js guarda en localStorage (clave "jugadores", texto JSON) y los
  muestra en una tabla. Para este ejercicio también se muestra la contraseña. */

  const cuerpoUsuarios = document.querySelector("#tabla-usuarios tbody");
  const tablaUsuarios = document.getElementById("tabla-usuarios");
  const usuariosVacio = document.getElementById("usuarios-vacio");

  function leerUsuarios() {
    try {
      const guardado = localStorage.getItem("jugadores");
      const usuarios = guardado ? JSON.parse(guardado) : [];
      return Array.isArray(usuarios) ? usuarios : [];
    } catch (error) {
      return [];
    }
  }

  function mostrarUsuarios() {
    cuerpoUsuarios.innerHTML = "";
    if (!sesionIniciada) return;

    const usuarios = leerUsuarios();
    tablaUsuarios.hidden = usuarios.length === 0;
    usuariosVacio.hidden = usuarios.length > 0;

    usuarios.forEach(function(usuario) {
      const fila = document.createElement("tr");

      // Resumen de sus intentos (partidas completadas en el juego de memoria).
      const intentos = Array.isArray(usuario.intentos) ? usuario.intentos : [];
      let mejorTiempo = "—";
      let ultimaPartida = "—";
      if (intentos.length > 0) {
        const mejor = intentos.reduce(function(a, b) { return b.tiempoSegundos < a.tiempoSegundos ? b : a; });
        mejorTiempo = `${mejor.tiempo} (${mejor.numeroIntentos} intentos)`;
        ultimaPartida = new Date(intentos[intentos.length - 1].fecha).toLocaleString("es-CO");
      }

      // textContent (no innerHTML): lo que escribió el jugador se muestra como texto, nunca como HTML.
      [usuario.id || "—", usuario.nombre, usuario.alias, usuario.email, usuario.contrasena,
        intentos.length, mejorTiempo, ultimaPartida].forEach(function(valor) {
        const celda = document.createElement("td");
        celda.textContent = valor;
        fila.appendChild(celda);
      });
      cuerpoUsuarios.appendChild(fila);
    });
  }


  /*-----Login----------------------------*/

  /* El panel CRUD empieza oculto y sin datos. Solo se llena y se muestra si verificarLogin()
  (de login.js) confirma que el usuario y la contraseña son correctos. */

  const login = document.getElementById("login");
  const formLogin = document.getElementById("form-login");
  const loginError = document.getElementById("login-error");
  const panelAdmin = document.getElementById("panel-admin");
  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

  /* La sesión se recuerda en sessionStorage: sobrevive a recargar la página y a ir al garage
  y volver, pero se borra sola al cerrar la pestaña o con el botón "Cerrar sesión". */

  const CLAVE_SESION = "sesionGestion";

  function iniciarSesion() {
    sesionIniciada = true;
    sessionStorage.setItem(CLAVE_SESION, "activa");
    login.hidden = true;
    panelAdmin.hidden = false;
    refrescar();
  }

  function cerrarSesion() {
    sesionIniciada = false;
    sessionStorage.removeItem(CLAVE_SESION);
    cuerpo.innerHTML = "";
    detalle.innerHTML = "";
    cuerpoUsuarios.innerHTML = "";
    formLogin.reset();
    loginError.hidden = true;
    cambiarVista("todos");
    panelAdmin.hidden = true;
    login.hidden = false;
  }

  formLogin.addEventListener("submit", function(e) {
    e.preventDefault();
    const usuarioIngresado = formLogin.elements.usuario.value;
    const passwordIngresado = formLogin.elements.password.value;

    if (verificarLogin(usuarioIngresado, passwordIngresado)) {
      iniciarSesion();
    } else {
      loginError.hidden = false;
      formLogin.elements.password.value = "";
    }
  });

  btnCerrarSesion.addEventListener("click", cerrarSesion);

  // Al cargar la página: si ya había una sesión en esta pestaña, se entra directo al panel.
  if (sessionStorage.getItem(CLAVE_SESION) === "activa") iniciarSesion();


})();
