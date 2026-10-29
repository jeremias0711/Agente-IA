// ─────────────────────────────────────────────────────────────
// TRAER PRODUCTOS → galería de tarjetas con imagen
// ─────────────────────────────────────────────────────────────

// categorias puede llegar como array (columna json/array) o como texto JSON.
const listaCategorias = c => {
  if (Array.isArray(c)) return c;
  try { return JSON.parse(c) || []; } catch { return c ? [c] : []; }
};

// La URL de la imagen viene de la columna "Img_url" de Supabase.
const urlImagen = p => p.Img_url ?? p.img_url ?? '';

const moneda = n => '$' + Number(n).toLocaleString('es-CO');

// "async" + "await": la consulta viaja a internet y hay que esperar la respuesta.
document.getElementById('btn-traer').addEventListener('click', async () => {
  const salida = document.getElementById('resultado');
  salida.textContent = 'Cargando…';

  const { data, error } = await db.from('productos_practica').select('*');
  console.log(data, error);

  if (error) {
    salida.textContent = 'Error: ' + error.message;
    return;
  }
  if (data.length === 0) {
    salida.textContent = 'No hay productos todavía.';
    return;
  }

  const tarjetas = data.map(p => {
    const precioFinal = p.precio * (1 - p.descuento);
    return `
    <article class="tarjeta ${p.disponible ? '' : 'agotado'}">
      <div class="foto">
        ${urlImagen(p)
          ? `<img src="${urlImagen(p)}" alt="${p.nombre}" loading="lazy" referrerpolicy="no-referrer"
                  onerror="this.replaceWith(Object.assign(document.createElement('small'),{className:'sin-img',textContent:'No cargó la imagen'}))">`
          : '<small class="sin-img">Sin imagen (Img_url vacío)</small>'}
        ${p.descuento > 0 ? `<span class="etiqueta desc">-${Math.round(p.descuento * 100)}%</span>` : ''}
        ${p.disponible ? '' : '<span class="etiqueta agot">Agotado</span>'}
      </div>
      <div class="info">
        <h3>#${p.id} · ${p.nombre}</h3>
        <p class="desc-texto">${p.descripcion}</p>
        <p class="precio">
          <strong>${moneda(precioFinal)}</strong>
          ${p.descuento > 0 ? `<s>${moneda(p.precio)}</s>` : ''}
        </p>
        <p class="unidades">${p.unidades} unidades</p>
        <p class="cats">${listaCategorias(p.categorias).map(c => `<span>${c}</span>`).join('')}</p>
        <button type="button" class="btn-eliminar" data-id="${p.id}" data-nombre="${p.nombre}">Eliminar</button>
      </div>
    </article>`;
  }).join('');

  salida.innerHTML = `<div class="galeria">${tarjetas}</div>`;
});

// ─────────────────────────────────────────────────────────────
// AGREGAR un producto de prueba (botón "Agregar producto de prueba")
// ─────────────────────────────────────────────────────────────
const productoPrueba = {
  nombre: "xbox series x",
  precio: 3000000,
  descripcion: "Este es un producto de prueba para insertar en la base de datos.",
  unidades: 10,
  descuento: 0,
  disponible: true,
  categorias: ["prueba", "test"],
  Img_url: "https://exitocol.vtexassets.com/arquivos/ids/34092176/consola-xbox-series-x-1tb-ssd-120fps-4k.jpg?v=639233775850170000"
};

async function agregarProducto(datos) {

  const { data, error } = await db
    .from('productos_practica')  // la tabla
    .insert([datos])             // insert() siempre recibe un ARRAY de objetos,
                                 // aunque insertes uno solo
    .select();                   // .select() devuelve la fila ya creada (con su id)

  if (error) {
    console.log("Error al agregar:", error);
    return null;
  }

  return data[0];   // data siempre es un array — tomamos la fila recién creada
}

document.getElementById('btn-agregar-producto').addEventListener('click', async () => {
  const respuesta = await agregarProducto(productoPrueba);
  if (respuesta) {
    document.getElementById('notificacion').innerText = 'Producto agregado: ' + 'Producto: ' + respuesta.nombre + ', Precio: ' + respuesta.precio + ', Descripción: ' + respuesta.descripcion;
  } else {
    document.getElementById('notificacion').textContent = 'Error al agregar el producto.';
  }
});



// ─────────────────────────────────────────────────────────────
// FORMULARIO "Nuevo producto" → inserta una fila en Supabase.
// Está FUERA del listener de "Traer productos" para que funcione
// desde que carga la página, sin tener que hacer clic en nada antes.
// ─────────────────────────────────────────────────────────────
document.getElementById('form-producto').addEventListener('submit', async (e) => {
  e.preventDefault();   // evita que el navegador recargue la página al enviar

  const f = e.target;
  const mensaje = document.getElementById('mensaje-form');

  // Armamos el objeto con los tipos que espera la tabla:
  // número, porcentaje→fracción (10 % → 0.10), booleano y array de textos.
  const producto = {
    nombre: f.nombre.value.trim(),
    descripcion: f.descripcion.value.trim(),
    precio: Number(f.precio.value),
    unidades: Number(f.unidades.value),
    descuento: Number(f.descuento.value || 0) / 100,
    disponible: f.disponible.checked,
    categorias: f.categorias.value.split(',').map(c => c.trim()).filter(Boolean),
    Img_url: f.Img_url.value.trim() || null,
  };

  const boton = f.querySelector('button[type="submit"]');
  boton.disabled = true;   // evita doble clic mientras se guarda

  const { data, error } = await db
    .from('productos_practica')
    .insert([producto])   // insert() siempre recibe un ARRAY de objetos
    .select();            // pide de vuelta la fila creada (con su id)

  boton.disabled = false;

  if (error) {
    console.error('Error al guardar:', error);
    mensaje.className = 'error';
    mensaje.textContent = 'Error al guardar: ' + error.message;
    return;
  }

  mensaje.className = 'ok';
  mensaje.textContent = `Producto guardado (id ${data[0].id}): ${data[0].nombre}`;
  f.reset();
});


