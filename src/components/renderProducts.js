
// Renders a product card for each product in an array. The parameter is an array of products created in the view where the function is used.
export function renderProducts(products) {
  return /* html */`
    <div class="grid grid-cols-3 gap-4">

      ${products.map(p => /* html */`
        <div class="border rounded-lg p-4 shadow-sm">
          <h2 class="text-lg font-bold">${p.name}</h2>
          <p class="text-gray-600 text-sm">${p.shortDescription}</p>
          <p class="text-green-600 font-semibold mt-2">${p.pricePerDay} kr/dag</p>
          <p class="text-gray-400 text-xs mt-1">Tags: ${p.searchWords.join(', ')}</p>
          <button class="toggleCartBtn" data-id="${p.id}">Lägg till</button>
        </div>
      `).join('')}
    </div>
  `;
}