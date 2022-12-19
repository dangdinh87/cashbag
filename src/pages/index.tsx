import React, { useEffect, useState } from 'react';
import { isBrowser, RequestConfig } from 'umi';
import api from 'zmp-sdk';
import { AppConst } from '@/configs';
import { helper, logger } from '@/utils';
import AppInitializer from '@/components/app/init';
import { toast } from '@/components/app/toast/manager';
import { loading } from '@/components/app/loading-indicator/manager';

import './global.scss';
const Wrapper = ({ children }: { children?: React.ReactNode }) => {
  return <AppInitializer>{children}</AppInitializer>;
};

export function rootContainer(container: React.ReactNode) {
  return React.createElement(Wrapper, null, container);
}

export function render(oldRender: any) {
  api.login({
    success: () => {
      console.log('Login zalo success');
      oldRender();
    },
    fail: (error: string) => {
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
        logger.error('API error:', response);
        helper.handle404Error();
      }

      if (response.status === 401) {
        logger.error('API error:', response);
        return { ...response.json(), code: AppConst.ResponseCode.permission };
      }

      return response;
    },
  ],
};
