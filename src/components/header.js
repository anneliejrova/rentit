import { renderNav } from "./nav.js";
import { renderSearch, initSearch } from "./search.js";
import { initCartCount } from "../utils/cartCount.js";
import { renderCartDropdown, initCartDropdown } from "./cartDropdown.js";
import { createIcons, icons } from "lucide";
import { renderMobileMenu } from "./mobileMenu.js";
import { navigate } from "../router.js";

// Accepts a route and renders it accordingly.
export async function renderHeader(route) {
  const header = document.querySelector("header");
  const { links, accentColor } = await renderNav(route.slug);

  header.innerHTML = /* html */ `
  <div class="shadow-md bg-[var(--site-bg)]">
    <div class="flex justify-between">
      <div class="px-6 py-4 flex content-center">
        <a href="/">
          <img src="/img/logo/logo.png" class="main-logo w-32 h-auto" alt="Rentit">
        </a>
        <h1 class="content-center text-2xl md:text-4xl font-bold text-gray-800 ml-6">${route.headertxt}</h1>
      </div>
   
      <div class="md:hidden flex items-center">
        <button id="hamburgerBtn" class="p-6">
          <i data-lucide="menu" class="h-6 w-6" id="menuIcon"></i>
          <i data-lucide="x" class="h-6 w-6 hidden" id="closeIcon"></i>
        </button>
      </div>
    </div>

    <div class="hidden md:flex items-end">
      <div class="mr-auto hidden md:flex items-center">
        ${renderSearch("-desktop")}
      </div>
      <nav class="hidden md:flex justify-between items-end">
        ${links}
      </nav>
    </div>
    ${renderMobileMenu()}
  </div>

  ${accentColor ? `<div id="accentLine" class="h-3 w-full relative z-10" style="background-color: var(--accent);"></div>` : ''}

  <div class="flex justify-end relative">
    <div class="relative cursor-pointer block px-6 py-4 mr-3 mt-3" id="cartIcon">
      <div class="absolute inset-0 bg-white rounded-full blur-md opacity-75"></div>
      <div class="relative z-20">
        <i data-lucide="shopping-cart" class="w-8 h-8 text-black pointer-events-none"></i>
        <span id="cartBadge" class="absolute -top-2 -right-3 bg-fuchsia-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
      </div>
    </div>
    ${renderCartDropdown()}
  </div>
  `;

  initSearch();
  initCartCount();
  await initCartDropdown();
  createIcons({ icons });

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const isOpen = !mobileMenu.classList.contains("hidden");
    document.getElementById("menuIcon").classList.toggle("hidden", isOpen);
    document.getElementById("closeIcon").classList.toggle("hidden", !isOpen);
  });

  // Closes menu when clicking outside.
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Closes menu when clicking a category link.
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.add("hidden");
      e.preventDefault();
      const slug = e.target.getAttribute("href").slice(1);
      navigate(slug);
    }
  });
}