import { Effect, Reducer } from 'umi';

import { ResponseCode } from '@/configs/app';
import { serviceBrand, serviceNews } from '@/services';

export interface ISearchState {
  listBrandBonus?: any[];
  listBrand?: any[];
  filterListBrandBonus?: any;
  filterListBrand?: any;
}
const initState: ISearchState = {
  listBrandBonus: [],
  filterListBrandBonus: {},
  listBrand: [],
  filterListBrand: {},
};

interface ISearchModel {
  namespace: string;
  state: ISearchState;
  effects: {
    getBrandsBonus: Effect;
    getBrandAll: Effect;
  };
  reducers: {
    updateState: Reducer<ISearchState>;
    clearState: Reducer<ISearchState>;
  };
}

const SearchModel: ISearchModel = {
  namespace: 'searchState',
  state: initState,
  effects: {
    *getBrandsBonus({ payload }, { call, put, select }) {
      const response = yield call(
        serviceBrand.getSearchBrandBonus,
        payload.data,
      );
      if (response?.code !== ResponseCode.success) {
        return;
      }
      const { data } = response;
      const { listBrandBonus, filterListBrandBonus } = yield select(
        (_: any) => _.searchState,
      );

      if (payload.isLoadMore) {
        yield put({
          type: 'updateState',
          payload: {
            listBrandBonus: [...listBrandBonus, ...data.data],
            filterListBrandBonus: {
              ...filterListBrandBonus,
              nextPageToken: data.nextPageToken,
              keyword: payload.data.keyword,
            },
          },
        });
        return;
      }

      yield put({
        type: 'updateState',
        payload: {
          listBrandBonus: data.data,
          filterListBrandBonus: {
            nextPageToken: data.nextPageToken,
            keyword: payload.data.keyword,
          },
        },
      });
    },

    *getBrandAll({ payload }, { call, put, select }) {
      const response = yield call(serviceBrand.getBrandAll, payload.data);
      if (response?.code !== ResponseCode.success) {
        return;
      }
      const { data } = response;
      const { listBrand, filterListBrand } = yield select(
        (_: any) => _.searchState,
      );

      if (payload.isLoadMore) {
        yield put({
          type: 'updateState',
          payload: {
            listBrand: [...listBrand, ...data.data],
            filterListBrand: {
              ...filterListBrand,
              nextPageToken: data.nextPageToken,
              keyword: payload.data.keyword,
            },
          },
        });
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          listBrand: response.data.data,
          filterListBrand: {
            nextPageToken: data.nextPageToken,
            keyword: payload.data.keyword,
          },
        }
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

export default SearchModel;
