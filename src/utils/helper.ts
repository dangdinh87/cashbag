import moment from 'moment';
import { useState } from 'react';
import { history, isBrowser } from 'umi';

import { logger } from './';

const chunkArray = (array: any[], chunk: number) => {
  var i, j;
  const result = [];
  for (i = 0, j = array.length; i < j; i += chunk) {
    result.push(array.slice(i, i + chunk));
  }
  return result;
};

const roundNumberToUnit = (value: number, unit: number) => {
  return Math.ceil(value / unit) * unit;
};

const isInViewport = (element: any) => {
  if (!element || !document) {
    return;
  }
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

function getGgPlayStoreLink() {
  if (!isBrowser()) {
    return;
  }
  return `market://details?id=vn.selly&referrer=${encodeURI(
    window.location.href,
  )}`;
}

function getAppStoreLink(referralCode?: string) {
  if (!referralCode) {
    return 'https://apps.apple.com/vn/app/selly-dễ-dàng-bán-hàng/id1554981586';
  }
  return `https://app.adjust.com/d779znq?deeplink=selly%3A%2F%2Fdeeplink%3FreferralCode%3D${referralCode}`;
}

function isFbBrowser() {
  return /FBAN|FBAV/g.test(navigator?.userAgent);
}

function isFbMessenger() {
  return /FBAN\/Messenger/g.test(navigator?.userAgent);
}

function toQueryString(json: any) {
  return Object.keys(json)
    .map((k) => `${k}=${encodeURIComponent(json[k])}`)
    .join('&');
}

function getPhotoURL(photo: any, size: 'md' | 'sm' = 'md') {
  if (!photo?.sizes?.[size]) return '';
  return photo.sizes[size].url;
}

export function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

// function parseHtml(htmlContent) {
//   return parse(htmlContent.replaceAll('<p></p>', '<br />'));
// }

const getWindow = () => {
  if (!isBrowser()) {
    return;
  }
  return window;
};

function handle404Error() {
  if (!isBrowser()) {
    return;
  }
  history?.push('/404');
}

function getCurrentDomain() {
  return getWindow()?.location?.hostname;
}

function sortCities(cities: any[]) {
  if (!cities) {
    return;
  }
  const priority = ['ha-noi', 'da-nang', 'ho-chi-minh'];
  const list1 = cities
    .filter((item) => priority.includes(item.slug))
    .sort((a, b) => a.id - b.id);
  const list2 = cities.filter((item) => !priority.includes(item.slug));
  return [...list1, ...list2];
}

function prepareCitySlug(slug) {
  if (slug === 'ho-chi-minh') {
    return 'tp-ho-chi-minh';
  }
  return slug || '';
}

const getLoadMoreCount = (current, total, limit) => {
  if (!total) {
    return limit;
  }
  let result = total - limit * (current + 1);
  if (result > limit) {
    result = limit;
  }
  return result < 0 ? 0 : result;
};

const classNames = (...classNames: string[]) => {
  return classNames.join(' ');
};

function objectToBase64(value) {
  const result = Buffer.from(JSON.stringify(value)).toString('base64');
  return result;
}

function redirectCampaignLink(action: any) {
  return `https://app.adjust.com/876eusz?label=Selly&deeplink=selly%3A%2F%2Faction%3Ftype%3D${action.type}%26value%3D${action.value}&redirect=https%3A%2F%2Fselly.vn&deeplink_js=1`;
}

function getActionLink(action: any) {
  return `https://app.adjust.com/7a53kvn?label=Selly&deeplink=selly%3A%2F%2Faction%3Ftype%3D${action.type}%26value%3D${action.value}&redirect=https%3A%2F%2Fselly.vn&deeplink_js=1`;
}

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

function sumArray(arr: number[]) {
  if (!arr.length) {
    return 0;
  }
  return arr.reduce((prev, curr) => prev + curr);
}

function fromNow(date) {
  return moment().diff(date, 'days');
}

function hideNumber(rawNumber: string) {
  return rawNumber.slice(0, -3) + '***';
}

function filterEmptyProperties(object) {
  return Object.entries(object).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {},
  );
}

function downloadFileFromLink(url, name) {
  if (!url) {
    return;
  }
  try {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
      });
    });
  } catch (err) {
    logger.error(err);
  }
}

function isZalo() {
  return window.navigator.userAgent.includes('Zalo');
}

function copyToClipboard(content, success?) {
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    navigator.clipboard.writeText(content);
    success?.();
    return;
  } else {
    // text area method
    let textArea = document.createElement('textarea');
    textArea.value = content;
    // make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res('') : rej();
      textArea.remove();
      success?.();
    });
  }
}

function sortByValue(field, desc = false) {
  return function (a, b) {
    if (a[field] > b[field]) {
      return desc ? -1 : 1;
    } else if (a[field] < b[field]) {
      return desc ? 1 : -1;
    }
    return 0;
  };
}

export default {
  downloadFileFromLink,
  getPhotoURL,
  chunkArray,
  roundNumberToUnit,
  isInViewport,
  getGgPlayStoreLink,
  getAppStoreLink,
  isFbBrowser,
  isFbMessenger,
  redirectCampaignLink,
  toQueryString,
  groupBy,
  sortByValue,
  getWindow,
  handle404Error,
  getCurrentDomain,
  sortCities,
  getLoadMoreCount,
  classNames,
  prepareCitySlug,
  objectToBase64,
  getOS,
  sumArray,
  fromNow,
  hideNumber,
  getActionLink,
  filterEmptyProperties,
  isZalo,
  copyToClipboard,
}
