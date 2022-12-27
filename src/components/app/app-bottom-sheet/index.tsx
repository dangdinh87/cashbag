import classNames from 'classnames';
import React from 'react';
import { Offcanvas } from 'react-bootstrap';

import { CancelIcon } from '@/configs/assets';

import styles from './styles.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  closeBtn?: boolean;
  bodyClass?: string;
  headerClass?: string;
}
const AppBottomSheet: React.FC<Props> = (props) => {
  const {
    visible,
    onClose,
    title,
    children,
    closeBtn,
    bodyClass,
    headerClass,
  } = props;
  return (
    <Offcanvas
      className={classNames('rounded-top-3', styles.bottomSheet)}
      scroll
      backdropClassName="offcanvas-backdrop"
      placement="bottom"
      show={visible}
      onHide={onClose}
    >
      {(title || closeBtn) && (
        <Offcanvas.Header className={classNames('px-3 py-2c', headerClass)}>
          <Offcanvas.Title className="fs-5 w-100 d-flex flex-row justify-content-between align-items-center">
            {title}
            <div />
            {closeBtn && <CancelIcon onClick={onClose} />}
          </Offcanvas.Title>
        </Offcanvas.Header>
      )}
      <Offcanvas.Body className={classNames('hide-scrollbar', bodyClass)}>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default AppBottomSheet;
