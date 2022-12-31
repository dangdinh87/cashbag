import AppImage from '@/components/app/app-image';
import { AppConst } from '@/configs';
import { ArrowRightIcon } from '@/configs/assets';
import { formatter, helper } from '@/utils';
import { Ratio } from 'react-bootstrap';

function TransactionItem({ transaction, onClick }) {
  const { brand } = transaction;
  const getOrderStatus = (status) => {
    if (status)
      return `Đơn hàng ${AppConst.filterState.order[status].toLowerCase()}`;
  };
  const getCashBackStatus = (status, value) => {
    if (status === 'cashback') return `Hoàn tiền ${formatter.currency(value)}`;
    if (status)
      return `Hoàn tiền ${AppConst.filterState.cashback[status].toLowerCase()}`;
  };

  const getColorStatus = (status) => {
    if (status) return AppConst.colorState.cashback[status];
  };

  return (
    <div onClick={onClick}>
      <div className="d-flex align-items-center justify-content-between">
        <Ratio aspectRatio={'1x1'} style={{ width: 100 }}>
          <AppImage
            src={helper.getPhotoURL(brand.logo)}
            className="object-fit-contain w-100 p-1"
          />
        </Ratio>
        <div className="ms-2 fs-8">
          <p className="fw-bold text-dark">
            Giá trị: {formatter.currency(transaction.transactionValue)}
          </p>
          <p>{formatter.date(transaction.transactionTime)}</p>
          <p>{getOrderStatus(transaction.status)}</p>
          <p
            className="fw-bold"
            style={{
              color: getColorStatus(transaction.status),
            }}
          >
            {getCashBackStatus(transaction.status, transaction.commission)}
          </p>
        </div>
        <ArrowRightIcon className="ms-auto" />
      </div>
    </div>
  );
}

export default TransactionItem;
