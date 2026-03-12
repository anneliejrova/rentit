import { renderProducts } from "../components/renderProducts.js";

//Renders product cards based on ids from URL
export async function render(route, id) {
  const response = await fetch("./src/data.json");
  const data = await response.json();

  const ids = id ? id.split(",") : [];
  const products = data.products.filter((p) => ids.includes(p.id));

  if (products.length === 0) {
    return `<div class="px-4"><p>Inga produkter hittades</p></div>`;
  }

  return /*html*/ `
    <div class="px-4">
      <h1 class="text-center py-4">Sökresultat</h1>
      ${renderProducts(products)}
    </div>
  `;
}
