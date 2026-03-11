import { navigate } from "../router.js";
let cachedProducts = []; //saves products from search

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
      <div id="search-dropdown" class="transition-all duration-300 ease-in-out absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-50 px-4"></div>
    </div>
  `;
}

//Fetches products and categories from the mock JSON and caches them locally.
export async function initSearch() {
  const response = await fetch("./src/data.json");
  const data = await response.json();
  cachedProducts = data.products;

  const input = document.getElementById("searchInput");

  //Listens for input and filters products on every keystroke
  input.addEventListener("input", (e) => {
    const query = e.target.value;

    //Clears dropdown if empty input
    if (!query) {
      document.getElementById("search-dropdown").innerHTML = "";
      return;
    }

    const results = filterProducts(query, cachedProducts);
    renderDropdown(results);
  });

  console.log("Products loaded:", cachedProducts);
}

//Filters query(typed by user) and full list of products
export function filterProducts(query, products) {
  const q = query.toLowerCase();

  //Returns products matching the query from start of words
  return products.filter(
    (product) =>
      product.name.toLowerCase().startsWith(q) ||
      product.searchWords.some((word) => word.toLowerCase().startsWith(q)),
  );
}

//Render filtered products as a dropdown list
export function renderDropdown(products) {
  const dropdown = document.getElementById("search-dropdown");

  //Empty state
  if (products.length === 0) {
    dropdown.innerHTML = `<p>Inga produkter hittades</p>`;
    return;
  }

  dropdown.innerHTML = products
    .map((product) => `<div class="dropdown-item">${product.name}</div>`)
    .join("");

  //Navigate to product view on click
  dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      navigate("product/" + item.dataset.id);
    });
  });
}
