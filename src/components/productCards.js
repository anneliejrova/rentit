// Renders a single product card.
function renderProductCard(p) {
    return /* html */`
        <div class="border rounded-lg p-4 shadow-sm flex flex-col h-full bg-[var(--accent-light)]">
            <h2 class="text-xl font-bold">${p.name}</h2>
            <p class="text-sm">${p.shortDescription}</p>
            <p class="font-semibold mt-2">${p.pricePerDay} kr/dag</p>
            <button class="toggleCartBtn mt-auto" data-id="${p.id}">Lägg till</button>
        </div>
    `;
}

// Renders a grid of product cards from an array of products.
export function renderProducts(products) {
    return /* html */`
        <div class="grid md:grid-cols-3 gap-4">
            ${products.map(p => renderProductCard(p)).join('')}
        </div>
    `;
}