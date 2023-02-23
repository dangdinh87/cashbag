import { defineConfig } from 'umi';

import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mountElementId: 'app',
  dva: {
    hmr: true,
  },
  sass: {
    implementation: require('node-sass'),
  },
  base: `/zapps/${process.env.APP_ID}`,
  routes,
  locale: {
    antd: false,
    title: false,
    default: 'vi-VN',
    baseNavigator: false,
    baseSeparator: '-',
  },
  esbuild: {},
  hash: false,
  fastRefresh: {},
  extraBabelIncludes: ['seamless-scroll-polyfill'],
  favicon: '/assets/favicon.ico',
  title: false,
  define: {
    'process.env.ZALO_OA_ID': '2193444627448645149',
    'process.env.API_ENDPOINT': 'https://svc.cashbag.vn/api',

    //Firebase
    'process.env.FB_API_KEY': 'AIzaSyDFDA2Dx93ZOoM-1FNb5o6sb7IifZUO9vQ',
    'process.env.FB_AUTH_DOMAIN': 'cashbag-12db4.firebaseapp.com',
    'process.env.FB_PROJECT_ID': 'cashbag-12db4',
    'process.env.FB_STORAGE_BUCKET': 'cashbag-12db4.appspot.com',
    'process.env.FB_MESSAGING_SENDER': '583547103918',
    'process.env.FB_APP_ID': '1:583547103918:web:038c884d4c7298bb315b3f',
    'process.env.FB_MEASUREMENT_ID': 'G-35V3MJFTBX',
    'process.env.FB_DATABASE_URL': 'https://cashbag-12db4.firebaseio.com',
  },
  headScripts: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
  ],
});
