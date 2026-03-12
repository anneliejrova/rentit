export function renderCartDropdown() {
    return /* html */`
    <div id="cartDropdown" class="hidden absolute right-0 top-full w-80 bg-white shadow-xl z-50 flex-col p-6">
        
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Din varukorg</h2>
            <button id="closeCart" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <div id="cartItems" class="flex-1 overflow-y-auto">
            <!-- produkter renderas här -->
        </div>

        <div class="border-t pt-4 mt-4">
            <p class="text-gray-600">Antal dagar: <input type="number" id="cartDays" min="1" max="30" class="w-16 border rounded px-2 py-1 ml-2"></p>
            <p class="text-lg font-bold mt-2">Totalt: <span id="cartTotal">0</span> kr</p>
            <button id="checkoutBtn" class="w-full mt-4 px-4 py-2 rounded text-white bg-gray-300 cursor-not-allowed" disabled>Gå vidare till checkout</button>
        </div>

    </div>
    `;
}

export function initCartDropdown() {
    const cartIcon = document.querySelector("#cartIcon");
    const dropdown = document.querySelector("#cartDropdown");
    const closeBtn = document.querySelector("#closeCart");

    // Open cartDropdown
    cartIcon.addEventListener("click", () => {
        dropdown.classList.remove("hidden");
        dropdown.classList.add("flex");
    });

    // Close cartDropdown with X
    closeBtn.addEventListener("click", () => {
        dropdown.classList.remove("flex");
        dropdown.classList.add("hidden");
    });

    // Close cartDropdown with click outside
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && !cartIcon.contains(e.target)) {
            dropdown.classList.remove("flex");
            dropdown.classList.add("hidden");
        }
    });
}