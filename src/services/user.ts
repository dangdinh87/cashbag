import { ApiConst } from '@/configs';
import { request } from '@/utils';

const loginZalo = (params: any): any => {
  const api = ApiConst.user.loginZalo();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

export default {
  loginZalo,
};
