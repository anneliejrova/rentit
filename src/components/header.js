import { renderNav } from "./nav.js";
import { renderSearch, initSearch } from "./search.js";
import { initCartCount } from "./cartCount.js";

//Accepts a route and renders it accordingly
export function renderHeader(route) {
  const header = document.querySelector("header");

  header.innerHTML = /* html */ `
  <div class="shadow-md"> <!-- header wrapper -->
    
    <div class="flex justify-between "> 
      <div class="bg-white px-6 py-4 flex content-center"> <!-- logo + category titel (home = slogan) -->
        <a href="/">
          <img src=../img/logo/logo.png class="w-auto h-16" alt="Rentit">
        </a>
        <h1 class="content-center text-4xl font-bold text-gray-800 ml-6">${route.headertxt}</h1>
      </div>
   
      <div class="md:hidden flex items-center"> <!-- hamburger -->
        burger
      </div>
    </div>

    <div class="flex "> <!--"hidden md:flex"-->
      <div class="mr-auto">${renderSearch()}</div>  
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
}
