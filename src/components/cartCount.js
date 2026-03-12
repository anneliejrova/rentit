//Counter of items in the cart, checks and listens to changes in the cart in localstorage
export function initCartCount() {
    const badge = document.querySelector("#cartBadge");
    if (!badge) return;

    function updateCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        badge.textContent = cart.length;
        badge.classList.toggle("hidden", cart.length === 0);
    }

    updateCount();
    document.addEventListener("cartUpdated", updateCount);
}