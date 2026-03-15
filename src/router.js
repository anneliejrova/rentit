// router.js
import { renderHeader } from './components/header.js';
import { routes } from './routes.js';
import { initToggleCartBtns } from './components/toggleCartBtn.js';

// Finds route by slug, renders header and view into DOM, splits slug to handle routes with id (product/123).
async function loadView(slug) {
  const [baseslug, id] = slug.split("/");
  const route = routes.find((r) => r.slug === baseslug);

  if (!route) return;

  // Renders header with content.
  await renderHeader(route);

  // Calls component and the correct view to render with route and id.
  route.component().then(async (module) => {
    document.querySelector("main").innerHTML = await module.render(route, id);
    document.title = route.title + ' | Rentit';

    initToggleCartBtns();

    if (module.initCheckout) {
        module.initCheckout();
    }
  });
}

// Gets slug, adds post to browser history and updates URL, calls for loadView.
export function navigate(slug) {
  history.pushState(null, "", "#" + slug);
  loadView(slug);
}

// Listens to URL-hash changes, makes back- and forward button work.
window.addEventListener("hashchange", () => {
  loadView(location.hash.slice(1) || "home");
});

document.addEventListener("checkoutStarted", () => {
    navigate("checkout");
});