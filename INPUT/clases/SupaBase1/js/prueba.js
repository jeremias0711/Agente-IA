// Minimal test: click the button, fetch rows from "productos", show them.
const btnTraer = document.getElementById("btn-traer");
const resultado = document.getElementById("resultado");

btnTraer.addEventListener("click", async () => {
  const { data, error } = await db.from("productos").select("*");

  if (error) {
    resultado.textContent = "Error: " + error.message;
    return;
  }
  resultado.textContent = JSON.stringify(data, null, 2);
});
