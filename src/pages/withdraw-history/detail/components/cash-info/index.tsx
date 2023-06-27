import { formatter, helper } from '@/utils';
import React from 'react';
import { useIntl } from 'umi';

interface Props {
  withdrawDetail: IWithdraw;
}
const CashInfo: React.FC<Props> = ({ withdrawDetail }) => {
  const { formatMessage } = useIntl();
  const renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return <p className="fw-bold fs-7 text-warning">Rút tiền chờ duyệt</p>;
      case 'approved':
        return <p className="fw-bold fs-7 text-green">Rút tiền thành công</p>;
      case 'rejected':
        return (
          <p className="fw-bold fs-7 text-danger">Rút tiền không thành công</p>
        );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'processed':
        return 'dark';
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
    }
  };

  const cashInfo = [
    {
      name: 'Trạng thái',
      value: renderStatus(withdrawDetail.status),
      color: getStatusColor(withdrawDetail.status),
    },
    {
      name: 'Số tiền giao dịch',
      value: formatter.currency(withdrawDetail.cash),
      color: getStatusColor(withdrawDetail.status),
    },
    {
      name: 'Ngày tạo yêu cầu',
      value: formatter.dateTime(withdrawDetail.createdAt),
    },
    {
      name: 'Ngày gửi tiền dự kiến',
      value: formatter.dateTime(withdrawDetail.doneAt),
      hide: !withdrawDetail.doneAt,
    },
  ];

  return (
    <>
      {cashInfo.map(
        (item) =>
          !item.hide && (
            <div
              key={item.name}
              className="d-flex flex-row justify-content-between px-3 py-2c"
            >
              <p className="fs-7">{item.name}</p>
              <p
                className={helper.classNames(
                  'fs-7 fw-bold',
                  `text-${item.color}`,
                )}
              >
                {item.value}
              </p>
            </div>
          ),
      )}
    </>
  );
};
export default CashInfo;
