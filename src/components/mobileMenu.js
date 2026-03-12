import { routes } from "../routes.js";
import { renderSearch } from "./search.js";

//Renders the mobile menu with category links and search
export function renderMobileMenu() {
  const categories = routes.filter(r => r.slug !== 'home' && r.slug !== 'product');

  return /*html*/`
    <div id="mobileMenu" class="hidden md:hidden absolute right-0 bg-white shadow-lg p-4 flex flex-col gap-4 z-50">
      ${renderSearch()}
      <nav class="flex flex-col gap-2">
        ${categories.map(r => `
          <a href="#${r.slug}" class="py-2 border-b">${r.title}</a>
        `).join('')}
      </nav>
   </div>
  `;
}