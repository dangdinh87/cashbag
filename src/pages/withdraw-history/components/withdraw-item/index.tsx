import React from 'react';
import { Col, Ratio, Row } from 'react-bootstrap';

import AppImage from '@/components/app/app-image';
import { ArrowRightIcon } from '@/configs/assets';
import { formatter, helper } from '@/utils';

interface Props {
  withdrawHistory: IWithdraw;
}
const MobileView: React.FC<Props> = ({ withdrawHistory }) => {
  const renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return <p className="fw-bold fs-8 text-warning">Rút tiền chờ duyệt</p>;
      case 'approved':
        return <p className="fw-bold fs-8 text-green">Rút tiền thành công</p>;
      case 'rejected':
        return (
          <p className="fw-bold fs-8 text-danger">Rút tiền không thành công</p>
        );
    }
  };
  return (
    <Row>
      <Col xs="auto">
        <Ratio
          style={{ width: 64, height: 64 }}
          aspectRatio="1x1"
          className="rounded overflow-hidden border border-light"
        >
          <AppImage
            className="object-fit-contain w-100 h-100"
            src={helper.getPhotoURL(withdrawHistory.bank.logo)}
          />
        </Ratio>
      </Col>
      <Col>
        <p className="fs-7 fw-bold">
          -{formatter.currency(withdrawHistory.cash)}
        </p>
        <p className="fs-8 fw-normal">
          {formatter.dateTime(withdrawHistory.createdAt)}
        </p>
        {renderStatus(withdrawHistory.status)}
      </Col>
      <Col xs="auto" className="align-self-center">
        <ArrowRightIcon />
      </Col>
    </Row>
  );
};
export default MobileView;
