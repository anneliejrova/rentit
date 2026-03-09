export const routes = [
  { slug: 'home',     title: 'Hem',      headertxt: "<span class='italic'>- don't buy it!</span>",    component: () => import('./views/home.js') },
  { slug: 'cleaning', title: 'Städ',     headertxt: "Städ & Sanering",                                           component: () => import('./views/cleaning.js') },
  { slug: 'kitchen',  title: 'Kök',      headertxt: "Kök & Matförädling",                                 component: () => import('./views/kitchen.js') },
  { slug: 'yard',     title: 'Trädgård', headertxt: "Trädgård & Utemiljö",                                       component: () => import('./views/yard.js') },
  { slug: 'tools',    title: 'Bygg',     headertxt: "Bygg & Verktyg",                                           component: () => import('./views/tools.js') },
  { slug: 'leisure',    title: 'Fritid',   headertxt: "Fritid & Event",                                         component: () => import('./views/leisure.js') },
  { slug: 'textile',    title: 'Textil',   headertxt: "Textil & Läder",                                         component: () => import('./views/leisure.js') }
];