import { Effect, Reducer } from 'umi';

import { ResponseCode } from '@/configs/app';
import {
  serviceBrand
} from '@/services';

export interface ICategoryDetailState {
  brandInfo: any,
  categories: any[];
  guides: any[]
}
const initState: ICategoryDetailState = {
  brandInfo: {},
  categories: [],
  guides: []
};

interface ICategoryDetailModel {
  namespace: string;
  state: ICategoryDetailState;
  effects: {
    getDetailCategoryBrand: Effect;
  };
  reducers: {
    updateState: Reducer<ICategoryDetailState>;
    clearState: Reducer<ICategoryDetailState>;
  };
}

const CategoryDetailModel: ICategoryDetailModel = {
  namespace: 'categoryDetailState',
  state: initState,
  effects: {
    *getDetailCategoryBrand({ payload }, { call, put }) {
      const response = yield call(serviceBrand.getDetailCategoryBrand, payload.categoryId);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          category: response.data.data,
        },
      });
    },
    // *getGuidesByBrand({ payload }, { call, put }) {
    //   const response = yield call(serviceBrand.getGuidesByBrand, payload.brandId);
    //   if (response?.code !== ResponseCode.success) {
    //     return;
    //   }
    //   yield put({
    //     type: 'updateState',
    //     payload: {
    //       guides: response.data.data,
    //     },
    //   });
    // },
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

export default CategoryDetailModel;
