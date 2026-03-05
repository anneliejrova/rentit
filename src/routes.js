export const routes = [
  { slug: 'home',     title: 'Hem',     component: () => import('./views/home.js') },
  { slug: 'cleaning', title: 'Städ',    component: () => import('./views/cleaning.js') },
  { slug: 'hobby',    title: 'Fritid',  component: () => import('./views/hobby.js') },
  { slug: 'kitchen',  title: 'Kök',     component: () => import('./views/kitchen.js') },
  { slug: 'yard',     title: 'Trädgård',component: () => import('./views/yard.js') },
  { slug: 'tools',    title: 'Bygg',    component: () => import('./views/tools.js') },
];