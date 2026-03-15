import { getHold, clearHold, confirmBooking } from '../utils/checkout.js';
import { getData } from '../utils/data.js';
import { navigate } from '../router.js';

const SHIPPING_PRICE = 149;

// Renders the checkout view with booking summary, address form, shipping and payment options.
export async function render() {
    const hold = getHold();
    const data = await getData();

    if (!hold) {
        navigate('home');
        return '';
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const includedProducts = cart.filter(item => item.included);
    const products = data.products.filter(p => includedProducts.some(i => i.id === p.id));

    const startDate = new Date(hold.startDate);
    const endDate = new Date(hold.startDate);
    endDate.setDate(endDate.getDate() + hold.bookDays - 1);

    const formatDate = (d) => d.toLocaleDateString('sv-SE');

    const totalPrice = products.reduce((sum, p) => sum + p.pricePerDay * hold.bookDays, 0);

    return /* html */`
    <div class="max-w-lg mx-auto p-6">

        <div class="border rounded-lg p-4 mb-6">
            <h2 class="font-bold text-lg mb-3">Bokningssammanfattning</h2>
            ${products.map(p => `
                <div class="flex justify-between text-sm py-1">
                    <span>${p.name}</span>
                    <span>${p.pricePerDay * hold.bookDays} kr</span>
                </div>
            `).join("")}
            <div class="flex justify-between text-sm text-gray-500 mt-2 pt-2 border-t">
                <span>${formatDate(startDate)} — ${formatDate(endDate)}</span>
                <span>${hold.bookDays} dagar</span>
            </div>
        </div>

        <div class="border rounded-lg p-4 mb-6">
            <h2 class="font-bold text-lg mb-3">Kontaktuppgifter</h2>
            <div class="flex flex-col gap-3">
                <input type="text" id="checkoutFirstName" placeholder="Förnamn" class="border rounded px-3 py-2 text-sm">
                <input type="text" id="checkoutLastName" placeholder="Efternamn" class="border rounded px-3 py-2 text-sm">
                <input type="text" id="checkoutEmail" placeholder="Email" class="border rounded px-3 py-2 text-sm">
                <input type="tel" id="checkoutPhone" placeholder="Telefonnummer" class="border rounded px-3 py-2 text-sm">
                <input type="text" id="checkoutAddress" placeholder="Adress" class="border rounded px-3 py-2 text-sm">
                <div class="flex gap-3">
                    <input type="text" id="checkoutZip" placeholder="Postnummer" class="border rounded px-3 py-2 text-sm w-1/3">
                    <input type="text" id="checkoutCity" placeholder="Stad" class="border rounded px-3 py-2 text-sm flex-1">
                </div>
            </div>
        </div>

        <div class="border rounded-lg p-4 mb-6">
            <h2 class="font-bold text-lg mb-3">Leverans</h2>
            <label class="flex items-center gap-3 py-2 cursor-pointer w-full">
    <input type="radio" name="shipping" value="pickup" checked class="w-4 h-4">
    <span class="text-sm">Upphämtning — 0 kr</span>
</label>
<label class="flex items-center gap-3 py-2 cursor-pointer w-full">
    <input type="radio" name="shipping" value="delivery" class="w-4 h-4">
    <span class="text-sm">Leverans — ${SHIPPING_PRICE} kr</span>
</label>
        </div>

        <div class="border rounded-lg p-4 mb-6">
            <h2 class="font-bold text-lg mb-3">Betalning</h2>
            <div class="flex flex-col gap-2">
                ${["Kort", "Swish", "PayPal", "Google Pay"].map(method => `
                    <label class="flex items-center gap-3 py-2 cursor-pointer">
                        <input type="radio" name="payment" value="${method.toLowerCase()}" class="w-4 h-4">
                        <span class="text-sm">${method}</span>
                    </label>
                `).join("")}
            </div>
        </div>

        <div class="border rounded-lg p-4 mb-6">
            <div class="flex justify-between font-bold text-lg">
                <span>Totalt</span>
                <span id="checkoutTotal" data-base="${totalPrice}">${totalPrice} kr</span>
            </div>
            <p id="shippingNote" class="text-xs text-gray-400 mt-1">Exkl. leverans</p>
        </div>

        <div class="mb-6">
            <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" id="termsCheckbox" class="w-4 h-4">
                <span class="text-sm">Jag godkänner bokningsvillkoren</span>
            </label>
        </div>

        <div id="checkoutTimer" class="text-center text-sm text-gray-500 mb-4"></div>

        <div class="flex gap-3">
            <button id="cancelBtn" class="flex-1 px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">Avbryt</button>
            <button id="bookNowBtn" class="flex-1 px-4 py-2 rounded text-white bg-gray-300 cursor-not-allowed" disabled>Boka nu</button>
        </div>

    </div>
    `;
}

// Initializes checkout — countdown timer, shipping toggle, terms checkbox and buttons.
export function initCheckout() {
    const hold = getHold();
    if (!hold) return;

    // Start countdown timer based on hold expiry time.
    const timerEl = document.querySelector("#checkoutTimer");
    const expiresAt = new Date(hold.expiresAt).getTime();

    const countdown = setInterval(() => {
        const remaining = expiresAt - Date.now();
        if (remaining <= 0) {
            clearInterval(countdown);
            clearHold();
            timerEl.textContent = "Din reservation har gått ut.";
            document.querySelector("#bookNowBtn").disabled = true;
            return;
        }
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        timerEl.textContent = `Din reservation är giltig i ${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);

    // Update total price when shipping option changes.
   document.querySelectorAll("input[name='shipping']").forEach(radio => {
    radio.addEventListener("change", () => {
        const base = parseInt(document.querySelector("#checkoutTotal").dataset.base);
        const shipping = radio.value === "delivery" ? SHIPPING_PRICE : 0;
        document.querySelector("#checkoutTotal").textContent = `${base + shipping} kr`;
        document.querySelector("#shippingNote").textContent = 
            radio.value === "delivery" ? "Inkl. leverans" : "Exkl. leverans";
    });
});

    // Activate Book Now button when terms are accepted.
    document.querySelector("#termsCheckbox").addEventListener("change", (e) => {
        const bookNowBtn = document.querySelector("#bookNowBtn");
        if (e.target.checked) {
            bookNowBtn.classList.remove("bg-gray-300", "cursor-not-allowed");
            bookNowBtn.classList.add("bg-fuchsia-700", "cursor-pointer", "hover:bg-fuchsia-900");
            bookNowBtn.disabled = false;
        } else {
            bookNowBtn.classList.add("bg-gray-300", "cursor-not-allowed");
            bookNowBtn.classList.remove("bg-fuchsia-700", "cursor-pointer", "hover:bg-fuchsia-900");
            bookNowBtn.disabled = true;
        }
    });

    // Cancel button clears hold and navigates home.
    document.querySelector("#cancelBtn").addEventListener("click", () => {
        clearInterval(countdown);
        clearHold();
        navigate("home");
    });

    // Book Now button confirms booking and navigates home.
    document.querySelector("#bookNowBtn").addEventListener("click", async () => {
        clearInterval(countdown);
        await confirmBooking();
        navigate("confirmation");
    });
}