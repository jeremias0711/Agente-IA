// UI logic: renders data from datos.js into #app.
const app = document.getElementById("app");

async function render() {
  try {
    const items = await getItems();
    app.innerHTML = items.length
      ? `<ul>${items.map((i) => `<li>${JSON.stringify(i)}</li>`).join("")}</ul>`
      : "<p>No hay datos todavía.</p>";
  } catch (err) {
    app.innerHTML = `<p>Error: ${err.message}</p>`;
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", render);
