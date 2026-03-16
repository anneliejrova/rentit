const CARD_MIN = '330px';

// Renders a single product card.
function renderProductCard(p) {
    return /* html */`
        <div class="border rounded-2xl flex flex-col shadow-lg"
             style="
                min-height: clamp(200px, 30vw, 350px);
                padding: clamp(1rem, 2vw, 2.5rem);
                gap: clamp(1rem, 1.5vw, 1.5rem);
             ">
            <h2 class="font-bold text-2xl">${p.name}</h2>
            <p class="text-l leading-relaxed" style="color: var(--site-secondary-txt)">${p.shortDescription}</p>
            <p class="font-semibold text-lg mt-auto text-right">${p.pricePerDay} kr/dag</p>
            <button class="toggleCartBtn ml-auto block" data-id="${p.id}">Lägg till</button>
        </div>
    `;
}

// Renders a grid of product cards from an array of products.
export function renderProducts(products) {
    return /* html */`
        <div class="w-full mx-auto p-4 gap-[3rem] grid"
             style="
                max-width: 80vw;
                grid-template-columns: repeat(auto-fill, minmax(min(${CARD_MIN}, 100%), 1fr));
             ">
            ${products.map(renderProductCard).join('')}
        </div>
    `;
}