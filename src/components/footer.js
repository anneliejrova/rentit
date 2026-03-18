import { createIcons, icons } from 'lucide';

// Renders the footer with social media icons (from Lucide icons) and contact information.
export function renderFooter() {
  document.querySelector('footer').innerHTML = /*html*/`
    <div class="py-4" style="background-color: var(--site-txt)">
      <div class="max-w-4xl mx-auto flex flex-col items-center gap-2 px-4">

        <div class="flex gap-4">

          <a href="#" aria-label="Instagram"
            class="footerIcon w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:brightness-150"
            style="border-color: var(--accent-light); color: var(--accent-light)">
            <i data-lucide="instagram" class="w-5 h-5"></i>
          </a>

          <a href="#" aria-label="Facebook"
            class="footerIcon w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:brightness-150"
            style="border-color: var(--accent-light); color: var(--accent-light)">
            <i data-lucide="facebook" class="w-5 h-5"></i>
          </a>

          <a href="mailto:kontakt@rentit.se" aria-label="E-post"
            class="footerIcon w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:brightness-150"
            style="border-color: var(--accent-light); color: var(--accent-light)">
            <i data-lucide="mail" class="w-5 h-5"></i>
          </a>

          <a href="tel:+46700000000" aria-label="Telefon"
            class="footerIcon w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 hover:brightness-150"
            style="border-color: var(--accent-light); color: var(--accent-light)">
            <i data-lucide="phone" class="w-5 h-5"></i>
          </a>

        </div>

        <p class="text-sm tracking-wide" style="color: var(--accent-light)">
          © ${new Date().getFullYear()} Rentit — Alla rättigheter förbehållna
        </p>

      </div>
    </div>
  `;

  // Initializes all Lucide icons in the DOM
  createIcons({icons});

  // Adds hover color effect to all footer icons
  document.querySelectorAll('.footerIcon').forEach(icon => {

  // Changes icon and border color to accent color on hover
  icon.addEventListener('mouseenter', () => {
      icon.style.color = 'var(--accent)';
      icon.style.borderColor = 'var(--accent)';
  });

  // Resets icon and border color to lighter accent color when mouse leaves
  icon.addEventListener('mouseleave', () => {
      icon.style.color = 'var(--accent-light)';
      icon.style.borderColor = 'var(--accent-light)';
  });
});

}