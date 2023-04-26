import { storage } from '@/utils';
import {
  browserName,
  browserVersion,
  deviceType,
  osVersion,
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
  const appVersionCode = `${
    Number(splitted[0]) * 10000 +
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
      url: '/common/zalo/banners',
      method: methods.get,
    }),
  },
  brand: {
    getBrandBonus: (): IApi => ({
      url: '/brand/zalo/brand-bonus',
      method: methods.get,
    }),
    getBrandByCategory: (): IApi => ({
      url: '/brand/zalo/brand-group-by-category',
      method: methods.get,
    }),
    getSearchBrandBonus: (): IApi => ({
      url: `/brand/sellers/search`,
      method: methods.get,
    }),
    getBrandAll: (): IApi => ({
      url: `/brand/zalo/brands`,
      method: methods.get,
    }),
    getBrandInfo: (brandId): IApi => ({
      url: `/brand/${brandId}/info`,
      method: methods.get,
    }),
    getProductByBrandBonus: (brandId): IApi => ({
      url: `/brand/${brandId}/brand-bonus-products`,
      method: methods.get,
    }),
    getBrandNewest: (brandId): IApi => ({
      url: `/brand/${brandId}/sellers-newest`,
      method: methods.get,
    }),
    getSellerByBrandBonus: (brandId): IApi => ({
      url: `/brand/${brandId}/sellers`,
      method: methods.get,
    }),
    searchSellerByBrandBonus: (brandId): IApi => ({
      url: `/brand/${brandId}/search`,
      method: methods.get,
    }),
    getCategoriesByBrand: (brandId): IApi => ({
      url: `/brand/${brandId}/categories`,
      method: methods.get,
    }),
    getDetailCategoryBrand: (categoryId): IApi => ({
      url: `/brand/brand-categories/${categoryId}`,
      method: methods.get,
    }),
    getGuidesByBrand: (brandId): IApi => ({
      url: `/brand/${brandId}/guides`,
      method: methods.get,
    }),
    getLink: (): IApi => ({
      url: `/brand/zalo/click`,
      method: methods.post,
    }),
    getListBrandByCategories: (categoryID): IApi => ({
      url: `/brand/categories/${categoryID}/brands`,
      method: methods.get,
    }),
  },
  transaction: {
    getListTransaction: (): IApi => ({
      url: '/transaction-online/transactions',
      method: methods.get,
    }),
    getDetailTransaction: (transactionId): IApi => ({
      url: `/transaction-online/transactions/${transactionId}`,
      method: methods.get,
    }),
  },
  user: {
    loginZalo: (): IApi => ({
      url: '/user/login-zalo',
      method: methods.post,
    }),
    getUserDetail: (): IApi => ({
      url: '/user/me',
      method: methods.get,
    }),
    verifyPhone: (): IApi => ({
      url: '/user/me/verify-phone-zalo',
      method: methods.post,
    }),
  },
};
