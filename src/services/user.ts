import { ApiConst } from '@/configs';
import { Response } from '@/interface/common';
import { User } from '@/interface/user';
import { request } from '@/utils';

const loginZalo = (data): Promise<Response<void>> => {
  const api = ApiConst.user.loginZalo();
  return request.call(api.url, {
    method: api.method,
    data,
  });
};

const getDetailUser = (params: any): Promise<Response<User>> => {
  const api = ApiConst.user.getUserDetail();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const verifyPhoneUser = (data: any): any => {
  const api = ApiConst.user.verifyPhone();
  return request.call(api.url, {
    method: api.method,
    data,
  });
};

export default {
  loginZalo,
  getDetailUser,
  verifyPhoneUser,
};
