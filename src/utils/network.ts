import { toast } from '@/components/app/toast/manager';
import { ActionSheet } from 'antd-mobile'


let countdown = 0;

const disconnected = () => {
  if (countdown) {
    return;
  }
  countdown = 1;
  setTimeout(() => {
    countdown = 0;
  }, 3000);

  toast.error('Vui lòng kiểm tra lại kết nối Internet của bạn');
};

/**
 * Check network is available
 */
const isOnline = (): boolean => window.navigator.onLine;

export default {
  isOnline,
  disconnected,
};
