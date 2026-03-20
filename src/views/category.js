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
 
   <div class="p-6 md:p-17 bg-(--accent) rounded-2xl mb-8 flex flex-col lg:flex-row gap-6 md:gap-8 mx-auto items-center w-[95vw] md:w-[60vw] shadow-2xl">
    ${category.imgUrl ? `
        <img src="${category.imgUrl}" alt="${category.name}" class="w-full lg:w-64 h-48 md:h-66 object-cover rounded-xl shrink-0 shadow-md">
    ` : ""}
    <div class="flex flex-col gap-3">
        <h1 class="text-2xl lg:text-4xl font-bold" style="color: var(--accent-light)">${category.descriptionTitle}</h1>
        <p class="text-sm lg:text-1xl leading-relaxed max-w-prose">${category.description}</p>
    </div>
</div>

</div>

    <div class="p-4">
      ${renderProducts(products)}
    </div>
    `;
}
