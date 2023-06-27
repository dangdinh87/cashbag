import { AppConst } from '@/configs';
import { BankIcon, CashIcon } from '@/configs/assets';
import { BankCard, User } from '@/interface';
import { formatter, helper } from '@/utils';
import moment from 'moment';
import { ListGroup } from 'react-bootstrap';

const InfoItem = ({ name, value, extra = '' }) => {
  return (
    <div className="mb-3">
      <p className="fs-7 mb-1">{name}</p>
      <h6 className="fw-bold">{value}</h6>
      {extra && <i className="mt-1 fs-8 uppercase-first-letter">{extra}</i>}
    </div>
  );
};

interface Props {
  selectedCard: BankCard;
  withdrawConfig: any;
  totalWithdraw: number;
  user: User;
}
const WithdrawInfo: React.FC<Props> = ({
  selectedCard,
  totalWithdraw,
  withdrawConfig,
  user,
}) => {
  if (!selectedCard) return <></>;
  const cashInfo = [
    {
      name: 'Tổng số tiền',
      value: formatter.currency(user.statistic.remainingCash),
      color: 'blue',
    },
    {
      name: 'Số tiền còn lại sau khi rút',
      value: formatter.currency(user.statistic.remainingCash - totalWithdraw),
      color: 'blue',
    },
    {
      name: 'Ngày tạo yêu cầu',
      value: moment().format(AppConst.format.dateTime),
    },
  ];

  return (
    <>
      <ListGroup className="m-3">
        {cashInfo.map((item) => (
          <ListGroup.Item
            key={item.name}
            className="d-flex flex-row justify-content-between"
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
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h6 className="fw-bold mt-3 mx-3">Thông tin tài khoản nhận</h6>
      <ListGroup variant="flush" className="mt-2">
        <ListGroup.Item className="d-flex flex-row">
          <BankIcon className="me-3 flex-shrink-0" />
          <div>
            <InfoItem name={'Tên ngân hàng'} value={selectedCard.bank.name} />
            {selectedCard.branchName && (
              <InfoItem
                name={'Tên chi nhánh'}
                value={selectedCard.branchName}
              />
            )}
            <InfoItem name={'Số tài khoản'} value={selectedCard.cardNumber} />
            <InfoItem
              name={'Tên chủ tài khoản'}
              value={selectedCard.cardHolderName}
            />
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex flex-row">
          <CashIcon className="me-3 flex-shrink-0" />
          <div>
            <InfoItem
              name={'Số tiền giao dịch'}
              value={formatter.currency(totalWithdraw)}
              extra={formatter.cashToWords(totalWithdraw)}
            />
            <InfoItem
              name={'Phí rút tiền'}
              value={formatter.currency(withdrawConfig?.bankFee || 0)}
            />
            <InfoItem
              name={'Tiền nhận được'}
              value={formatter.currency(
                totalWithdraw - (withdrawConfig?.bankFee || 0),
              )}
              extra={formatter.cashToWords(
                totalWithdraw - (withdrawConfig?.bankFee || 0),
              )}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};
export default WithdrawInfo;
