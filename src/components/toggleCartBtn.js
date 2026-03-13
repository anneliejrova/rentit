import { addToCart, removeFromCart } from "../utils/cart.js";

const baseClasses = ["px-4", "py-2", "rounded", "text-white"];
const addClasses = ["bg-cyan-400", "hover:bg-cyan-600"];
const removeClasses = ["bg-fuchsia-700", "hover:bg-fuchsia-900"];

// Syncs all toggle buttons with current cart state in localStorage.
function syncToggleBtns() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const buttons = document.querySelectorAll(".toggleCartBtn");

  buttons.forEach((btn) => {
    const inCart = cart.some((item) => item.id === btn.dataset.id);

    if (inCart) {
      btn.textContent = "Ta bort";
      btn.classList.remove(...addClasses);
      btn.classList.add(...removeClasses);
    } else {
      btn.textContent = "Lägg till";
      btn.classList.remove(...removeClasses);
      btn.classList.add(...addClasses);
    }
  });
}

// Initializes toggle buttons for each product card. Sets initial state based on cart in localStorage and listens for cart changes.
export function initToggleCartBtns() {
  const buttons = document.querySelectorAll(".toggleCartBtn");
  if (!buttons.length) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  buttons.forEach((btn) => {
    btn.classList.add(...baseClasses);

    const inCart = cart.some((item) => item.id === btn.dataset.id);

    if (inCart) {
      btn.textContent = "Ta bort";
      btn.classList.add(...removeClasses);
    } else {
      btn.textContent = "Lägg till";
      btn.classList.add(...addClasses);
    }

    // Adds or removes product from cart on click.
    btn.addEventListener("click", () => {
      const currentlyInCart = JSON.parse(
        localStorage.getItem("cart") || "[]",
      ).some((item) => item.id === btn.dataset.id);

      if (!currentlyInCart) {
        addToCart(btn.dataset.id);
      } else {
        removeFromCart(btn.dataset.id);
      }
    });
  });

  document.addEventListener("cartUpdated", syncToggleBtns);
}
