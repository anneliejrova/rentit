let cachedItems = [];

/* Renders the search input and dropdown container*/
export function renderSearch() {
  return /*html*/ `
    <div class="relative">
      <input 
        id="searchInput" 
        class="bg-transparent border rounded-lg px-4 py-1 w-full" 
        type="text" 
        placeholder="Sök..." 
        autocomplete="off"
      />
      <div id="search-dropdown"></div>
    </div>
  `;
}
