import { ApiConst } from '@/configs';
import { request } from '@/utils';

const createRequestWithdraw = (data: any): any => {
  const api = ApiConst.withdraw.createRequestWithdraw();
  return request.call(api.url, {
    method: api.method,
    data,
    showLoading: true,
  });
};

const getWithdrawCashList = (params) => {
  const api = ApiConst.withdraw.getWithdrawCashList();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const getWithdrawDetail = (withdrawId) => {
  const api = ApiConst.withdraw.getWithdrawDetail(withdrawId);
  return request.call(api.url, {
    method: api.method,
  });
};

export default {
  createRequestWithdraw,
  getWithdrawCashList,
  getWithdrawDetail,
};
