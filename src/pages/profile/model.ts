import { serviceUser } from '@/services';

const initState = {
}

const UserModel = {
  namespace: 'userState',
  state: initState,
  effects: {
    *getUserDetail({ }, { call, put }) {
      const response = yield call(
        serviceUser.getDetailUser,
      );
      if (!response) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          user: response.data.user,
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

export default UserModel;
