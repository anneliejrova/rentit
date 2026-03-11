import data from "../data.json";

//Renders product cards based on ids from URL
export async function render(route, id) {
  const ids = id ? id.split(",") : [];
  const products = data.products.filter((p) => ids.includes(p.id));

  if (products.length === 0) {
    return /*html*/ `<div class="px-4"><p>Inga produkter hittades</p></div>`;
  }

  return /*html*/ `
    <div class="px-4">
      <h1 class="text-center py-4">Sökresultat</h1>
      <div class="grid grid-cols-3 gap-4">
        ${products
          .map(
            (product) => `
          <div class="border rounded-lg p-4">
            <h2 class="font-bold">${product.name}</h2>
            <p class="text-gray-500">${product.shortDescription}</p>
            <p class="font-bold mt-2">${product.pricePerDay} kr/dag</p>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}
