import { escapeHtml } from './helpers.js';

export function sanitizeBookingData() {
    const name = escapeHtml(document.querySelector("#checkoutFirstName")?.value.trim());
    const lastName = escapeHtml(document.querySelector("#checkoutLastName")?.value.trim());
    const email = escapeHtml(document.querySelector("#checkoutEmail")?.value.trim());
    const phone = escapeHtml(document.querySelector("#checkoutPhone")?.value.trim());
    const address = escapeHtml(document.querySelector("#checkoutAddress")?.value.trim());
    const zip = escapeHtml(document.querySelector("#checkoutZip")?.value.trim());
    const city = escapeHtml(document.querySelector("#checkoutCity")?.value.trim());

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}$/;
    const phoneRegex = /^[0-9+\s()-]{7,15}$/;
    const nameRegex = /^[a-zA-ZåäöÅÄÖ\s-]{2,}$/;

    const errors = [];
    if (!name || !nameRegex.test(name)) errors.push("Förnamn (endast bokstäver)");
    if (!lastName || !nameRegex.test(lastName)) errors.push("Efternamn (endast bokstäver)");
    if (!email || !emailRegex.test(email)) errors.push("E-post (ogiltigt format)");
    if (phone && !phoneRegex.test(phone)) errors.push("Telefonnummer (ogiltigt format)");
    if (!address) errors.push("Adress");
    if (!zip || !zipRegex.test(zip)) errors.push("Postnummer (5 siffror)");
    if (!city || !nameRegex.test(city)) errors.push("Stad (endast bokstäver)");

    if (errors.length > 0) {
        const errorEl = document.querySelector("#checkoutErrors");
        if (errorEl) errorEl.textContent = `Vänligen fyll i: ${errors.join(", ")}`;
        return null;
    }

    const errorEl = document.querySelector("#checkoutErrors");
    if (errorEl) errorEl.textContent = "";

    return { name, lastName, email, phone, address, zip, city };
}

// Writes a hold object to localStorage.
// Parameter: hold - hold object with id, startDate, bookDays, assignments and expiresAt.
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

// Confirms booking — sanitizes customer data, moves hold to bookings array, creates service entries, clears hold.
export async function confirmBooking() {
    const hold = getHold();
    console.log("hold:", hold);
    if (!hold) return;

    const customerData = sanitizeBookingData();
    console.log("customerData:", customerData);
    if (!customerData) return;

    const { getData } = await import('./data.js');
    const data = await getData();

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const service = JSON.parse(localStorage.getItem("service")) || [];

    hold.assignments.forEach(assignment => {
        bookings.push({
            id: crypto.randomUUID(),
            unitId: assignment.unitId,
            productId: assignment.productId,
            startDate: hold.startDate,
            endDate: getEndDate(hold.startDate, hold.bookDays),
            status: "confirmed",
            customer: customerData
        });

        const unit = data.units.find(u => u.id === assignment.unitId);
        if (unit) {
            const bufferDays = unit.maintenanceRequirement.bufferDays;
            service.push({
                id: crypto.randomUUID(),
                unitId: assignment.unitId,
                startDate: getEndDate(hold.startDate, hold.bookDays + 1),
                endDate: getEndDate(hold.startDate, hold.bookDays + bufferDays)
            });
        }
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("service", JSON.stringify(service));

    // Remove included products from cart after booking.
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("cart before filter:", cart);
    const updatedCart = cart.filter(item => !item.included);
     console.log("cart after filter:", updatedCart)

    if (updatedCart.length === 0) {
        localStorage.removeItem("cart");    
    } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    clearHold();
    return true;
}

// Returns end date string given a start date and number of days.
// Parameters: startDate - string YYYY-MM-DD, days - number.
function getEndDate(startDate, days) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days - 1);
    return date.toISOString().split("T")[0];
}