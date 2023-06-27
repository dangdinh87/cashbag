import { ResponseCode } from '@/configs/app';
import { BankCard } from '@/interface';
import { Response } from '@/interface/common';
import { serviceBank, serviceWithdraw } from '@/services';
import { Effect, Reducer } from 'umi';

export interface WithdrawState {
  bankCardSelectedWithdraw?: BankCard;
}

const initState: WithdrawState = {};

interface WithdrawModel {
  namespace: string;
  state: WithdrawState;
  effects: {
    getUserBankList: Effect;
    createRequestWithdraw: Effect;
  };
  reducers: {
    updateState: Reducer<WithdrawState>;
    clearState: Reducer<WithdrawState>;
  };
}

const WithdrawModel: WithdrawModel = {
  namespace: 'withdrawModel',
  state: initState,
  effects: {
    *getUserBankList({}, { call, put }) {
      const response: Response<BankCard[], 'cards'> = yield call(
        serviceBank.getBankCards,
      );
      if (response.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          cards: response?.data?.cards,
        },
      });
    },
    *createRequestWithdraw({ payload, callback }, { call, put }) {
      const response = yield call(
        serviceWithdraw.createRequestWithdraw,
        payload.data,
      );
      if (response.code !== ResponseCode.success) {
        return;
      }
      callback?.(response.data.requestId);
    },
  },
  reducers: {
    updateState(state: WithdrawState, action: any) {
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

export default WithdrawModel;
