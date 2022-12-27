import { Effect, Reducer } from 'umi';

import { ResponseCode } from '@/configs/app';
import {
  serviceBrand
} from '@/services';

export interface IBrandDetailState {
  brandInfo: any,
  categories: any[];
  guides: any[]
}
const initState: IBrandDetailState = {
  brandInfo: {},
  categories: [],
  guides: []
};

interface IBrandDetailModel {
  namespace: string;
  state: IBrandDetailState;
  effects: {
    getBrandInfo: Effect;
    getCategoriesByBrand: Effect;
    getGuidesByBrand: Effect;
  };
  reducers: {
    updateState: Reducer<IBrandDetailState>;
    clearState: Reducer<IBrandDetailState>;
  };
}

const BrandDetailModel: IBrandDetailModel = {
  namespace: 'brandDetailState',
  state: initState,
  effects: {
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
    *getCategoriesByBrand({ payload }, { call, put }) {
      const response = yield call(serviceBrand.getCategoriesByBrand, payload.brandId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          categories: response.data.data,
        },
      });
    },
    *getGuidesByBrand({ payload }, { call, put }) {
      const response = yield call(serviceBrand.getGuidesByBrand, payload.brandId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          guides: response.data.data,
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

export default BrandDetailModel;
