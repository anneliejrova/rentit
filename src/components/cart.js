// Gets the cart from localStorage, returns empty array if it doesn't exists.
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Saves the cart array to localStorage and notifies all listeners
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent("cartUpdated"));
}

// Adds a product id to the cart. Parameter is productId - string id of the product to add.
export function addToCart(productId) {
    const cart = getCart();
    cart.push({ id: productId, included: true });
    saveCart(cart);
}

// Removes a product id from the cart. Clears localStorage if cart becomes empty. Parameter is the same productId as above.
export function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);

    if (cart.length === 0) {
        localStorage.removeItem("cart");
        document.dispatchEvent(new CustomEvent("cartUpdated"));
    } else {
        saveCart(cart);
    }

}