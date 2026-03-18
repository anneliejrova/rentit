// Escapes HTML special characters to prevent XSS attacks.
// Parameter: str - any value to be safely inserted into HTML.
// Returns: escaped string safe for HTML insertion.
export function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}