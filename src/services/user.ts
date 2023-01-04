import { ApiConst } from '@/configs';
import { request } from '@/utils';

const loginZalo = (data): any => {
  const api = ApiConst.user.loginZalo();
  return request.call(api.url, {
    method: api.method,
    data,
  });
};

const getDetailUser = (params): any => {
  const api = ApiConst.user.getUserDetail();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

export default {
  loginZalo,
  getDetailUser,
};
