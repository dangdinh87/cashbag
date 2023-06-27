import * as apis from 'zmp-sdk/apis';

import { toast } from '@/components/app/toast/manager';
import { AppConst, ZaloConst } from '@/configs';
import { helper } from '@/utils';

async function initZalo() {
  return await apis.setNavigationBarLeftButton({
    type: 'home',
  });
}
async function getPhoneNumber(callback) {
  const { number, token } = await apis.getPhoneNumber({
    success: () => {
      callback?.();
    },
    fail: (error) => {
      callback?.();
    },
  });
  return number;
}

async function openChat() {
  return await apis.openChat({
    type: 'oa',
    id: ZaloConst.oaId,
    fail: (err) => {
      console.log(err);
      toast.error();
    },
  });
}

function getAppData() {
  if (helper.isZalo()) {
    return;
    // return getStorage({
    //   keys: Object.values(AppConst.localStorage),
    //   fail: (error) => {
    //     console.log(error);
    //   },
    // });
  }
  return new Promise((resolve, reject) => {
    resolve({
      [AppConst.localStorage.authToken]: localStorage.getItem(
        AppConst.localStorage.authToken,
      ),
      [AppConst.localStorage.deviceId]: localStorage.getItem(
        AppConst.localStorage.deviceId,
      ),
      [AppConst.localStorage.onBoarded]: localStorage.getItem(
        AppConst.localStorage.onBoarded,
      ),
    });
  });
}

function clearAppData() {
  return apis.clearStorage({
    success: (data: any) => {
      console.log('success');
    },
    fail: (error) => {
      console.log(error);
    },
  });
}

async function setOnBoarded() {
  return await apis.setStorage({
    data: { [AppConst.localStorage.onBoarded]: true },
    fail: (error) => {
      console.log(error);
    },
  });
}

async function login(callback: () => void) {
  return await apis.login({
    success: (data) => {
      callback?.();
    },
    fail: (error) => {
      console.log(error);
    },
  });
}

async function getAccessToken() {
  return await apis.getAccessToken({
    fail: (error) => {
      console.log(error);
    },
  });
}

function openOutApp(url: any) {
  return apis.openOutApp({
    url,
    fail: (error: any) => {
      console.log(error);
    },
  });
}

async function getAppInfo() {
  const { name, version } = await apis.getAppInfo({
    fail: (error) => {
      console.log(error);
    },
  });
  return { version, name };
}

export default {
  initZalo,
  getPhoneNumber,
  openChat,
  getAppData,
  setOnBoarded,
  clearAppData,
  login,
  getAccessToken,
  openOutApp,
  getAppInfo,
};
