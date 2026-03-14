export const MAX_MONTHS_AHEAD = 6;

// Returns all units for a given productId.
// Parameter: units - array of all units, productId - string id of the product.
export function getItemsForProduct(units, productId) {
    return units.filter(unit => unit.productId === productId);
}

// Returns all blocked periods for a given unit from bookings and service in localStorage.
// Parameter: unitId - string id of the unit.
export function getBlockedPeriods(unitId) {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const service = JSON.parse(localStorage.getItem("service")) || [];

    const unitBookings = bookings.filter(b => b.unitId === unitId);
    const unitService = service.filter(s => s.unitId === unitId);

    return [...unitBookings, ...unitService].map(period => ({
        startDate: period.startDate,
        endDate: period.endDate
    }));
}

// Returns available start dates for a unit given bookDays for a specific month.
// Parameters: unit - unit object, bookDays - number of booking days, year - number, month - number (0-11).
export function getAvailableStartDates(unit, bookDays, year, month) {
    const blockedPeriods = getBlockedPeriods(unit.id);
    const totalDays = bookDays + unit.maintenanceRequirement.bufferDays;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    const startFrom = monthStart < today ? today : monthStart;

    const availableStartDates = [];

    let current = new Date(startFrom);

    while (current <= monthEnd) {
        const periodStart = new Date(current);
        const periodEnd = new Date(current);
        periodEnd.setDate(periodEnd.getDate() + totalDays - 1);

        const isBlocked = blockedPeriods.some(period => {
            const bStart = new Date(period.startDate);
            const bEnd = new Date(period.endDate);
            return periodStart <= bEnd && periodEnd >= bStart;
        });

        if (!isBlocked) {
            availableStartDates.push(current.toISOString().split("T")[0]);
        }

        current.setDate(current.getDate() + 1);
    }

    return availableStartDates;
}

// Merges available start dates across all units for a product.
// Parameters: units - array of unit objects, bookDays - number, year - number, month - number (0-11).
// Returns array of { date, unitCount, unitIds }.
export function mergeUnitDates(units, bookDays, year, month) {
    const dateMap = {};

    units.forEach(unit => {
        const availableDates = getAvailableStartDates(unit, bookDays, year, month);

        availableDates.forEach(date => {
            if (!dateMap[date]) {
                dateMap[date] = { date, unitCount: 0, unitIds: [] };
            }
            dateMap[date].unitCount++;
            dateMap[date].unitIds.push(unit.id);
        });
    });

    return Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));
}

export function mergeProductDates(products, units, bookDays, year, month) {
    
    if (!products.length) return [];

    const allProductDates = products.map(product => {
        const productUnits = units.filter(u => u.productId === product.id);
        const unitDates = mergeUnitDates(productUnits, bookDays, year, month);
        return unitDates.map(d => d.date);
    });

    const productDates = allProductDates.reduce((common, dates) => {
        return common.filter(date => dates.includes(date));
    });

    return productDates;
}
