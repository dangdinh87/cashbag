import React, { useEffect, useState } from 'react';
import { isBrowser, RequestConfig } from 'umi';
import api from 'zmp-sdk';

import { AppConst } from '@/configs';
import { helper, navigator } from '@/utils';
import AppInitializer from './components/app/init';
import { loading } from './components/app/loading-indicator/manager';
import { toast } from './components/app/toast/manager';

const Wrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isBrowser()) {
    return null;
  }

  return <AppInitializer>{children}</AppInitializer>;
};

export function rootContainer(container) {
  return React.createElement(Wrapper, null, container);
}

export function render(oldRender) {
  api.login({
    success: () => {
      oldRender();
      console.log('Login zalo success');
    },
    fail: (error) => {
      console.log(error);
    },
  });
}

const timeout = 30000; // 30s

let loadingCount = 0;

function destroyLoading() {
  if (loadingCount <= 0) {
    return;
  }
  setTimeout(() => {
    loadingCount--;
    if (loadingCount === 0) {
      loading.destroy();
    }
  }, 100);
}

function showLoading() {
  if (loadingCount === 0) {
    loading.show();
  }
  loadingCount++;
}

// Config umi request
export const request: RequestConfig = {
  timeout: 30000,
  timeoutMessage: `RequestError: timeout of ${timeout}ms exceeded`,
  errorHandler: (error) => {
    destroyLoading();
    toast.error(error.data.message);
    return error.data;
  },
  requestInterceptors: [
    (url, options) => {
      if (options.showLoading) {
        showLoading();
      }
      return {
        url,
        options,
      };
    },
  ],
  responseInterceptors: [
    (response) => {
      destroyLoading();
      if (response.status === 404) {
        // logger.error('API error:', response);
        // helper.handle404Error();
        // navigator.replacePath('/');
      }

      if (response.status === 401) {
        // logger.error('API error:', response);
        return { ...response.json(), code: AppConst.ResponseCode.permission };
      }

      return response;
    },
  ],
};
