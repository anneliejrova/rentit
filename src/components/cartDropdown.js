import { createIcons, icons} from "lucide";
import { toggleIncluded, removeFromCart } from "../utils/cart.js";
import { getData } from "../utils/data.js";
import { renderCalendar, initCalendar, resetSelection } from "./calendar.js";
import { assignUnits } from "../utils/availability.js";
import { writeHold } from "../utils/checkout.js";

let days = null;
let currentSelectedDate = null;

//Renders a visual dropdown cart.
export function renderCartDropdown() {
  return /* html */ `
<div id="cartDropdown" class="hidden absolute right-0 top-full w-80 bg-white shadow-xl z-50 flex-col flex-1 space-y-2 p-6 max-h-[65vh] overflow-y-auto">
    
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">Din varukorg</h2>
        <button id="closeCart" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
    </div>

    <p class="text-gray-900 font-bold text-1 text-center">Välj produkter och dagar för att se <br> lediga startdatum för din bokning<p>

    <div id="cartItems" class="flex-1">
    </div>

    <div class="border-t pt-6 mt-4">
        <p class="text-gray-600">Antal dagar: <input type="number" id="bookDays" min="1" max="30" class="w-16 border rounded px-2 py-1 ml-2 mb-5"></p>
        ${renderCalendar()}
        <p class="text-lg font-bold mt-2">Totalt: <span id="cartTotal">0</span> kr</p>
        <button id="checkoutBtn" class="w-full mt-4 px-4 py-2 rounded text-white bg-gray-300 cursor-not-allowed" disabled>Gå vidare till checkout</button>
    </div>

</div>
    `;
}

// Updates the total amount based on included products pricePerDay and bookDays.
async function updateTotal() {
  if (!days || days < 1) {
    document.querySelector("#cartTotal").textContent = 0;
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const data = await getData();

  const total = cart
    .filter((item) => item.included)
    .reduce((sum, item) => {
      const product = data.products.find((p) => p.id === item.id);
      return sum + product.pricePerDay * days;
    }, 0);

  document.querySelector("#cartTotal").textContent = total;
}

// Resets checkout button state and clears calendar selection.
function resetCheckout() {
  const checkoutBtn = document.querySelector("#checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.classList.add("bg-gray-300", "cursor-not-allowed");
    checkoutBtn.classList.remove("bg-fuchsia-700", "cursor-pointer", "hover:bg-fuchsia-900");
    checkoutBtn.disabled = true;
  }
  currentSelectedDate = null;
  resetSelection();
}

// Fetches product data and renders cart items into the dropdown.
// Attaches event listeners for checkbox and trashcan per item.
async function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsEl = document.querySelector("#cartItems");

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="text-gray-400 text-sm">Din varukorg är tom.</p>`;
    return;
  }

  const data = await getData();

  cartItemsEl.innerHTML = cart
    .map((cartItem) => {
      const product = data.products.find((p) => p.id === cartItem.id);

      return /* html */ `
        <div class="flex items-center gap-3 py-3 border-b last:border-b-0" data-id="${product.id}">
            <input type="checkbox" ${cartItem.included ? "checked" : ""} class="cartItemCheckbox">
            <div class="flex-1">
                <p class="font-semibold text-sm">${product.name}</p>
                <p class="text-gray-500 text-xs">${product.pricePerDay} kr/dag</p>
            </div>
            <button class="cartItemRemove text-gray-500 hover:text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
        `;
    })
    .join("");

  createIcons({ icons });

  document.querySelectorAll(".cartItemCheckbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const productId = checkbox.closest("[data-id]").dataset.id;
      toggleIncluded(productId);
      updateTotal();
      resetCheckout();
      initCalendar(days);
    });
  });

  document.querySelectorAll(".cartItemRemove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.closest("[data-id]").dataset.id;
      removeFromCart(productId);
    });
  });

  updateTotal();
}

// Initiates the cartDropdown, handles open/close and listens to cart and day changes.
export async function initCartDropdown() {
  const cartIcon = document.querySelector("#cartIcon");
  const dropdown = document.querySelector("#cartDropdown");
  const closeBtn = document.querySelector("#closeCart");

  cartIcon.addEventListener("click", () => {
    dropdown.classList.remove("hidden");
    dropdown.classList.add("flex");
    renderCartItems();
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.remove("flex");
    dropdown.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !cartIcon.contains(e.target)) {
      dropdown.classList.remove("flex");
      dropdown.classList.add("hidden");
    }
  });

  document.addEventListener("cartUpdated", async () => {
    await renderCartItems();
    resetCheckout();
    await initCalendar(days);
  });

  document.addEventListener("dateSelected", (e) => {
    currentSelectedDate = e.detail.date;
    const checkoutBtn = document.querySelector("#checkoutBtn");
    checkoutBtn.classList.remove("bg-gray-300", "cursor-not-allowed");
    checkoutBtn.classList.add("bg-fuchsia-700", "cursor-pointer", "hover:bg-fuchsia-900");
    checkoutBtn.disabled = false;
  });

  document.querySelector("#checkoutBtn").addEventListener("click", async (e) => {
    e.stopPropagation();

    const data = await getData();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const includedProducts = cart.filter(item => item.included);
    const products = data.products.filter(p => includedProducts.some(i => i.id === p.id));

    const assignedUnits = assignUnits(products, data.units, currentSelectedDate, days);

    const hold = {
      id: crypto.randomUUID(),
      startDate: currentSelectedDate,
      bookDays: days,
      assignments: assignedUnits,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    };

    writeHold(hold);
    document.dispatchEvent(new CustomEvent("checkoutStarted", { detail: hold }));

    dropdown.classList.remove("flex");
    dropdown.classList.add("hidden");
  });

  const daysInput = document.querySelector("#bookDays");

  daysInput.addEventListener("input", async () => {
    const parsed = parseInt(daysInput.value);

    if (isNaN(parsed) || daysInput.value === "") {
      days = null;
      updateTotal();
      resetCheckout();
      await initCalendar(days);
      return;
    }

    if (parsed > 30) {
      daysInput.value = 30;
      days = 30;
      updateTotal();
      resetCheckout();
      await initCalendar(days);
      return;
    }

    days = parsed;
    updateTotal();
    resetCheckout();
    await initCalendar(days);
  });

  await initCalendar(days);
}