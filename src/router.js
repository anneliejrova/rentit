import { routes } from './routes.js';

function loadView(slug) {
  const route = routes.find(r => r.slug === slug);

  if (!route) return;

  route.component().then(module => {
    document.querySelector('main').innerHTML = module.render();
    document.title = route.title + ' | Rentit';
  });
}

export function navigate(slug) {
  history.pushState(null, '', '#' + slug);
  loadView(slug);
}

window.addEventListener('hashchange', () => {
  loadView(location.hash.slice(1) || 'home');
});