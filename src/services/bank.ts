import { ApiConst } from '@/configs';
import { request } from '@/utils';
import { Response } from 'umi';

const getBankCards = (): Promise<Response> => {
  const api = ApiConst.bank.getBankCards();
  return request.call(api.url, {
    method: api.method,
    showLoading: true,
  });
};

const createBankCards = (data): Promise<Response> => {
  const api = ApiConst.bank.createBankCards();
  return request.call(api.url, {
    method: api.method,
    data,
  });
};

const updateBankCards = (data: any, id: string): Promise<Response> => {
  const api = ApiConst.bank.updateBankCards(id);
  return request.call(api.url, {
    method: api.method,
    data,
  });
};

const deleteBankCards = (id: string): Promise<Response> => {
  const api = ApiConst.bank.deleteBankCards(id);
  return request.call(api.url, {
    method: api.method,
  });
};

const getBankList = (params: any = {}): Promise<Response> => {
  const api = ApiConst.bank.getBankList();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

const getBranchBankList = (
  brandId: string,
  params?: any,
): Promise<Response> => {
  const api = ApiConst.bank.getBranchBankList(brandId);
  return request.call(api.url, {
    method: api.method,
    params,
    showLoading: true,
  });
};
export default {
  getBankCards,
  createBankCards,
  updateBankCards,
  deleteBankCards,
  getBankList,
  getBranchBankList,
};
