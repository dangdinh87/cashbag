export interface User {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  phone: Phone;
  statistic: Statistic;
  isNewUser: boolean;
  createdAt: string;
  referral: Referral;
  city: string;
  birthday: string;
  gender: string;
  tracking: Tracking;
}

interface UserList {}

interface Tracking {
  firstOrder: boolean;
}

interface Referral {
  code: string;
  link: string;
  shareContent: string;
  campaignLink: string;
}

interface Statistic {
  totalCashEarned: number;
  pendingCommission: number;
  remainingCash: number;
  successExpense: number;
  successWithdrawCash: number;
  voucherRewardUnused: number;
  voucherExchangedCash: number;
  totalTransaction: number;
  transactionSuccessCommission: number;
  transactionPendingCommission: number;
  totalTransactionSuccess: number;
  totalSuccessBonusCash: number;
  totalPendingBonusCash: number;
  unreadNotification: number;
  questTotalCoin: number;
  questWalkCoin: number;
  questWalkCash: number;
  totalWithdraw: number;
  totalSuccessWithdraw: number;
  totalCampaign: number;
  totalReferral: number;
  totalReview: number;
  rewardCash: number;
}

interface Phone {
  number: string;
  countryCode: string;
  full: string;
  verified: boolean;
}
