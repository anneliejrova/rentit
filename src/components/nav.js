import { routes } from "../routes.js";

//Renders navigation links for all routes except home and product
//Highlights the current active route with bold text
export function renderNav(currentSlug) {
  return routes
    .filter(r => r.slug !== 'home' && r.slug !== "product")
    .map(r => `
      <div class="w-px h-6 bg-gray-400"></div>
      <a href="#${r.slug}" class="${r.slug === currentSlug ? 'font-bold' : ''}">${r.title}</a>
    `).join('') + `<div class="w-px h-6 bg-gray-400"></div>`);
}
