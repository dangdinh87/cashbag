export default [
  {
    path: '/',
    component: '@/layouts/main',
    routes: [
      // {
      //   exact: true,
      //   path: '/',
      //   component: '@/pages/home',
      // },
      {
        path: '/redirect',
        component: '@/pages/redirect',
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
        path: '/category/:brandId/:categoryId',
        component: '@/pages/category',
      },
      {
        path: '/search',
        component: '@/pages/search',
      },
      {
        path: '/user',
        component: '@/pages/profile',
      },
      {
        path: '/transaction',
        component: '@/pages/transaction',
      },
      {
        path: '/transaction/:transactionId',
        component: '@/pages/transaction-detail',
      },
    ],
  },
  {
    path: '**',
    redirect: '/home',
  },
];
