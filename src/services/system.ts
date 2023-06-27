import { ApiConst } from '@/configs';
import { request } from '@/utils';

const getAppData = (params: any): any => {
  const api = ApiConst.config.getAppData();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

export default {
  getAppData,
};
