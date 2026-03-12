import { navigate } from "../router.js";

let cachedProducts = []; // Saves products from search
let lastResults = []; // Saves last search results
let isInitialized = false; // Prevents initSearch from running multiple times

// Renders the search input and dropdown container
export function renderSearch(suffix = "") {
  return /*html*/ `
    <div class="relative px-4">
      <input 
        id="searchInput${suffix}" 
        class="search-input bg-transparent border rounded-lg px-4 py-1 w-full" 
        type="text" 
        placeholder="Sök..." 
        autocomplete="off"
      />
      <div id="search-dropdown${suffix}" class="search-dropdown transition-all duration-300 ease-in-out absolute top-full left-0 w-full bg-white shadow-lg rounded-lg z-50 px-4 opacity-0 pointer-events-none -translate-x-4"></div>
    </div>
  `;
}

// Fetches products and initializes listeners
export async function initSearch() {
  // 1. Only fetch products once
  if (!isInitialized) {
    try {
      // PRO TIP: If you still get 500 error, change this path to "/src/data.json" 
      // or "data.json" depending on your folder structure
      const response = await fetch("./src/data.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      cachedProducts = data.products;
      isInitialized = true;
      console.log("Products loaded successfully");
    } catch (error) {
      console.error("Could not fetch products:", error);
      return; 
    }
  }

  // 2. Setup listeners for ALL search inputs found on page
  const searchInputs = document.querySelectorAll('.search-input');

  searchInputs.forEach(input => {
    const currentDropdown = input.nextElementSibling;

    // Handle typing
    input.addEventListener('input', (e) => {
      const query = e.target.value;

      if (!query) {
        closeDropdown(currentDropdown);
        return;
      }

      const results = filterProducts(query, cachedProducts);
      lastResults = results;
      
      renderDropdown(results, currentDropdown);
    });

    // Handle "Enter" key
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && input.value && lastResults.length > 0) {
        navigate("product/" + lastResults.map((p) => p.id).join(","));
      }
    });
  });
} // <--- Added missing closing bracket for initSearch

// Filters query against product list
export function filterProducts(query, products) {
  const q = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().startsWith(q) ||
      product.searchWords.some((word) => word.toLowerCase().startsWith(q)),
  ).slice(0, 10);
}

// Renders the results into the provided dropdown element
export function renderDropdown(products, dropdownElement) {
  if (products.length === 0) {
    dropdownElement.innerHTML = `<p class="py-2 text-gray-500">Inga produkter hittades</p>`;
  } else {
    dropdownElement.innerHTML = products
      .map(
        (product) =>
          `<div class="dropdown-item py-2 border-b last:border-0 cursor-pointer hover:bg-gray-100" data-id="${product.id}">
            ${product.name}
          </div>`,
      )
      .join("");
  }

  openDropdown(dropdownElement);

  // Add click listeners to items
  dropdownElement.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      navigate("product/" + item.dataset.id);
      closeDropdown(dropdownElement);
    });
  });
}

// Helper functions (fixed variable names and classes)
function openDropdown(dropdownElement) {
  dropdownElement.classList.remove("opacity-0", "-translate-x-4", "pointer-events-none");
  dropdownElement.classList.add("opacity-100", "translate-x-0");
}

function closeDropdown(dropdownElement) {
  dropdownElement.classList.remove("opacity-100", "translate-x-0");
  dropdownElement.classList.add("opacity-0", "-translate-x-4", "pointer-events-none");
}