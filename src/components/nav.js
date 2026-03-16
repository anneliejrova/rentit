import { routes } from "../routes.js";
import { getData } from "../utils/data.js";

// Renders navigation links for all routes except home, product, checkout and confirmation.
// Returns links HTML, accentColor and accentColorLight for the active category.
export async function renderNav(currentSlug) {
  const data = await getData();
  const categoryRoutes = routes.filter(r => 
    r.slug !== 'home' && 
    r.slug !== "product" && 
    r.slug !== "checkout" && 
    r.slug !== "confirmation"
  );

  const activeCategory = data.categories.find(c => c.name === currentSlug);
  const accentColor = activeCategory?.accentColor || null;
  const accentColorLight = activeCategory?.accentColorLight || null;

  const links = categoryRoutes.map(r => {
    const category = data.categories.find(c => c.name === r.slug);
    const color = category?.accentColor || '#6b7280';
    const isActive = r.slug === currentSlug;

    return `
      <a href="#${r.slug}" 
        class="px-8 rounded-t flex items-center ${isActive ? 'h-10 text-xl' : 'h-8 hover:h-10 hover:text-xl'}"
        style="background-color: ${color}; color: white;">
        ${r.title}
      </a>
    `;
  }).join('');

  return { links, accentColor, accentColorLight };
}