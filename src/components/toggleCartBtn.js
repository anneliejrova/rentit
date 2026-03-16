import { addToCart, removeFromCart } from "../utils/cart.js";

const baseClasses = ["px-4", "py-2", "rounded", "text-white", "ring-2", "bold"];

// Syncs all toggle buttons with current cart state in localStorage.
function syncToggleBtns() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const buttons = document.querySelectorAll(".toggleCartBtn");

  buttons.forEach((btn) => {
    const inCart = cart.some((item) => item.id === btn.dataset.id);

    if (inCart) {
      btn.textContent = "Ta bort";
      btn.style.backgroundColor = "var(--accent-light)";
      btn.style.color = "var(--accent)";
    } else {
      btn.textContent = "Lägg till";
      btn.style.backgroundColor = "var(--accent)";
      btn.style.color = "var(--accent-light)";
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
      btn.style.color = "var(--accent)";
      btn.style.backgroundColor = "var(--accent-light)";
    } else {
      btn.textContent = "Lägg till";
      btn.style.color = "var(--accent-light)";
      btn.style.backgroundColor = "var(--accent)";
    }

   btn.addEventListener("mouseenter", () => {
    btn.style.filter = "brightness(0.85)";
});

btn.addEventListener("mouseleave", () => {
    btn.style.filter = "brightness(1)";
});

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