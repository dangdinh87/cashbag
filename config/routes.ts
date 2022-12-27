export default [
  {
    path: '/',
    component: '@/layouts/main',
    routes: [
      {
        exact: true,
        path: '/',
        component: '@/pages/home',
      },
      {
        path: '/home',
        component: '@/pages/home',
      },
      {
        path: '/brand-bonus/:brandId',
        component: '@/pages/brand-bonus',
      },
      {
        path: '/brand/:brandId',
        component: '@/pages/brand',
      },
      {
        path: '/category/:categoryId',
        component: '@/pages/category',
      },
      {
        path: '/search',
        component: '@/pages/search',
      },
    ],
  },
  {
    path: '**',
    redirect: '/',
  },
];
