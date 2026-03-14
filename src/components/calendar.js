import { mergeAvailableDates, getItemsForProduct, MAX_MONTHS_AHEAD } from '../utils/availability.js';

// Renders a calendar for a given product and month.
// Parameters: productId - string, bookDays - number, year - number, month - number (0-11).
export function renderCalendar(productId, bookDays, year = new Date().getFullYear(), month = new Date().getMonth()) {
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
            ${renderDays(productId, bookDays, year, month)}
        </div>

    </div>
    `;
}