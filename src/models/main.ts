import { Effect, Reducer } from 'umi';

import {
  serviceSystem,
  serviceUser,
  // serviceUser,
  serviceZalo,
} from '@/services';
import { navigator, storage } from '@/utils';
import { AppData } from '@/interface';

export interface IMainState {
  appData: AppData;
  // user: IUser;
  isLoggedIn: boolean;
  cartChanged: boolean;
  zaloAppData: any;
  showOnboarding?: boolean;
  loadingNewUser?: boolean;
  isPhoneRequested: boolean;
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
  showOnboarding: false,
  loadingNewUser: false,
  isPhoneRequested: false,
};

export interface IMainModel {
  namespace: string;
  state: IMainState;
  effects: {
    initApp: Effect;
    openZaloChat: Effect;
    getAppData: Effect;
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
    *initApp({}, { call, put }) {
      yield call(serviceZalo.initZalo);
      const { authToken } = yield call(storage.getUserToken);
      if (!authToken) {
        yield put({
          type: 'updateState',
          payload: { showOnboarding: true, loadingNewUser: true },
        });
        const accessToken = yield call(serviceZalo.getAccessToken);
        const { data } = yield call(serviceUser.loginZalo, {
          token: accessToken,
        });
        yield call(storage.setUserToken, data.token);
      }
      const { data } = yield call(serviceUser.getDetailUser);
      yield put({
        type: 'userState/updateState',
        payload: { user: data?.user },
      });
      yield put({
        type: 'getAppData',
      });
      yield put({ type: 'updateState', payload: { loadingNewUser: false } });
      navigator.pushPath('/home');
    },
    *openZaloChat(_, { call }) {
      yield call(serviceZalo.openChat);
    },
    *getAppData(_, { call, put }) {
      const response = yield call(serviceSystem.getAppData);
      const { data } = response;
      yield put({
        type: 'updateState',
        payload: { appData: data },
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
    clearState(state) {
      return {
        ...initState,
        appData: state.appData,
      };
    },
  },
};

export default MainModel;
