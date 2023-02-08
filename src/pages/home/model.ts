import { Effect, Reducer } from 'umi';

import { ResponseCode } from '@/configs/app';
import {
  serviceBrand,
  serviceNews
} from '@/services';

export interface IHomeState {
  homeBanners?: any[];
  brandBonus?: any[];
  brandByCategory?: any[];
  categories?: any[];
  listBrandByCategoryFilter?: {}
}
const initState: IHomeState = {
  homeBanners: [],
  brandBonus: [],
  brandByCategory: [],
  categories: [],
  listBrandByCategoryFilter: {}
};

interface IHomeModel {
  namespace: string;
  state: IHomeState;
  effects: {
    getHomeBanners: Effect;
    getBrandBonus: Effect;
    getBrandByCategory: Effect;
    getListBrandByCategory: Effect;
  };
  reducers: {
    updateState: Reducer<IHomeState>;
    clearState: Reducer<IHomeState>;
  };
}

const HomeModel: IHomeModel = {
  namespace: 'homeState',
  state: initState,
  effects: {
    *getHomeBanners({ payload }, { call, put }) {
      const response = yield call(serviceNews.getNews, payload.data);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          homeBanners: response.data.data,
        },
      });
    },
    *getBrandBonus({ }, { call, put }) {
      const response = yield call(serviceBrand.getBrandBonus);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          brandBonus: response.data.data,
        },
      });
    },
    *getBrandByCategory({ }, { call, put }) {
      const response = yield call(serviceBrand.getBrandByCategory);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          brandByCategory: response.data.data,
        },
      });
    },
    *getListBrandByCategory({ payload }, { call, put, select }) {
      const response = yield call(serviceBrand.getListBrandByCategories, payload.data, payload.categoryID);
      if (response?.code !== ResponseCode.success) {
        return;
      }

      const { data } = response;
      const { listBrandByCategory, listBrandByCategoryFilter } = yield select(
        (_: any) => _.homeState,
      );

      if (payload.isLoadMore) {
        yield put({
          type: 'updateState',
          payload: {
            listBrandByCategory: [...listBrandByCategory, ...data.data],
            listBrandByCategoryFilter: {
              ...listBrandByCategoryFilter,
              nextPageToken: data.nextPageToken,
            },
          },
        });
        return;
      }

      yield put({
        type: 'updateState',
        payload: {
          listBrandByCategory: data.data,
          listBrandByCategoryFilter: {
            nextPageToken: data.nextPageToken,

          }
        },
      });
    },
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearState() {
      return {
        ...initState,
      };
    },

  },
};

export default HomeModel;