// ─────────────────────────────────────────────────────────────
// BÚSQUEDA por ID y/o por nombre. Los filtros se aplican en
// Supabase (no en el navegador): solo viajan las filas que coinciden.
// ─────────────────────────────────────────────────────────────

// Devuelve el producto con ese id, o null si no existe (o si hubo error).
async function buscarProductoPorId(id) {
  const { data, error } = await db
    .from('productos_practica')
    .select('*')
    .eq('id', id);          // coincidencia exacta

  if (error) {
    console.log('Error al buscar por id:', error);
    return null;
  }

  return data[0] ?? null;   // data es un array: vacío si no hubo coincidencia
}

// Devuelve un ARRAY con los productos cuyo nombre contiene "texto"
// (sin distinguir mayúsculas). Array vacío si no hay coincidencias o hay error.
async function buscarProductosPorNombre(texto) {
  // Escapamos % _ y \ para que el usuario los escriba como texto normal
  // y no como comodines de ilike.
  const limpio = texto.replace(/[%_\\]/g, '\\$&');

  const { data, error } = await db
    .from('productos_practica')
    .select('*')
    .ilike('nombre', `%${limpio}%`);

  if (error) {
    console.log('Error al buscar por nombre:', error);
    return [];
  }

  return data;
}

const formBuscar = document.getElementById('form-buscar');
const salidaBusqueda = document.getElementById('resultado-busqueda');

formBuscar.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = formBuscar.elements['id'].value.trim();
  const nombre = formBuscar.elements['nombre'].value.trim();

  // Sin ningún criterio no buscamos (evita traer toda la tabla por error).
  if (!id && !nombre) {
    salidaBusqueda.textContent = 'Escribe un ID o un nombre para buscar.';
    return;
  }

  salidaBusqueda.textContent = 'Buscando…';

  let data;
  if (id) {
    const producto = await buscarProductoPorId(Number(id));
    data = producto ? [producto] : [];
    // Si además escribió un nombre, el producto también debe contenerlo.
    if (nombre) data = data.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
  } else {
    data = await buscarProductosPorNombre(nombre);
  }

  if (data.length === 0) {
    salidaBusqueda.textContent = 'No se encontraron productos.';
    return;
  }

  salidaBusqueda.innerHTML = data.map(p => `
    <div class="item-busqueda">
      ${p.Img_url ? `<img src="${p.Img_url}" alt="${p.nombre}" referrerpolicy="no-referrer">` : ''}
      <div>
        <p><strong>#${p.id} · ${p.nombre}</strong></p>
        <p>${p.descripcion}</p>
        <p>$${Number(p.precio).toLocaleString('es-CO')} · ${p.unidades} unidades · ${p.disponible ? 'Disponible' : 'Agotado'}</p>
        <button type="button" class="btn-eliminar" data-id="${p.id}" data-nombre="${p.nombre}">Eliminar</button>
      </div>
    </div>`).join('');
});

formBuscar.addEventListener('reset', () => { salidaBusqueda.innerHTML = ''; });

// ─────────────────────────────────────────────────────────────
// ELIMINAR un producto
// ─────────────────────────────────────────────────────────────
async function eliminarProducto(id) {

  const { data, error } = await db
    .from('productos_practica')
    .delete()
    .eq('id', id)
    .select();       // devuelve las filas borradas: así sabemos si de verdad se borró algo

  if (error) {
    console.log('Error al eliminar:', error);
    return false;
  }

  // Sin error pero sin filas borradas = el id no existe o la política (RLS)
  // de Supabase no permite borrar. Lo tratamos como fallo.
  return data.length > 0;
}

// Un solo listener por contenedor para todos los botones "Eliminar" (se crean
// dinámicamente, así que no se les puede poner un listener a cada uno).
function activarEliminar(contenedor, selectorItem) {
  contenedor.addEventListener('click', async (e) => {
    const boton = e.target.closest('.btn-eliminar');
    if (!boton) return;

    const { id, nombre } = boton.dataset;
    if (!confirm(`¿Eliminar "${nombre}" (id ${id})? Esta acción no se puede deshacer.`)) return;

    boton.disabled = true;
    const eliminado = await eliminarProducto(Number(id));

    if (eliminado) {
      boton.closest(selectorItem).remove();
      if (!contenedor.querySelector(selectorItem)) contenedor.textContent = 'Producto eliminado.';
    } else {
      boton.disabled = false;
      alert('No se pudo eliminar el producto. Revisa la consola (¿falta la política DELETE en Supabase?).');
    }
  });
}

activarEliminar(salidaBusqueda, '.item-busqueda');                      // resultados de búsqueda
activarEliminar(document.getElementById('resultado'), '.tarjeta');      // galería de "Traer productos"


// ─────────────────────────────────────────────────────────────
// Al abrir la página: mostrar los productos de inmediato (sin pulsar nada)
// y cerrar el menú de búsqueda al hacer clic fuera de él.
// ─────────────────────────────────────────────────────────────
document.getElementById('btn-traer').click();

const menuBuscar = document.getElementById('menu-buscar');
document.addEventListener('click', (e) => {
  if (menuBuscar.open && !menuBuscar.contains(e.target)) menuBuscar.open = false;
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') menuBuscar.open = false;
});
