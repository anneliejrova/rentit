import { navigate } from "../router.js";
let cachedProducts = []; //saves products from search
let lastResults = []; //saves last search results
let isInitialized = false; //prevents initSearch from running multiple times

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
      <div id="search-dropdown" class="transition-all duration-300 ease-in-out absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-50 px-4 pointer-coarse"></div>
    </div>
  `;
}

//Fetches products from the mock JSON and caches them locally.
export async function initSearch() {
  //Only fetch products once
  if (!isInitialized) {
    const response = await fetch("./src/data.json");
    const data = await response.json();
    cachedProducts = data.products;
    isInitialized = true;
  }

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
    lastResults = results;
    renderDropdown(results);
  });

  //Navigates to product page with all matching results on enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value) {
      const results = filterProducts(input.value, cachedProducts);
      navigate("product/" + results.map((p) => p.id).join(","));
    }
  });
}

//Filters query(typed by user) and full list of products
export function filterProducts(query, products) {
  const q = query.toLowerCase();
  console.log("query:", q, "products:", products.length);

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
    .map(
      (product) =>
        `<div class="dropdown-item" data-id="${product.id}">${product.name}</div>`,
    )
    .join("");

  //Navigate to product view on click
  dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      navigate("product/" + item.dataset.id);
    });
  });
}
