export const routes = [
  { slug: 'home',     title: 'Hem',      headertxt: "<span class='italic'>- don't buy it!</span>",    component: () => import('./views/home.js') },
  { slug: 'cleaning', title: 'Städ',     headertxt: "STÄD",                                           component: () => import('./views/cleaning.js') },
  { slug: 'hobby',    title: 'Fritid',   headertxt: "FRITID",                                         component: () => import('./views/hobby.js') },
  { slug: 'kitchen',  title: 'Kök',      headertxt: "KÖKSUTRUSTNING",                                 component: () => import('./views/kitchen.js') },
  { slug: 'yard',     title: 'Trädgård', headertxt: "TRÄDGÅRD",                                       component: () => import('./views/yard.js') },
  { slug: 'tools',    title: 'Bygg',     headertxt: "BYGG",                                           component: () => import('./views/tools.js') },
];