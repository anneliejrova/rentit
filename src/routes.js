export const routes = [
  { slug: 'home',     title: 'Hem',          headertxt: "<em class='italic+'>- don't buy it!</em>",       component: () => import('./views/home.js') },
  { slug: 'cleaning', title: 'Städ',         headertxt: "Städ & Sanering",                                component: () => import('./views/category.js') },
  { slug: 'kitchen',  title: 'Kök',          headertxt: "Kök & Matförädling",                             component: () => import('./views/category.js') },
  { slug: 'yard',     title: 'Trädgård',     headertxt: "Trädgård & Utemiljö",                            component: () => import('./views/category.js') },
  { slug: 'tools',    title: 'Bygg',         headertxt: "Bygg & Verktyg",                                 component: () => import('./views/category.js') },
  { slug: 'leisure',  title: 'Fritid',       headertxt: "Fritid & Event",                                 component: () => import('./views/category.js') },
  { slug: 'textile',  title: 'Textil',       headertxt: "Textil & Läder",                                 component: () => import('./views/category.js') },
  { slug: "product",  title: "Sökresultat",  headertxt: "Sökresultat",                                    component: () => import('./views/product.js') }
];
