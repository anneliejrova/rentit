// Writes a hold object to localStorage.
export function writeHold(hold) {
    localStorage.setItem("hold", JSON.stringify(hold));
}

// Clears the hold from localStorage.
export function clearHold() {
    localStorage.removeItem("hold");
}

// Returns the current hold from localStorage, or null if none exists.
export function getHold() {
    return JSON.parse(localStorage.getItem("hold"));
}