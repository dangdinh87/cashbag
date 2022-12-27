import { Effect, Reducer } from 'umi';

import { ResponseCode } from '@/configs/app';
import {
  serviceBrand,
  serviceNews
} from '@/services';

export interface IBrandBonusState {
  filterSearchSellers: any
}
const initState: IBrandBonusState = {
  filterSearchSellers: {}
};

interface IBrandBonusModel {
  namespace: string;
  state: IBrandBonusState;
  effects: {
    getBrandNewest: Effect;
    getBrandInfo: Effect;
    getProductByBrandBonus: Effect;
    getSellersByBrand: Effect;
    searchSellersByBrand: Effect;
  };
  reducers: {
    updateState: Reducer<IBrandBonusState>;
    clearState: Reducer<IBrandBonusState>;
  };
}

const BrandBonusModel: IBrandBonusModel = {
  namespace: 'brandBonusState',
  state: initState,
  effects: {
    *getBrandNewest({ payload }, { call, put }) {
      const response = yield call(serviceBrand.getBrandNewest, payload.brandId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          brandsNewest: response.data.data,
        },
      });
    },

    *getBrandInfo({ payload }, { call, put }) {
      const response = yield call(serviceBrand.getBrandInfo, payload.brandId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          brandInfo: response.data.brand,
        },
      });
    },

    *getProductByBrandBonus({ payload }, { call, put }) {
      const response = yield call(serviceBrand.getProductByBrandBonus, payload.params, payload.brandId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          products: response.data,
        },
      });
    },

    *getSellersByBrand({ payload }, { call, put, select }) {
      const response = yield call(serviceBrand.getSellerByBrandBonus, payload.data, payload.brandId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      const { sellers, filterSellers } = yield select(
        (_: any) => _.brandBonusState,
      );

      if (payload.isLoadMore) {
        yield put({
          type: 'updateState',
          payload: {
            sellers: [...sellers, ...response.data.data],
            filterSellers: {
              ...filterSellers,
              nextPageToken: response.data.nextPageToken,
            },
          },
        });
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          sellers: response.data.data,
          filterSellers: {
            nextPageToken: response.data.nextPageToken,
          },
          totalSellers: response.data.totalSellers
        },
      });
    },

    *searchSellersByBrand({ payload }, { call, put, select }) {
      const response = yield call(serviceBrand.searchSellerByBrandBonus, payload.data, payload.brandId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      const { searchSellers, filterSearchSellers } = yield select(
        (_: any) => _.brandBonusState,
      );

      if (payload.isLoadMore) {
        yield put({
          type: 'updateState',
          payload: {
            searchSellers: [...searchSellers, ...response.data.data],
            filterSearchSellers: {
              ...filterSearchSellers,
              nextPageToken: response.data.nextPageToken,
              keyword: payload.data.keyword,
            },
          },
        });
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          searchSellers: response.data.data,
          filterSearchSellers: {
            nextPageToken: response.data.nextPageToken,
            keyword: payload.data.keyword,
          },
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

export default BrandBonusModel;
