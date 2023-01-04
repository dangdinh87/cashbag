import { serviceTransaction } from '@/services';

const initState = {
  // transactionDetail: {}
};

const TransactionDetailModel = {
  namespace: 'transactionDetailState',
  state: initState,
  effects: {
    *getDetailTransaction({ payload }, { call, put }) {
      const response = yield call(
        serviceTransaction.getDetailTransaction,
        payload.transactionId,
      );
      if (!response) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          transactionDetail: response.data.transaction,
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

export default TransactionDetailModel;
