import { Effect, Reducer } from 'umi';

// import {
//   IUser,
// } from '@/interfaces';
import {
  serviceUser,
  // serviceUser,
  serviceZalo,
} from '@/services';
import { navigator, storage } from '@/utils';

export interface IMainState {
  appData: any;
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
    *initApp({ callback }, { call, put }) {
      yield call(serviceZalo.initZalo);
      // const zaloAppData = yield call(serviceZalo.getAppData);
      // yield put({ type: 'updateState', payload: { zaloAppData } });
      // yield put({ type: 'getAppData' });
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
      navigator.pushPath('/home');
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
    clearState(state) {
      return {
        ...initState,
        appData: state.appData,
      };
    },
  },
};

export default MainModel;
