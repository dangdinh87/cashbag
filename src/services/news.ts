import { ApiConst } from '@/configs';
import { request } from '@/utils';

const getNews = (params: any): any => {
  const api = ApiConst.news.getNews();
  return request.call(api.url, {
    method: api.method,
    params,
  });
};

export default {
  getNews,
};
