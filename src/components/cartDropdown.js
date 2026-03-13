import { createIcons, Trash2, ShoppingCart } from "lucide";
import { toggleIncluded, removeFromCart } from "../utils/cart.js";

let days = null;

//Renders a visual droppdown cart.
export function renderCartDropdown() {
  return /* html */ `
    <div id="cartDropdown" class="hidden absolute right-0 top-full w-80 bg-white shadow-xl z-50 flex-col p-6">
        
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Din varukorg</h2>
            <button id="closeCart" class="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <div id="cartItems" class="flex-1 overflow-y-auto">
        </div>

        <div class="border-t pt-4 mt-4">
            <p class="text-gray-600">Antal dagar: <input type="number" id="bookDays" min="1" max="30" class="w-16 border rounded px-2 py-1 ml-2"></p>
            <p class="text-lg font-bold mt-2">Totalt: <span id="cartTotal">0</span> kr</p>
            <button id="checkoutBtn" class="w-full mt-4 px-4 py-2 rounded text-white bg-gray-300 cursor-not-allowed" disabled>Gå vidare till checkout</button>
        </div>

    </div>
    `;
}

//Updates the Total amount based on the chosen products pricePerDay and number of bookingDays
async function updateTotal() {
  if (!days || days < 1) {
    document.querySelector("#cartTotal").textContent = 0;
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const response = await fetch("/src/data.json");
  const data = await response.json();

  const total = cart
    .filter((item) => item.included)
    .reduce((sum, item) => {
      const product = data.products.find((p) => p.id === item.id);
      return sum + product.pricePerDay * days;
    }, 0);

  document.querySelector("#cartTotal").textContent = total;
}

// Fetches product data and renders cart items into the dropdown. Attaches event listeners for checkbox and trashcan per item.
async function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsEl = document.querySelector("#cartItems");

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="text-gray-400 text-sm">Din varukorg är tom.</p>`;
    return;
  }

  const response = await fetch("/src/data.json");
  const data = await response.json();

  cartItemsEl.innerHTML = cart
    .map((cartItem) => {
      const product = data.products.find((p) => p.id === cartItem.id);

      return /* html */ `
        <div class="flex items-center gap-3 py-3 border-b" data-id="${product.id}">
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

  createIcons({ icons: { Trash2, ShoppingCart } });

  document.querySelectorAll(".cartItemCheckbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const productId = checkbox.closest("[data-id]").dataset.id;
      toggleIncluded(productId);
      updateTotal();
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
export function initCartDropdown() {
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

  document.addEventListener("cartUpdated", renderCartItems);

  const daysInput = document.querySelector("#bookDays");

  daysInput.addEventListener("input", () => {
    const parsed = parseInt(daysInput.value);

    if (isNaN(parsed) || daysInput.value === "") {
      days = null;
      updateTotal();
      return;
    }

    if (parsed > 30) {
      daysInput.value = 30;
      days = 30;
      updateTotal();
      return;
    }

    days = parsed;
    updateTotal();
  });
}
