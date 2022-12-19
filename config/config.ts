import path from 'path';
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
    'process.env.ZALO_OA_ID': '1719700711458700581',
    'process.env.API_ENDPOINT': 'https://svc.cashbag.vn/api',
  },
  headScripts: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
  ]
});
