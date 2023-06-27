import './style.scss';

import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

// import { ErrorIcon, SuccessIcon } from '@/configs/assets';

import { ToastContext } from './provider';

export enum ToastTypes {
  success,
  error,
  warning,
}

export interface ToastOptions {
  title?: string;
  content: string;
  duration?: number;
  onClose?: () => void;
}

export function useToast() {
  const toastHelpers = React.useContext(ToastContext);
  return toastHelpers;
}

const AppToast = (props: any) => {
  const { title, content, duration, type, onClose } = props;
  const [show, setShow] = useState(true);
  const renderIcon = () => {
    // switch (type) {
    //   case ToastTypes.error:
    //     return <ErrorIcon />;
    //   case ToastTypes.warning:
    //     return <ErrorIcon />;
    //   default:
    //     return <SuccessIcon />;
    // }
  };

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const renderDefaultMessage = () => {
    switch (type) {
      case ToastTypes.error:
        return 'Có lỗi xảy ra';
      case ToastTypes.warning:
        return '';
      default:
        return 'Thành công';
    }
  };

  return (
    <Toast
      className="mb-2"
      style={{ maxWidth: 1120 }}
      onClose={handleClose}
      show={show}
      delay={duration || 3000}
      autohide
      animation={true}
    >
      <Toast.Body>
        {/* {renderIcon()} */}
        <span className="fw-bold">{content || renderDefaultMessage()}</span>
      </Toast.Body>
    </Toast>
  );
};

export default AppToast;
