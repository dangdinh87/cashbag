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
    'process.env.FB_API_KEY': 'AIzaSyDMHt5WSZ4y6Te1i2KbhyeqY8NeggN9w8I',
    'process.env.FB_AUTH_DOMAIN': 'cashbag-miniapp.firebaseapp.com',
    'process.env.FB_PROJECT_ID': 'cashbag-miniapp',
    'process.env.FB_STORAGE_BUCKET': 'cashbag-miniapp.appspot.com',
    'process.env.FB_MESSAGING_SENDER': 'miniapp',
    'process.env.FB_APP_ID': '1:926352190108:web:62083a6b79d70e7b9d1b59',
    'process.env.FB_MEASUREMENT_ID': 'G-HEYGH60MWP',
  },
  headScripts: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
  ],
});
