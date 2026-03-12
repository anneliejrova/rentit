import { renderNav } from "./nav.js";
import { renderSearch, initSearch } from "./search.js";
import { initCartCount } from "./cartCount.js";
import { createIcons, icons } from 'lucide';
import { renderMobileMenu } from "./mobileMenu.js";
import { navigate } from "../router.js";

//Accepts a route and renders it accordingly
export function renderHeader(route) {
  const header = document.querySelector("header");

  header.innerHTML = /* html */ `
  <class="shadow-md"> <!-- header wrapper -->
    <div class="flex justify-between "> 
      <div class="bg-white px-6 py-4 flex content-center"> <!-- logo + category titel (home = slogan) -->
        <a href="/">
          <img src=../img/logo/logo.png class="w-auto h-16" alt="Rentit">
        </a>
        <h1 class="content-center text-4xl font-bold text-gray-800 ml-6">${route.headertxt}</h1>
      </div>
   
      <!--hamburger menu-->
      <div class="md:hidden flex items-center">
        <button id="hamburgerBtn" class="p-2">
          <i data-lucide="menu" class="h-6 w-6"></i>
        </button>
      </div>
      ${renderMobileMenu()}
      </div>

    <div class="flex "> <!--"hidden md:flex"-->
      <div class="mr-auto hidden md:block">${renderSearch()}</div>  
      <nav class="flex justify-between h-10 space-x-5 content-center">
        ${renderNav(route.slug)} 
      </nav>
    </div>

  </div>
<div class="flex justify-end">
  <div class="relative cursor-pointer inline-block px-6 py-4" id="cartIcon">
    🛒
    <span id="cartBadge" class="absolute -top-1 -right-1 bg-fuchsia-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
  </div>
  <hr>
</div>
  `;

  initSearch();
  initCartCount()

  createIcons({ icons });

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  //Closes menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  //Closes menu when clicking a category link
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mobileMenu.classList.add("hidden");
      e.preventDefault();
      const slug = e.target.getAttribute("href").slice(1);
      navigate(slug);
    }
  });
}

