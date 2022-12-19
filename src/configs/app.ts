enum ToastTypes {
  success,
  error,
  warning,
}

export enum ResponseCode {
  success = 1,
  permission = 3,
}

export enum CheckoutTypes {
  cart,
  payment,
}

const viewMoreCount = 5;

const bannerType = {
  homeNews: 'home_news',
  homeBanner: 'home_banner',
  communityBanner: 'community_banner',
  groupTopSale_banner: 'group_top_sale_banner',
  groupNewestBanner: 'group_newest_banner',
  campaignBanner: 'campaign_banner',
  productPromotion: 'product_promotion',
};
const defaultPageLimit = 20;

const format = {
  timeDate: 'HH:mm DD-MM-YYYY',
  dateTime: 'DD/MM/YYYY - HH:mm',
  dateOnly: 'DD-MM-YYYY',
  dateWithDayMonthOnly: 'DD/MM',
  month: 'MM/YYYY',
  inputNumberFormatter: /\B(?=(\d{3})+(?!\d))/g,
  inputNumberParser: /\$\s?|(,*)/g,
  time: 'HH:mm',
};

const phoneNumberPrefix = '+84';

const genders = { male: 'male', female: 'female', other: 'other' };
const defaultUserName = 'User';

export default {
  phoneNumberPrefix,
  defaultUserName,
  genders,
  format,
  CheckoutTypes,
  ToastTypes,
  ResponseCode,
  viewMoreCount,
  bannerType,
  defaultPageLimit,
  localStorage: {
    authToken: 'authToken',
    keywords: 'keywords',
    city: 'city',
    deviceId: 'deviceId',
    onBoarded: 'onBoarded',
  },
};
