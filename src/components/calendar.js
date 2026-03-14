import { mergeAvailableDates, getItemsForProduct, MAX_MONTHS_AHEAD } from '../utils/availability.js';
import { getData } from '../utils/data.js';

// Renders the calendar skeleton for a given product and month.
// Parameters: productId - string, year - number, month - number (0-11).
export function renderCalendar(productId, year = new Date().getFullYear(), month = new Date().getMonth()) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", 
                        "Juli", "Augusti", "September", "Oktober", "November", "December"];

    const dayNames = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

    return /* html */`
    <div id="calendar" class="w-full mt-4">
        
        <div class="flex justify-between items-center mb-2">
            <button id="prevMonth" class="px-2 py-1 text-gray-400 hover:text-black">‹</button>
            
            <select id="monthSelect" class="text-sm font-semibold border rounded px-2 py-1">
                ${Array.from({ length: MAX_MONTHS_AHEAD }, (_, i) => {
                    const d = new Date(currentYear, currentMonth + i);
                    const val = `${d.getFullYear()}-${d.getMonth()}`;
                    const selected = d.getFullYear() === year && d.getMonth() === month ? "selected" : "";
                    return `<option value="${val}" ${selected}>${monthNames[d.getMonth()]} ${d.getFullYear()}</option>`;
                }).join("")}
            </select>

            <button id="nextMonth" class="px-2 py-1 text-gray-400 hover:text-black">›</button>
        </div>

        <div class="grid grid-cols-7 text-center text-xs text-gray-400 mb-1">
            ${dayNames.map(d => `<div>${d}</div>`).join("")}
        </div>

        <div id="calendarDays" class="grid grid-cols-7 text-center text-sm">
        </div>

    </div>
    `;
}

// Renders the days of a month with availability highlighting.
// Parameters: productId - string, bookDays - number|null, year - number, month - number (0-11).
async function renderDays(productId, bookDays, year, month) {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    let availableDates = [];

    if (bookDays) {
        const data = await getData();
        const units = getItemsForProduct(data.units, productId);
        const merged = mergeAvailableDates(units, bookDays, year, month);
        availableDates = merged.map(d => d.date);
    }

    const emptySlots = Array(startOffset).fill(`<div></div>`).join("");

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split("T")[0];
        const isPast = date < today;
        const isAvailable = availableDates.includes(dateStr);

        if (isPast || !isAvailable) {
            return `<div class="py-1 text-gray-300 cursor-not-allowed">${day}</div>`;
        }

        return `<div class="py-1 text-black cursor-pointer hover:ring-1 hover:ring-gray-300 rounded-full calendarDay" data-date="${dateStr}">${day}</div>`;
    }).join("");

    return emptySlots + days;
}

// Initializes the calendar — fills in days and sets up month navigation.
// Parameters: productId - string, bookDays - number|null, year - number, month - number (0-11).
export async function initCalendar(productId, bookDays, year = new Date().getFullYear(), month = new Date().getMonth()) {
    const calendarDays = document.querySelector("#calendarDays");
    if (!calendarDays) return;

    calendarDays.innerHTML = await renderDays(productId, bookDays, year, month);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const maxDate = new Date(currentYear, currentMonth + MAX_MONTHS_AHEAD, 1);

    document.querySelector("#prevMonth").addEventListener("click", () => {
        const newDate = new Date(year, month - 1);
        if (newDate < new Date(currentYear, currentMonth)) return;
        initCalendar(productId, bookDays, newDate.getFullYear(), newDate.getMonth());
    });

    document.querySelector("#nextMonth").addEventListener("click", () => {
        const newDate = new Date(year, month + 1);
        if (newDate >= maxDate) return;
        initCalendar(productId, bookDays, newDate.getFullYear(), newDate.getMonth());
    });

    document.querySelector("#monthSelect").addEventListener("change", (e) => {
        const [y, m] = e.target.value.split("-").map(Number);
        initCalendar(productId, bookDays, y, m);
    });
}