import { ApiConst } from '@/configs';
import { request } from '@/utils';

const getBrandBonus = (params: any): any => {
  const api = ApiConst.brand.getBrandBonus();
  return request.call(api.url, {
    method: api.method,
    params,
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
}

const getBrandAll = (params: any) => {
  const api = ApiConst.brand.getBrandAll();
  return request.call(api.url, {
    method: api.method,
    params,
  });
}

export default {
  getBrandBonus,
  getBrandByCategory,
  getProductByBrandBonus,
  getSearchBrandBonus,
  getBrandAll
};
