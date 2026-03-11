let cachedProducts = []; //saves products from search
let cachedCategories = []; // shows categorynames inside dropdown

//Renders the search input and dropdown container
export function renderSearch() {
  return /*html*/ `
    <div class="relative px-4">
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

//Fetches products and categories from the mock JSON and caches them locally.
export async function initSearch() {
  const response = await fetch("./src/data.json");
  const data = await response.json();
  cachedProducts = data.products;
  cachedCategories = data.categories;

  console.log("Products loaded:", cachedProducts);
}
