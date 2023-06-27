import { User } from '@/interface';
import { Response } from '@/interface/common';
import { serviceUser } from '@/services';
import { Effect, Reducer } from 'umi';

export interface UserState {
  user?: User;
}

const initState: UserState = {};

interface UserModel {
  namespace: string;
  state: UserState;
  effects: {
    getUserDetail: Effect;
    requestPhoneUser: Effect;
  };
  reducers: {
    updateState: Reducer<UserState>;
    clearState: Reducer<UserState>;
  };
}

const UserModel: UserModel = {
  namespace: 'userState',
  state: initState,
  effects: {
    *getUserDetail({}, { call, put }) {
      const response: Response<User, 'user'> = yield call(
        serviceUser.getDetailUser,
      );
      if (!response) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          user: response?.data?.user,
        },
      });
    },
    *requestPhoneUser({ payload, callback }, { call }) {
      const response: Response<Object> = yield call(
        serviceUser.verifyPhoneUser,
        payload.data,
      );
      if (!response) {
        return;
      }
      callback?.();
    },
  },
  reducers: {
    updateState(state: UserState, action: any) {
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

export default UserModel;
