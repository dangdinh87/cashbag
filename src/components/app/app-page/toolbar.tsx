import classNames from 'classnames';
import React from 'react';
import { Button, Navbar } from 'react-bootstrap';

import { ArrowLeftIcon } from '@/configs/assets';
import { navigator } from '@/utils';

import AppSpacer from '../app-spacer';

export interface MobileToolbarProps {
  title?: string | React.ReactNode;
  extraContent?: React.ReactNode;
  defaultAction?: React.ReactNode;
  onBack?: () => void;
  hideBack?: boolean;
  className?: string;
}
const MobileToolbar: React.FC<MobileToolbarProps> = ({
  title,
  hideBack,
  extraContent,
  className,
  defaultAction,
  onBack,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigator.goBack();
  };
  return (
    <>
      <AppSpacer size={50} />
      <Navbar
        style={{ height: 50, zIndex: 1000 }}
        className={classNames(
          'px-3 py-2 w-100 border-bottom',

          className,
        )}
        fixed="top"
        bg="white"
        variant="dark"
      >
        {!hideBack && (
          <Button
            className="ps-0 text-dark"
            variant="white"
            onClick={handleBack}
          >
            <ArrowLeftIcon />
          </Button>
        )}
        {title && (
          <h5 className="fw-bold m-0 w-100 text-truncate">
            <small>{title}</small>
          </h5>
        )}
        {extraContent}
        {defaultAction}
      </Navbar>
    </>
  );
};
export default MobileToolbar;
