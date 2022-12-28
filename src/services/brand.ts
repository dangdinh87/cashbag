import { ApiConst } from '@/configs';
import { request } from '@/utils';

const getBrandBonus = (params: any): any => {
  const api = ApiConst.brand.getBrandBonus();
  return request.call(api.url, {
    method: api.method,
    params,
    Version: 1.2
  });
};

const getBrandByCategory = (params: any): any => {
  const api = ApiConst.brand.getBrandByCategory();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const getProductByBrandBonus = (params: any, brandId: string): any => {
  const api = ApiConst.brand.getProductByBrandBonus(brandId);
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const getSearchBrandBonus = (params: any) => {
  const api = ApiConst.brand.getSearchBrandBonus();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const getBrandAll = (params: any) => {
  const api = ApiConst.brand.getBrandAll();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const getBrandInfo = (brandId: string) => {
  const api = ApiConst.brand.getBrandInfo(brandId);
  return request.call(api.url, {
    method: api.method,
    // params,
    // Version: 1.2
  });
};

const getBrandNewest = (brandId: string) => {
  console.log(brandId);
  const api = ApiConst.brand.getBrandNewest(brandId);
  return request.call(api.url, {
    method: api.method,
    // params,
  });
};

const getSellerByBrandBonus = (params: any, brandId: string) => {
  const api = ApiConst.brand.getSellerByBrandBonus(brandId);
  return request.call(api.url, {
    method: api.method,
    params,
    Version: 1.1,
  });
};

const searchSellerByBrandBonus = (params: any, brandId: string) => {
  const api = ApiConst.brand.searchSellerByBrandBonus(brandId);
  return request.call(api.url, {
    method: api.method,
    params,
    Version: 1.1,
  });
};

const getCategoriesByBrand = (brandId: string) => {
  const api = ApiConst.brand.getCategoriesByBrand(brandId);
  return request.call(api.url, {
    method: api.method,
  });
};

const getDetailCategoryBrand = (categoryId: string) => {
  const api = ApiConst.brand.getDetailCategoryBrand(categoryId);
  return request.call(api.url, {
    method: api.method,
  });
};

const getGuidesByBrand = (brandId: string) => {
  const api = ApiConst.brand.getGuidesByBrand(brandId);
  return request.call(api.url, {
    method: api.method,
  });
};

export default {
  getBrandBonus,
  getBrandByCategory,
  getProductByBrandBonus,
  getSearchBrandBonus,
  getBrandAll,
  getBrandInfo,
  getBrandNewest,
  getSellerByBrandBonus,
  searchSellerByBrandBonus,
  getCategoriesByBrand,
  getDetailCategoryBrand,
  getGuidesByBrand,
};
