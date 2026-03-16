const CARD_MIN = '220px'; // var 330px

// Renders a single product card.
function renderProductCard(p) {
    return /* html */`
        <div class="border rounded-2xl flex flex-col shadow-lg"
             style="
                min-height: clamp(130px, 7vw, 180px);
                padding: clamp(0.75rem, 1.5vw, 1.75rem);
                gap: clamp(0.6rem, 1vw, 1rem);
             ">
            <h2 class="font-bold text-base">${p.name}</h2>
            <p class="text-sm leading-relaxed" style="color: var(--site-secondary-txt)">${p.shortDescription}</p>
            <p class="font-semibold text-base mt-auto text-right">${p.pricePerDay} kr/dag</p>
            <button class="toggleCartBtn ml-auto block" data-id="${p.id}">Lägg till</button>
        </div>
    `;
}

// Renders a grid of product cards from an array of products.
export function renderProducts(products) {
    return /* html */`
        <div class="w-300 mx-auto p-4 gap-8 grid"
             style="
                grid-template-columns: repeat(auto-fill, minmax(min(${CARD_MIN}, 100%), 1fr));
             ">
            ${products.map(renderProductCard).join('')}
        </div>
    `;
}