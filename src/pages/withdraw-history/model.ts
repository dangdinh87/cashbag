import { Effect, Reducer } from 'umi';
import { serviceWithdraw } from '@/services';
import { CommonProps } from '@/interface';

export interface IWithdrawHistoryState {
  withdrawHistory?: any[];
  filter: any;
}

const initState: IWithdrawHistoryState = {
  filter: {
    page: 0,
    total: 0,
  },
};

interface IWithdrawHistoryModel {
  namespace: string;
  state: IWithdrawHistoryState;
  effects: {
    getWithdrawHistory: Effect;
    getWithdrawDetail: Effect;
  };
  reducers: {
    updateState: Reducer<IWithdrawHistoryState>;
    clearState: Reducer<IWithdrawHistoryState>;
    loadMoreItem: Reducer<IWithdrawHistoryState>;
  };
}

const WithdrawHistoryModel: IWithdrawHistoryModel = {
  namespace: 'withdrawHistoryState',
  state: initState,
  effects: {
    *getWithdrawHistory({ payload, callback }, { call, put }) {
      const { data } = yield call(
        serviceWithdraw.getWithdrawCashList,
        payload.query,
      );
      if (payload.isLoadMore) {
        yield put({
          type: 'loadMoreItem',
          payload: {
            data,
            query: payload.query,
          },
        });
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          withdrawHistory: data.histories,
          filter: {
            ...payload?.query,
            nextPageToken: data.nextPageToken,
            total: data.total,
          },
        },
      });
      callback?.();
    },
    *getWithdrawDetail({ payload, callback }, { call, put }) {
      const { data } = yield call(
        serviceWithdraw.getWithdrawDetail,
        payload.withdrawId,
      );
      yield put({
        type: 'updateState',
        payload: {
          withdrawDetail: data.withdraw,
        },
      });
      callback?.();
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
      };
    },
    loadMoreItem(state, { payload }) {
      const result = [...state.withdrawHistory, ...payload.data.histories];
      return {
        ...state,
        withdrawHistory: result,
        filter: {
          ...payload?.query,
          nextPageToken: payload.data.nextPageToken,
          total: payload.data.total,
        },
      };
    },
  },
};

export default WithdrawHistoryModel;
