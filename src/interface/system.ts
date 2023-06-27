export interface AppData {
  withdrawCash: WithdrawCash;
  appVersion: AppVersion;
  brandPromotions: BrandPromotion[];
  referral: Referral;
  cities: City[];
  faq: Faq;
  intercom: Intercom;
  posts: Posts;
  isOnLogout: boolean;
  birthday: Birthday;
  remoteConfig: RemoteConfig;
  review: Review;
}

interface Review {
  brands: BrandPromotion[];
  tags: any[];
  editTimePerReview: number;
  reviewTimePerDay: number;
  maximumNumOfPhoto: number;
  action: Action;
}

interface Action {
  type: string;
  value: string;
}

interface RemoteConfig {
  facebook: boolean;
  firebase: boolean;
  airbridge: boolean;
  adjust: boolean;
}

interface Birthday {
  isShowInfo: boolean;
  age: number;
}

interface Posts {
  minSuccessExpensePostID: string;
  minWithdrawValuePostID: string;
  review: string;
}

interface Intercom {
  showFloatButton: boolean;
  enable: boolean;
}

interface Faq {
  url: string;
}

export interface City {
  name: string;
  slug: string;
}

interface Referral {
  additionalCommissionPercent: number;
}

interface BrandPromotion {
  _id: string;
  name: string;
}

interface AppVersion {
  iOS: string;
  android: string;
}

interface WithdrawCash {
  minWithdrawValue: number;
  bankFee: number;
  minWithdrawSuccessExpense: number;
  maxTimeReceivedCash: number;
  note: string;
}
