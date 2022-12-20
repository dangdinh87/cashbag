import classNames from 'classnames';
import React from 'react';
import type { ButtonProps } from 'react-bootstrap';
import { Button, Row, Spinner } from 'react-bootstrap';

import { ArrowRightIcon } from '@/configs/assets';

interface Props extends ButtonProps {
  icon?: React.ReactNode;
  showNext?: boolean;
  loading?: boolean;
  nextColor?: string;
  nextClassName?: string;
  defaultStyle?: boolean;
  onClick?: (e) => void;
}
const AppButton: React.FC<Props> = (props) => {
  const {
    icon,
    showNext = false,
    children,
    size = 'lg',
    loading,
    nextColor = 'white',
    nextClassName = 'position-absolute',
    defaultStyle = true,
  } = props;
  const buttonProps = Object.assign({}, props);
  // To remove unknown property warning
  delete buttonProps.icon;
  delete buttonProps.showNext;
  delete buttonProps.loading;
  delete buttonProps.nextColor;
  delete buttonProps.nextClassName;

  return (
    <Button
      {...buttonProps}
      disabled={loading || buttonProps.disabled}
      className={classNames(buttonProps.className, {
        'fw-bold px-3': defaultStyle,
      })}
      size={size}
    >
      <Row className="position-relative g-0 row-cols-auto align-items-center justify-content-center w-100 flex-nowrap">
        {loading && (
          <Spinner
            size="sm"
            role="status"
            className="position-absolute start-0"
            variant="white"
            animation="border"
          />
        )}
        <div>
          {icon && <span className="me-3">{icon}</span>}
          {children}
        </div>
        {showNext && (
          <ArrowRightIcon
            className={classNames('end-0', nextClassName)}
            stroke={nextColor}
          />
        )}
      </Row>
    </Button>
  );
};
export default AppButton;
