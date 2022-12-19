import api from 'zmp-sdk';

import { toast } from '@/components/app/toast/manager';
import { AppConst, ZaloConst } from '@/configs';

async function initZalo() {
  return await api.setNavigationBarLeftButton({
    type: 'home',
  });
}

async function getPhoneNumber() {
  const { number } = await api.getPhoneNumber({
    fail: (error) => {
      console.log(error);
    },
  });
  return number;
}

async function openChat() {
  return await api.openChat({
    type: 'oa',
    id: ZaloConst.oaId as string,
    fail: (err) => {
      console.log(err);
      toast.error();
    },
  });
}

async function getAppData() {
  return await api.getStorage({
    keys: Object.values(AppConst.localStorage),
    fail: (error) => {
      console.log(error);
    },
  });
}

function clearAppData() {
  return api.clearStorage({
    success: (data) => {
      console.log('success');
    },
    fail: (error) => {
      console.log(error);
    },
  });
}

async function setOnBoarded() {
  return await api.setStorage({
    data: { [AppConst.localStorage.onBoarded]: true },
    fail: (error) => {
      console.log(error);
    },
  });
}

export default {
  initZalo,
  getPhoneNumber,
  openChat,
  getAppData,
  setOnBoarded,
  clearAppData,
};
