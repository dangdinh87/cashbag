enum ToastTypes {
  success,
  error,
  warning,
}

export enum ResponseCode {
  success = 1,
  permission = 3,
}

const format = {
  timeDate: 'HH:mm DD-MM-YYYY',
  dateTime: 'DD/MM/YYYY - HH:mm',
  dateOnly: 'DD/MM/YYYY',
  dateWithDayMonthOnly: 'DD/MM',
  month: 'MM/YYYY',
  inputNumberFormatter: /\B(?=(\d{3})+(?!\d))/g,
  inputNumberParser: /\$\s?|(,*)/g,
  time: 'HH:mm',
};

const phoneNumberPrefix = '+84';

const filterState = {
  order: {
    cashback: 'Đã hoàn tiền',
    pending: 'Đang xử lý',
    approved: 'Đã xác nhận',
    rejected: 'Đã hủy',
  },
  cashback: {
    cashback: 'Hoàn tiền',
    pending: 'Đang chờ duyệt',
    approved: 'Đang chờ duyệt',
    rejected: 'không thành công',
  },
};

const colorState = {
  cashback: {
    cashback: '#23C6C8',
    pending: '#F8AC59',
    approved: '#F8AC59',
    rejected: '#ED5565',
  },
};

export default {
  phoneNumberPrefix,
  format,
  ToastTypes,
  ResponseCode,
  filterState,
  colorState,
  localStorage: {
    authToken: 'authToken',
    keywords: 'keywords',
    city: 'city',
    deviceId: 'deviceId',
    onBoarded: 'onBoarded',
    isShowPhoneRequest: 'isShowPhoneRequest',
  },
};
