import { BankIcon, CashIcon } from '@/configs/assets';
import { formatter } from '@/utils';
import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface Props {
  withdrawDetail: any;
}
const ReceiverInfo: React.FC<Props> = ({ withdrawDetail }) => {
  return (
    <ListGroup variant="flush" className="m-0">
      <ListGroup.Item className="d-flex flex-row bg-transparent">
        <BankIcon className="me-3 flex-shrink-0" />
        <div>
          <InfoItem name={'Tên ngân hàng'} value={withdrawDetail.bank.name} />
          {withdrawDetail.branchName && (
            <InfoItem
              name={'Tên chi nhánh ngân hàng'}
              value={withdrawDetail.branchName}
            />
          )}
          <InfoItem name={'Số tài khoản'} value={withdrawDetail.cardNumber} />
          <InfoItem
            name={'Tên chủ tài khoản'}
            value={withdrawDetail.cardHolderName}
          />
        </div>
      </ListGroup.Item>
      <ListGroup.Item className="d-flex flex-row bg-transparent">
        <CashIcon className="me-3 flex-shrink-0" />
        <div>
          <InfoItem
            name={'Số tiền giao dịch'}
            value={formatter.currency(withdrawDetail.cash)}
            extra={formatter.cashToWords(withdrawDetail.cash)}
          />
          <InfoItem
            name={'Phí rút tiền'}
            value={formatter.currency(withdrawDetail?.bankFee || 0)}
          />
          <InfoItem
            name={'Tiền nhận được'}
            value={formatter.currency(
              withdrawDetail.cash - (withdrawDetail?.bankFee || 0),
            )}
            extra={formatter.cashToWords(
              withdrawDetail.cash - (withdrawDetail?.bankFee || 0),
            )}
          />
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};
export default ReceiverInfo;

const InfoItem = ({ name, value, extra = '', copyable = false }) => {
  return (
    <div className="mb-3">
      <p className="fs-7 mb-1">{name}</p>
      <div className="d-flex flex-row align-items-center">
        <h6 className="fw-bold">{value}</h6>
      </div>
      {extra && <i className="mt-1 fs-8 uppercase-first-letter">{extra}</i>}
    </div>
  );
};
