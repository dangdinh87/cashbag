/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
import moment from 'moment';
import 'moment/locale/vi';
import { AppConst } from '@/configs';

/**
 * Format number
 *
 * @param value
 */
const number = (
  value: number,
  defaultValue: string | number = '',
): string | number => {
  if (!value) {
    return defaultValue;
  }
  return Number(value.toFixed(1)).toLocaleString().replaceAll(',', '.');
};

const currency = (
  value: number | undefined,
  currentFormat: { style: string; unit: string } = {
    style: 'vi-VI',
    unit: 'VND',
  },
): string => {
  if (!value) {
    return '0đ';
  }

  // format theo props currentFormat
  return (
    new Intl.NumberFormat(currentFormat.style).format(
      Math.round(Number(value)),
    ) + 'đ'
  );
};

const normalizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return phoneNumber;
  }
  return phoneNumber.replace(AppConst.phoneNumberPrefix, '0');
};

const timeDate = (value) => {
  if (!value) {
    return '';
  }
  return moment(value).format(AppConst.format.timeDate);
};

const dateTimeComma = (value) => {
  if (!value) {
    return '';
  }
  return moment(value).format(AppConst.format.dateTimeComma);
};

const dateTime = (value) => {
  if (!value) {
    return '';
  }
  return moment(value).format(AppConst.format.dateTime);
};

const time = (value) => {
  if (!value) {
    return '';
  }
  return moment(value).format(AppConst.format.time);
};

const date = (value) => {
  if (!value) {
    return '';
  }
  return moment(value).format(AppConst.format.dateOnly);
};

function prefixPhoneNumber(rawValue, prefix = AppConst.phoneNumberPrefix) {
  let result = rawValue;
  if (rawValue.startsWith('0')) {
    result = result.replace('0', '');
  }
  return prefix + result;
}

function currencyUnitToText(value: number) {
  if (value < 1000 || typeof value !== 'number') {
    return value;
  }
  const result = Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    notation: 'compact',
  }).format(value);
  return result.replace('M', ' triệu').replace('B', ' tỷ');
}

const numberNew = (value: number | undefined): string => {
  if (!value) {
    return '0';
  }

  return Number(value.toFixed(0)).toLocaleString();
};

const cashValue = (
  value: number | undefined,
  currentFormat: { style: string; unit: string } = {
    style: 'vi-VI',
    unit: 'đ',
  },
): string => {
  if (!value) {
    return '0 đ';
  }

  // format theo props currentFormat
  return new Intl.NumberFormat(currentFormat.style, {
    style: 'currency',
    currency: currentFormat.unit,
  }).format(value);
};

const mangso = [
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
];

function dochangchuc(so, daydu) {
  let chuoi = '',
    chuc = Math.floor(so / 10),
    donvi = so % 10;
  if (chuc > 1) {
    chuoi = ' ' + mangso[chuc] + ' mươi';
    if (donvi == 1) {
      chuoi += ' mốt';
    }
  } else if (chuc == 1) {
    chuoi = ' mười';
    if (donvi == 1) {
      chuoi += ' một';
    }
  } else if (daydu && donvi > 0) {
    chuoi = ' lẻ';
  }
  if (donvi == 5 && chuc > 1) {
    chuoi += ' lăm';
  } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
    chuoi += ' ' + mangso[donvi];
  }
  return chuoi;
}

function docblock(so, daydu) {
  let chuoi = '',
    tram = Math.floor(so / 100);
  so = so % 100;
  if (daydu || tram > 0) {
    chuoi = ' ' + mangso[tram] + ' trăm';
    chuoi += dochangchuc(so, true);
  } else {
    chuoi = dochangchuc(so, false);
  }
  return chuoi;
}

function dochangtrieu(so, daydu) {
  let chuoi = '';
  const trieu = Math.floor(so / 1000000);
  so = so % 1000000;
  if (trieu > 0) {
    chuoi = docblock(trieu, daydu) + ' triệu';
    daydu = true;
  }
  const nghin = Math.floor(so / 1000);
  so = so % 1000;
  if (nghin > 0) {
    chuoi += docblock(nghin, daydu) + ' nghìn';
    daydu = true;
  }
  if (so > 0) {
    chuoi += docblock(so, daydu);
  }
  return chuoi;
}

function numberToWords(so) {
  if (so == 0) return mangso[0];
  let chuoi = '',
    hauto = '';
  do {
    const ty = so % 1000000000;
    so = Math.floor(so / 1000000000);
    if (so > 0) {
      chuoi = dochangtrieu(ty, true) + hauto + chuoi;
    } else {
      chuoi = dochangtrieu(ty, false) + hauto + chuoi;
    }
    hauto = ' tỷ';
  } while (so > 0);
  return chuoi;
}

function cashToWords(cash) {
  const result = `${numberToWords(cash)} đồng`;
  return result;
}

function relativeDateTime(dateTime: any) {
  if (!dateTime) return;
  if (moment().diff(dateTime, 'days') < 8) {
    return moment(dateTime).fromNow();
  } else {
    return moment(dateTime).format(AppConst.format.dateTime);
  }
}

function getDayCount(date) {
  if (!time) return;
  const duration = moment.duration(
    moment().startOf('days').diff(moment(date).startOf('days')),
  );
  return duration.asDays();
}

function formatShortNumberCash(value: number) {
  if (value > 1000000000) return `${(value / 1000000000).toFixed(1)} tỷ`;
  if (value > 1000000) return `${(value / 1000000).toFixed(1)} triệu`;
  if (value > 1000) return `${(value / 1000).toFixed(1)} ngàn`;
  return `${value} đ`;
}

function formatShortNumber(value: number) {
  if (value > 1000000000) return `${(value / 1000000000).toFixed(1)} tỷ`;
  if (value > 1000000) return `${(value / 1000000).toFixed(1)} triệu`;
  if (value > 1000) return `${(value / 1000).toFixed(1)} ngàn`;
  return value;
}

export default {
  cashToWords,
  numberToWords,
  date,
  timeDate,
  dateTime,
  dateTimeComma,
  number,
  currency,
  normalizePhoneNumber,
  prefixPhoneNumber,
  currencyUnitToText,
  numberNew,
  cashValue,
  time,
  relativeDateTime,
  getDayCount,
  formatShortNumberCash,
  formatShortNumber,
};
