import { Effect, Reducer } from 'umi';

import { AppConst } from '@/configs';
// import {
//   IUser,
// } from '@/interfaces';
import {
  // serviceUser,
  serviceZalo,
} from '@/services';
import { helper, storage } from '@/utils';

export interface IMainState {
  // user: IUser;
  isLoggedIn: boolean;
  cartChanged: boolean;
  zaloAppData: any;
}

const initState: any = {
  categories: [],
  cities: [],
  selectedProduct: null,
  cartItems: [],
  totalOrder: 0,
  totalCartItem: 0,
  cartChanged: false,
  productCities: [],
};

export interface IMainModel {
  namespace: string;
  state: IMainState;
  effects: {
    initApp: Effect;
    openZaloChat: Effect;
    setOnBoarded: Effect;
  };
  reducers: {
    updateState: Reducer<IMainState>;
    clearState: Reducer<IMainState>;
  };
}

const MainModel: IMainModel = {
  namespace: 'mainState',
  state: initState,
  effects: {
    // NOTE: For initialize home page after when SSR is applied for main app. Temporary unused!!
    // *init({ payload }, { put, all }) {
    //   yield put({
    //     type: 'getCartItems',
    //   });
    //   yield put({
    //     type: 'getCategories',
    //   });
    //   yield put({
    //     type: 'getProductCities',
    //   });
    //   yield put({
    //     type: 'getCartItems',
    //   });
    // },
    *initApp({ callback }, { call, put }) {
      yield call(serviceZalo.initZalo);
      // const zaloAppData = yield call(serviceZalo.getAppData);
      // console.log(zaloAppData);
      // yield put({ type: 'updateState', payload: { zaloAppData } });

      // yield put({ type: 'getAppData' });
      // const result = { isLoggedIn: false, user: null };
      // const { authToken } = yield call(storage.getUserToken);
      // if (!authToken) {
      //   yield put({ type: 'updateState', payload: result });
      //   callback?.();
      //   return;
      // }
      // const { data, code } = yield call(serviceUser.getUserDetail);
      // if (
      //   code === AppConst.ResponseCode.permission ||
      //   code !== AppConst.ResponseCode.success
      // ) {
      //   yield call(storage.clearUserToken);
      // } else {
      //   result.user = data.user;
      //   result.isLoggedIn = true;
      // }
      // yield put({ type: 'updateState', payload: result });
      // callback?.(data.user);
    },
    *openZaloChat(_, { call }) {
      yield call(serviceZalo.openChat);
    },

  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearState(state, action) {
      return {
        ...initState,
        appData: state.appData,
      };
    },
  },
};

export default MainModel;
