
// Renders a product card for each product in an array. The parameter is an array of products created in the view where the function is used.
export function renderProducts(products) {
  return /* html */`
    <div class="grid md:grid-cols-3 gap-4 text-[var(--secondary-color)]">

      ${products.map(p => /* html */`
        <div class="border rounded-lg p-4 shadow-sm flex flex-col h-full bg-[var(--accent-light)]">
          <h2 class="text-xl font-bold">${p.name}</h2>
          <p class="text-sm">${p.shortDescription}</p>
          <p class= "font-semibold mt-2">${p.pricePerDay} kr/dag</p>
          <button class="toggleCartBtn mt-auto" data-id="${p.id}">Lägg till</button>
        </div>
      `).join('')}
    </div>
  `;
}