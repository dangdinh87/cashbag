import { ApiConst } from '@/configs';
import { request } from '@/utils';

const getListTransaction = (params: any): any => {
  const api = ApiConst.transaction.getListTransaction();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const getDetailTransaction = (params: any, transactionId): any => {
  const api = ApiConst.transaction.getDetailTransaction(transactionId);
  return request.call(api.url, {
    method: api.method,
    params,
  });
};


export default {
  getDetailTransaction,
  getListTransaction
};
