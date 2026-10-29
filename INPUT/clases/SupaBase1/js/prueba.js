document.getElementById('btn-traer').addEventListener('click', async () => {

  // Mismo "async" que en el Paso 2: esta función necesita "await" para
  // esperar la respuesta real de Supabase antes de seguir.
  const { data, error } = await db.from('productos_practica').select('*');
  // ↑ El código se DETIENE en esta línea hasta que la base de datos
  //   responde. Compáralo con localStorage.getItem('productos'): esa
  //   llamada te devuelve el valor guardado EN EL MISMO INSTANTE, sin
  //   esperar nada, porque no sale de tu computador. Esta línea sí
  //   puede tardar (viaja a internet y vuelve) — por eso necesita await.

  if (error) {
    // Revisamos "error" ANTES de tocar "data": si la consulta falló,
    // "data" llega como null, y usar null más adelante (ej. null.map())
    // rompería el script. Mismo patrón de "validar antes de operar"
    // que ya usaste en el CRUD de la semana 7.
    document.getElementById('resultado').textContent = 'Error: ' + error.message;
    return;
  }

  // JSON.stringify(data, null, 2) convierte el array completo a texto,
  // con sangría (el "2") para que se lea ordenado. Esta línea SÍ es
  // sincrónica (no necesita await) — ya no estamos esperando nada de
  // Supabase, solo transformando el array "data" que ya llegó.
  // document.getElementById('resultado').textContent = JSON.stringify(data, null, 2);

  // Una fila <tr> por producto; cada campo va en su propia celda <td>.
  // categorias puede llegar como array (columna json/array) o como texto JSON.
  const listaCategorias = c => {
    if (Array.isArray(c)) return c;
    try { return JSON.parse(c) || []; } catch { return c ? [c] : []; }
  };

  // La URL de la imagen viene de la columna "Img_url" de Supabase. Los nombres
  // de columna distinguen mayúsculas; si no hay URL, la celda queda vacía.
  const urlImagen = p => p.Img_url ?? p.img_url ?? '';

  // Diagnóstico: columnas que realmente llegan desde Supabase
  console.log('Columnas recibidas:', Object.keys(data[0] ?? {}), '| primer producto:', data[0]);

  const moneda = n => '$' + Number(n).toLocaleString('es-CO');

  // Una tarjeta por producto, dentro de una cuadrícula (galería).
  const tarjetas = data.map(p => {
    const precioFinal = p.precio * (1 - p.descuento);
    return `
    <article class="tarjeta ${p.disponible ? '' : 'agotado'}">
      <div class="foto">
        ${urlImagen(p)
          ? `<img src="${urlImagen(p)}" alt="${p.nombre}" referrerpolicy="no-referrer"
                  onerror="this.replaceWith(Object.assign(document.createElement('small'),{className:'sin-img',textContent:'No cargó: '+this.src}))">`
          : '<small class="sin-img">Sin valor en Img_url</small>'}
        ${p.descuento > 0 ? `<span class="etiqueta desc">-${Math.round(p.descuento * 100)}%</span>` : ''}
        ${p.disponible ? '' : '<span class="etiqueta agot">Agotado</span>'}
      </div>
      <div class="info">
        <h3>${p.nombre}</h3>
        <p class="desc-texto">${p.descripcion}</p>
        <p class="precio">
          <strong>${moneda(precioFinal)}</strong>
          ${p.descuento > 0 ? `<s>${moneda(p.precio)}</s>` : ''}
        </p>
        <p class="unidades">${p.unidades} unidades</p>
        <p class="cats">${listaCategorias(p.categorias).map(c => `<span>${c}</span>`).join('')}</p>
      </div>
    </article>`;
  }).join('');

  document.getElementById('resultado').innerHTML = `<div class="galeria">${tarjetas}</div>`;
});