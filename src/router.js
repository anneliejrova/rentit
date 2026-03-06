import { renderHeader } from './components/header.js';
import { routes } from './routes.js';

//gets slug, no return = DOM, loads header and view when called
function loadView(slug) {
  const route = routes.find(r => r.slug === slug);

  if (!route) return;

  //renders header with content
  renderHeader(route);

  //calls component to load the correct view
  route.component().then(module => {
    document.querySelector('main').innerHTML = module.render();
    document.title = route.title + ' | Rentit';
  });
}

//gets slug, no return = DOM, adds post to browser history and uppdates URL, calls for loadView
export function navigate(slug) {
  history.pushState(null, '', '#' + slug);
  loadView(slug);
}

//listens to URL-hash changes, makes back- and forwardbutton work
window.addEventListener('hashchange', () => {
  loadView(location.hash.slice(1) || 'home');
});
