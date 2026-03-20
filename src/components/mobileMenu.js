import { routes } from "../routes.js";
import { renderSearch} from "./search.js";

// Renders the mobile menu with category links and search
export function renderMobileMenu() {
  
  // Filters out pages to only show navigation links for actual categories
  const categories = routes.filter(r => 
    r.slug !== 'home' && 
    r.slug !== "product" && 
    r.slug !== "checkout" && 
    r.slug !== "confirmation"
  );

  return /*html*/`
    <div id="mobileMenu" class="hidden lg:hidden absolute right-0 max-w-lg bg-white shadow-lg p-4 flex-col gap-4 z-50">

      <!-- search - (hidden on desktop) -->
      <div class="block lg:hidden">
        ${renderSearch('-mobile', 'right')}
      </div>
      <nav class="flex flex-col gap-2">
        ${categories.map(r => `
          <a href="#${r.slug}" class="py-2 border-b">${r.title}</a>
        `).join('')}
      </nav>
    </div>
  `;
}