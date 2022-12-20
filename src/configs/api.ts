import { storage } from "@/utils";
import {
  browserName,
  browserVersion,
  deviceType, osVersion
} from 'react-device-detect';

const methods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
};

interface IApi {
  url: string;
  method?: string;
  type?: string;
}

const appVersion = process.env.APP_VERSION || '';
const apiVersion = process.env.API_VERSION;

const endpointType = {
  appEndpoint: process.env.API_ENDPOINT,
};

function getDefaultHeader() {
  if (!storage.getDeviceId()) {
    storage.generateDeviceId();
  }
  const deviceId = storage.getDeviceId();
  const splitted = appVersion.split('.');
  const appVersionCode = `${Number(splitted[0]) * 10000 +
    Number(splitted[1]) * 100 +
    Number(splitted[2])
    }`;

  const query = {
    apiVersion,
    appVersion,
    appVersionCode,
    deviceId,
    osName: 'Zalo',
    osVersion,
    browserVersion,
    Platform: 'zalo',
    deviceType,
    browserName,
  };

  return query;
}

export default {
  methods,
  getDefaultHeader,
  endpointType,
  news: {
    getNews: (): IApi => ({
      url: '/common/banners',
      method: methods.get,
    }),
  },
  brand: {
    getBrandBonus: (): IApi => ({
      url: '/brand/brand-bonus',
      method: methods.get,
    }),
    getBrandByCategory: (): IApi => ({
      url: '/brand/categories/features',
      method: methods.get,
    }),
    getProductByBrandBonus: (brandId): IApi => ({
      url: `/brand/${brandId}/brand-bonus-products`,
      method: methods.get,
    }),
    getSearchBrandBonus: (): IApi => ({
      url: `/brand/sellers/search`,
      method: methods.get,
    }),

  }
}
