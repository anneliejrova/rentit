import { escapeHtml } from './helpers.js';

// Sanitizes and validates user input from checkout form.
// Returns sanitized object or null if required fields are missing.
export function sanitizeBookingData() {
    const name = escapeHtml(document.querySelector("#checkoutFirstName")?.value.trim());
    const lastName = escapeHtml(document.querySelector("#checkoutLastName")?.value.trim());
    const email = escapeHtml(document.querySelector("#checkoutEmail")?.value.trim());
    const phone = escapeHtml(document.querySelector("#checkoutPhone")?.value.trim());
    const address = escapeHtml(document.querySelector("#checkoutAddress")?.value.trim());
    const zip = escapeHtml(document.querySelector("#checkoutZip")?.value.trim());
    const city = escapeHtml(document.querySelector("#checkoutCity")?.value.trim());

    // Validate required fields
    if (!name || !lastName || !email || !address || !zip || !city) return null;

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
    if (!hold) return;

    const customerData = sanitizeBookingData();
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
    const updatedCart = cart.filter(item => !item.included);

    if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
    } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    clearHold();
}

// Returns end date string given a start date and number of days.
// Parameters: startDate - string YYYY-MM-DD, days - number.
function getEndDate(startDate, days) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days - 1);
    return date.toISOString().split("T")[0];
}