import { renderProducts } from "../components/productCards.js";
import { getData } from "../utils/data.js";

// Fetches data from json and renders category info and products.
export async function render(route) {
  const data = await getData();

  const category = data.categories.find((c) => c.name === route.slug);
  const products = data.products.filter((p) =>
    p.categoryIds.includes(category.id),
  );

  // Set accent colors for this category
  document.body.style.setProperty("--accent", category.accentColor);
  document.body.style.setProperty("--accent-light", category.accentColorLight);
  document.body.style.setProperty('--site-bg', category.accentColorLight);

  return /* html */ `
  <div class="bg-[var(--accent-light)]">
    <div class="p-17 bg-[var(--accent)] rounded-2xl mb-8 flex gap-8 mx-auto items-center w-[60vw]">
    ${category.imgUrl? `
        <img src="${category.imgUrl}" alt="${category.name}" class="w-64 h-66 object-cover rounded-xl flex-shrink-0 shadow-md">
    `: ""
    }
    <div class="flex flex-col gap-3">
        <h1 class="text-4xl font-bold" style="color: var(--accent-light)">${category.descriptionTitle}</h1>
        <p class="text-1xl leading-relaxed max-w-prose">${category.description}</p>
    </div>
</div>
</div>

    <div class="p-4">
      ${renderProducts(products)}
    </div>
    `;
}
