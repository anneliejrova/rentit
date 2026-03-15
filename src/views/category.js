import { renderProducts } from '../components/renderProducts.js';
import { getData } from '../utils/data.js';

// Fetches data from json and renders category info and products.
export async function render(route) {
  const data = await getData();

  const category = data.categories.find(c => c.name === route.slug);
  const products = data.products.filter(p => p.categoryIds.includes(category.id));

  // Set accent colors for this category
  document.body.style.setProperty('--accent', category.accentColor);
  document.body.style.setProperty('--accent-light', category.accentColorLight);

  return /* html */`
    <div class="p-4 bg-[var(--accent-light)]">
      <h1 class="text-2xl font-bold">${category.name}</h1>
      <p class="text-gray-600 mt-1">${category.description}</p>
    </div>

    <div class="p-4">
      ${renderProducts(products)}
    </div>
    `;
}
