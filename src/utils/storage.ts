import { isBrowser } from 'umi';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, setStorage, removeStorage } from 'zmp-sdk/apis';

import { AppConst } from '@/configs';

import { helper } from './';

/**
 * Get user token from storage
 */
const getUserToken = (): string | any => {
  if (helper.isZalo()) {
    return getStorage({
      keys: [AppConst.localStorage.authToken],
      fail: (error) => {
        console.log(error);
      },
    });
  }
  return new Promise((resolve, reject) => {
    resolve({
      [AppConst.localStorage.authToken]: localStorage.getItem(
        AppConst.localStorage.authToken,
      ),
    });
  });
};

/**
 * Set user token in storage
 * @param token
 */
const setUserToken = (token: string) => {
  if (helper.isZalo()) {
    console.log('setUserToken', token);
    return setStorage({
      data: {
        [AppConst.localStorage.authToken]: token,
      },
      fail: (error) => {
        console.log(error);
      },
    });
  } else {
    return new Promise((resolve, reject) => {
      console.log('setUserToken', token);
      localStorage.setItem(AppConst.localStorage.authToken, token);
      return resolve({});
    });
  }
};

const clearUserToken = () => {
  if (!isBrowser()) {
    return null;
  }
  if (helper.isZalo()) {
    console.log('clearUserToken');
    return removeStorage({
      keys: [AppConst.localStorage.authToken],
      fail: (error) => {
        console.log(error);
      },
    });
  }
  return new Promise((resolve, reject) => {
    localStorage.removeItem(AppConst.localStorage.authToken);
    return resolve({});
  });
  // return localStorage.removeItem(AppConst.localStorage.authToken);
};

const saveKeyword = (keyword) => {
  if (!isBrowser()) {
    return;
  }
  const history = new Set(getKeywords());
  history.add(keyword);
  localStorage.setItem(
    AppConst.localStorage.keywords,
    JSON.stringify([...history]),
  );
};

const getKeywords = () => {
  if (!isBrowser()) {
    return;
  }
  const data = localStorage.getItem(AppConst.localStorage.keywords);
  const keywords = data && JSON.parse(data);
  return keywords?.length > 0 ? keywords : [];
};

const saveSelectedCity = (citySlug) => {
  if (!isBrowser()) {
    return;
  }
  sessionStorage.setItem(AppConst.localStorage.city, citySlug);
};

const getSelectedCity = () => {
  if (!isBrowser()) {
    return;
  }
  return sessionStorage.getItem(AppConst.localStorage.city);
};

function getSavedDeliveryInfo() {
  const result = localStorage.getItem('deliveryInfo');
  if (result) {
    return JSON.parse(result);
  }
  return null;
}

function saveDeliveryInfo(info) {
  return localStorage.setItem('deliveryInfo', JSON.stringify(info));
}

function removeDeliveryInfo() {
  return localStorage.removeItem('deliveryInfo');
}

function getDeviceId() {
  return localStorage.getItem(AppConst.localStorage.deviceId);
}

function generateDeviceId() {
  const generatedId = uuidv4();
  return localStorage.setItem(AppConst.localStorage.deviceId, generatedId);
}

const getShowPhoneRequested = (): string | any => {
  if (helper.isZalo()) {
    return getStorage({
      keys: [AppConst.localStorage.isShowPhoneRequest],
      fail: (error) => {
        console.log(error);
      },
    });
  }
  return new Promise((resolve, reject) => {
    resolve({
      [AppConst.localStorage.isShowPhoneRequest]: localStorage.getItem(
        AppConst.localStorage.isShowPhoneRequest,
      ),
    });
  });
};

const setShowPhoneRequested = () => {
  if (helper.isZalo()) {
    return setStorage({
      data: {
        [AppConst.localStorage.isShowPhoneRequest]: true,
      },
      fail: (error) => {
        console.log(error);
      },
    });
  } else {
    return new Promise((resolve, reject) => {
      localStorage.setItem(AppConst.localStorage.isShowPhoneRequest, 'true');
      return resolve({});
    });
  }
};

export default {
  getUserToken,
  setUserToken,
  clearUserToken,
  saveKeyword,
  getKeywords,
  saveSelectedCity,
  getSelectedCity,
  getSavedDeliveryInfo,
  saveDeliveryInfo,
  removeDeliveryInfo,
  getDeviceId,
  generateDeviceId,
  getShowPhoneRequested,
  setShowPhoneRequested,
};
