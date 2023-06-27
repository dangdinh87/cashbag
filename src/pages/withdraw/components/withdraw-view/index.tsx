import AppButton from '@/components/app/app-button';
import AppNumberInput from '@/components/app/number-input';
import { ArrowRightIcon, BankTwoTone, WalletTwoTone } from '@/configs/assets';
import { AppData, BankCard, User } from '@/interface';
import { formatter, helper, navigator } from '@/utils';
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'umi';
import ConfirmWithdrawPage from '../confirm-withdraw';

interface Props {
  appData: AppData;
  user: User;
  currentBankCard: BankCard;
  onWithdrawSuccess: (requestId: string) => void;
}
const WithdrawView: React.FC<Props> = ({
  appData,
  user,
  currentBankCard,
  onWithdrawSuccess,
}) => {
  const [cashValue, setCashValue] = useState(0);
  const [confirmWithdrawVisible, setConfirmWithdrawVisible] = useState(false);
  const dispatch = useDispatch();
  const { withdrawCash } = appData;
  const handleSelectBankAccount = () => {
    navigator.pushPath('/bank');
  };

  const handleConfirmWithdraw = () => {
    const data = {
      ...currentBankCard,
      bank: currentBankCard.bank._id,
      cash: cashValue,
      via: 'bank',
    };
    dispatch({
      type: 'withdrawModel/createRequestWithdraw',
      payload: { data },
      callback: (requestId) => {
        setConfirmWithdrawVisible(false);
        onWithdrawSuccess(requestId);
      },
    });
  };
  const getDayFromSecond = (value) => {
    if (!value) return 0;
    return Math.ceil(value / (24 * 60 * 60));
  };

  const openConfirmWithdrawSidebar = () => {
    setConfirmWithdrawVisible(true);
  };

  return (
    <>
      {!!currentBankCard && !!cashValue && !!user && (
        <ConfirmWithdrawPage
          visible={confirmWithdrawVisible}
          selectedCard={currentBankCard}
          user={user}
          withdrawConfig={appData?.withdrawCash}
          totalWithdraw={cashValue}
          onConfirm={handleConfirmWithdraw}
          onClose={() => setConfirmWithdrawVisible(false)}
        />
      )}
      <div className="rounded-top-3 d-flex flex-column justify-content-center">
        <ListGroup>
          <ListGroup.Item className="d-flex flex-row p-3 align-items-center">
            <WalletTwoTone />
            <div className="ms-3">
              <p className="fs-7">Số dư có thể rút</p>
              <p className="fw-bold text-primary">
                {formatter.currency(user.statistic.remainingCash)}
              </p>
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            action
            className="d-flex flex-row p-3 align-items-center"
            onClick={handleSelectBankAccount}
          >
            <BankTwoTone className="flex-shrink-0 me-3" />
            {!currentBankCard ? (
              <p className="w-100 fs-7">Chọn tài khoản</p>
            ) : (
              <div className="w-100">
                <p className="fs-7">{currentBankCard.bank.name}</p>
                <p className="fs-7 fw-bold text-primary">
                  STK {helper.hideNumber(currentBankCard.cardNumber)}
                </p>
              </div>
            )}
            <ArrowRightIcon className="align-self-right text-dark" />
          </ListGroup.Item>
        </ListGroup>
        <div className="rounded px-3 py-2 mt-2 bg-white">
          <div className="d-flex flex-row justify-content-between align-items-center mb-2">
            <p className="fs-7">Nhập số tiền cần rút</p>
            <p className="text-muted fs-8">
              Tối thiểu {formatter.currency(withdrawCash?.minWithdrawValue)}
            </p>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <AppNumberInput
              value={cashValue}
              className="bg-transparent border-0 fw-bolder fs-4 p-0 rounded-0 text-primary"
              placeholder="0"
              onChange={(value) => setCashValue(value)}
            />

            <h4 className="ms-2">VND</h4>
          </div>
        </div>
        <div className="mx-4">
          <p className="fs-8 text-center mt-2">
            Bạn sẽ nhận được tiền sau tối đa{' '}
            {getDayFromSecond(appData.withdrawCash.maxTimeReceivedCash)} ngày
          </p>
        </div>
      </div>

      <AppButton
        className="w-100 fixed-bottom rounded-0"
        showNext
        disabled={
          !cashValue ||
          cashValue > user.statistic.remainingCash ||
          cashValue < (withdrawCash?.minWithdrawValue || 0) ||
          !currentBankCard
        }
        onClick={openConfirmWithdrawSidebar}
      >
        Rút tiền
      </AppButton>
    </>
  );
};
export default WithdrawView;
