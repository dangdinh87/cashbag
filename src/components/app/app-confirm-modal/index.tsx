import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import { CloseIcon, SuccessIcon } from '@/configs/assets';
import { helper } from '@/utils';

import AppButton from '../app-button';
import styles from './styles.scss';
import AppVerticalDivider from '../app-devider';

export enum ConfirmModalTypes {
  success,
  error,
  warning,
  image,
}

export interface ConfirmModalOptions {
  image?: React.ReactNode;
  title?: any | React.ReactNode;
  content: string | React.ReactNode;
  okLabel?: string;
  cancelLabel?: string;
  hideCancel?: boolean;
  showCloseIcon?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  onDestroy?: () => void;
  size?: string;
  className?: string;
  show: boolean;
  type?: string;
}

const AppConfirmModal = (props: ConfirmModalOptions) => {
  const {
    image,
    title,
    content,
    okLabel = 'Tiếp tục',
    cancelLabel = 'Quay lại',
    onConfirm,
    onClose,
    hideCancel,
    showCloseIcon = true,
    size,
    className,
    show,
    type,
  } = props;
  const [visible, setVisible] = useState(() => show);
  const renderIcon = () => {
    return <SuccessIcon />;
  };

  const handleConfirm = () => {
    onConfirm?.();
    setVisible(false);
  };
  const handleClose = () => {
    onClose?.();
    setVisible(false);
  };

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const sizeStyle =
    size === 'large' ? styles.confirmDialogLarge : styles.confirmDialog;

  return (
    <Modal
      onClose={handleClose}
      show={visible}
      contentClassName="overflow-hidden rounded-1"
      dialogClassName={classNames(
        helper.isZalo()
          ? styles.zaloConfirmDialog
          : image || type === ConfirmModalTypes.image
          ? styles.confirmDialogImage
          : sizeStyle,
        isMobile ? styles.mobile : styles.desktop,
        className,
      )}
      backdropClassName={styles.confirmModalBackdrop}
      centered={isMobile}
    >
      {showCloseIcon && (
        <div className="text-end pt-2">
          <AppButton
            className="p-0 bg-transparent border-0"
            onClick={handleClose}
          >
            <CloseIcon />
          </AppButton>
        </div>
      )}
      <div className="shareable-campaign my-4 mx-3 text-center">
        <div className="mb-4">{image || renderIcon()}</div>
        <h3 className="mb-1 mx-3">{title}</h3>
        <div className="fw-normal">{content}</div>
      </div>
      <div className="d-flex flex-row w-100">
        {!hideCancel && (
          <>
            <Button
              size="lg"
              className="w-100 rounded-0 border-0 white-space-preline fw-bolder"
              onClick={handleClose}
            >
              {cancelLabel}
            </Button>
            <AppVerticalDivider color="white" />
          </>
        )}
        <Button
          size="lg"
          className="w-100 rounded-0 border-0 white-space-preline fw-bolder"
          onClick={handleConfirm}
        >
          {okLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default AppConfirmModal;
