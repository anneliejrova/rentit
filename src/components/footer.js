import { createIcons, icons } from 'lucide';

//Renders the footer with social media icons and contact information
export function renderFooter() {
  document.querySelector('footer').innerHTML = /*html*/`
    <div class="bg-slate-50 py-4 relative bottom-0 w-full">
      <div class="max-w-4xl mx-auto flex flex-col items-center gap-2 px-4">

        <div class="flex gap-4">

          <a href="#" aria-label="Instagram"
            class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white hover:bg-gray-800 transition-all duration-200">
            <i data-lucide="instagram" class="w-5 h-5"></i>
          </a>

          <a href="#" aria-label="Facebook"
            class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white hover:bg-gray-800 transition-all duration-200">
            <i data-lucide="facebook" class="w-5 h-5"></i>
          </a>

          <a href="mailto:kontakt@rentit.se" aria-label="E-post"
            class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white hover:bg-gray-800 transition-all duration-200">
            <i data-lucide="mail" class="w-5 h-5"></i>
          </a>

          <a href="tel:+46700000000" aria-label="Telefon"
            class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white hover:bg-gray-800 transition-all duration-200">
            <i data-lucide="phone" class="w-5 h-5"></i>
          </a>

        </div>

        <p class="text-gray-600 text-sm tracking-wide">
          © ${new Date().getFullYear()} Rentit — Alla rättigheter förbehållna
        </p>

      </div>
    </div>
  `;

  createIcons({icons});
}