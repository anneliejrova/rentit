import { addToCart, removeFromCart } from "./cart.js";

const baseClasses = ["px-4", "py-2", "rounded", "text-white"];
const addClasses = ["bg-cyan-400", "hover:bg-cyan-600"];
const removeClasses = ["bg-fuchsia-700", "hover:bg-fuchsia-900"];

//toggles button to ad or rempove fropm cart
export function initToggleCartBtns() {
    const buttons = document.querySelectorAll(".toggleCartBtn");
    if (!buttons.length) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];


    //checks if item is in cart before rendering the first version of the button, listens for change
    buttons.forEach(btn => {
        let added = cart.includes(btn.dataset.id);

        if (added) {
            btn.textContent = "Ta bort";
            btn.classList.add(...baseClasses, ...removeClasses);
        } else {
            btn.textContent = "Lägg till";
            btn.classList.add(...baseClasses, ...addClasses);
        }

        btn.addEventListener("click", () => {
            added = !added;

            if (added) {
                addToCart(btn.dataset.id);
                btn.textContent = "Ta bort";
                btn.classList.remove(...addClasses);
                btn.classList.add(...removeClasses);
            } else {
                removeFromCart(btn.dataset.id);
                btn.textContent = "Lägg till";
                btn.classList.remove(...removeClasses);
                btn.classList.add(...addClasses);
            }
        });
    });
}