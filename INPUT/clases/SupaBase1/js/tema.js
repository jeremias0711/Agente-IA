// Modo claro/oscuro. La preferencia se guarda en localStorage; si no hay una
// guardada, se respeta el modo del sistema (ver mercadolibre.css).
(function () {
  const raiz = document.documentElement;

  function guardado() {
    try { return localStorage.getItem('tema'); } catch { return null; }
  }
  function guardar(valor) {
    try { localStorage.setItem('tema', valor); } catch { /* modo privado: se ignora */ }
  }
  function esOscuro() {
    return raiz.dataset.theme
      ? raiz.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function pintarBoton() {
    const boton = document.getElementById('btn-tema');
    if (boton) boton.textContent = esOscuro() ? '☀️ Modo claro' : '🌙 Modo oscuro';
  }

  // Se aplica de inmediato (este script va en <head>) para evitar el "parpadeo".
  const previo = guardado();
  if (previo === 'dark' || previo === 'light') raiz.dataset.theme = previo;

  document.addEventListener('DOMContentLoaded', () => {
    pintarBoton();
    document.getElementById('btn-tema').addEventListener('click', () => {
      const nuevo = esOscuro() ? 'light' : 'dark';
      raiz.dataset.theme = nuevo;
      guardar(nuevo);
      pintarBoton();
    });
  });
})();
