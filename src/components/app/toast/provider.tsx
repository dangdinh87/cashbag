import React, { useCallback, useState } from 'react';
import { ToastContainer } from 'react-bootstrap';

import { AppConst } from '@/configs';

import AppToast from './';

export const ToastContext = React.createContext<any>(null);

const ToastProvider = ({ children }: any) => {
  const [toasts, setToasts] = useState<any>([]);

  const success = (content, delay?) => {
    setToasts([
      ...toasts,
      { type: AppConst.ToastTypes.success, content, delay },
    ]);
  };

  const warning = (content, delay?) => {
    setToasts([
      ...toasts,
      { type: AppConst.ToastTypes.warning, content, delay },
    ]);
  };

  const error = (content, delay?) => {
    setToasts([...toasts, { type: AppConst.ToastTypes.error, content, delay }]);
  };

  const remove = useCallback(() => {
    setToasts(null);
  }, [setToasts]);

  return (
    <ToastContext.Provider value={{ success, warning, error, remove }}>
      <ToastContainer
        position={'bottom-center'}
        className="position-fixed my-5 py-3"
        style={{ zIndex: 10000 }}
      >
        {toasts.length > 0 &&
          toasts.map((toast, index) => <AppToast key={index} toast={toast} />)}
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
