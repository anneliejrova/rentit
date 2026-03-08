import { renderNav } from './nav.js';

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
      <div class="mr-auto">search</div>
      <nav class="flex justify-between h-10 space-x-5 content-center">
        ${renderNav(route.slug)}
      </nav>
    </div>

  </div>
  `;
}