import { ResponseCode } from '@/configs/app';
import { serviceTransaction } from '@/services';

const initState = {
  transactionList: [],
  transactionDetail: {}
}

const TransactionModel = {
  namespace: 'transactionState',
  state: initState,
  effects: {
    *getListOrder({ payload }, { call, put }) {
      const response = yield call(
        serviceTransaction.getListTransaction,
        payload.data
      );
      if (!response) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          transactionList: response.data.transactions,
        },
      });
    },
  },
  reducers: {
    updateState(state, action) {
      console.log(state)
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

export default TransactionModel;
