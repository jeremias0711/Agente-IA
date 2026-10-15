/*-----Verificación del login----------------------------*/

/* Recibe lo que el usuario escribió en el formulario y devuelve true solo si coincide con
los datos de credenciales.js (que se carga antes que este archivo).

Se declara con const para que no se pueda reemplazar desde la consola, por ejemplo con
verificarLogin = function() { return true; }. Por la misma razón se copian aquí los datos
de credenciales.js: si alguien cambia usuario o contrasena desde la consola, esta función
sigue comparando contra los valores originales. */

const verificarLogin = (function() {
  const usuarioValido = usuario;
  const contrasenaValida = contrasena;

  return function(usuarioIngresado, contrasenaIngresada) {
    if (typeof usuarioIngresado !== "string" || typeof contrasenaIngresada !== "string") return false;
    return usuarioIngresado.trim() === usuarioValido && contrasenaIngresada === contrasenaValida;
  };
})();
