import { ResponseCode } from '@/configs/app';
import { Bank, Branch, BankCard } from '@/interface';
import { Response } from '@/interface/common';
import { serviceBank } from '@/services';
import { Effect, Reducer } from 'umi';

export interface BankState {
  cards?: BankCard[];
  bankListFilter?: {
    nexPageToken?: string;
  };
  banks: Bank[];
  currentBank?: Bank;
  currentBankCard?: BankCard;
  branches?: Branch[];
  currentBranch?: Branch;
}

const initState: BankState = {
  cards: [],
  bankListFilter: {},
  banks: [],
  branches: [],
};

interface BankModel {
  namespace: string;
  state: BankState;
  effects: {
    getUserBankList: Effect;
    getBankList: Effect;
    createBankCards: Effect;
    getBankBranchList: Effect;
    updateBankCards: Effect;
    deleteBankCards: Effect;
  };
  reducers: {
    searchBankList: Reducer<BankState>;
    updateState: Reducer<BankState>;
    clearState: Reducer<BankState>;
  };
}

const BankModel: BankModel = {
  namespace: 'bankModel',
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
    *getBankList({ payload }, { call, put, select }) {
      const response: Response<Bank, 'banks'> = yield call(
        serviceBank.getBankList,
        payload.query,
      );
      if (response.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          banks: response?.data?.banks,
        },
      });
    },
    *getBankBranchList({ payload, callback }, { call, put, select }) {
      const response: Response<Bank, 'branches'> = yield call(
        serviceBank.getBranchBankList,
        payload.bankId,
        payload.query,
      );
      if (response.code !== ResponseCode.success) {
        return;
      }
      yield put({
        type: 'updateState',
        payload: {
          branches: response?.data?.branches,
        },
      });
      callback?.();
    },
    *createBankCards({ payload, callback }, { call, put }) {
      const response: Response<BankCard> = yield call(
        serviceBank.createBankCards,
        payload.data,
      );
      if (response.code !== ResponseCode.success) {
        return;
      }
      callback?.();
    },
    *updateBankCards({ payload, callback }, { call, put }) {
      const response: Response<BankCard> = yield call(
        serviceBank.updateBankCards,
        payload.data,
        payload.cardId,
      );
      if (!response) {
        return;
      }
      callback?.();
    },
    *deleteBankCards({ payload, callback }, { call, put }) {
      const response: Response<BankCard> = yield call(
        serviceBank.deleteBankCards,
        payload.cardId,
      );
      if (response.code !== ResponseCode.success) {
        return;
      }
      callback?.();
    },
  },
  reducers: {
    searchBankList(state: BankState, action) {
      const { payload } = action;
      const banks = state.banks.filter((bank) =>
        bank.name.includes(payload.keyword),
      );
      return {
        ...state,
        banks,
      };
    },
    updateState(state: BankState, action: any) {
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

export default BankModel;
