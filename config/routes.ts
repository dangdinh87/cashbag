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
      // {
      //   path: '/profile',
      //   component: '@/pages/profile',
      // },
      // {
      //   path: '/search',
      //   component: '@/pages/search-result',
      // },
    ],
  },
  {
    path: '**',
    redirect: '/',
  },
];
