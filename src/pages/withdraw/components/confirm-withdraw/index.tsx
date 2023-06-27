import AppButton from '@/components/app/app-button';
import AppPage from '@/components/app/app-page';
import AppSpacer from '@/components/app/app-spacer';
import { Modal } from 'react-bootstrap';
import WithdrawInfo from '../withdraw-info';
import { BankCard, User } from '@/interface';
interface Props {
  visible: boolean;
  selectedCard: BankCard;
  user: User;
  withdrawConfig: any;
  totalWithdraw: number;
  onConfirm: () => void;
  onClose: () => void;
}
const ConfirmWithdrawPage = ({
  selectedCard,
  user,
  visible,
  totalWithdraw,
  withdrawConfig,
  onConfirm,
  onClose,
}: Props) => {
  return (
    <Modal
      fullscreen
      className="rounded-top-3 d-flex flex-column justify-content-center"
      show={visible}
      onClose={onClose}
      animation={false}
    >
      <AppPage title={'Xác nhận rút tiền'} toolbarProps={{ onBack: onClose }}>
        <WithdrawInfo
          selectedCard={selectedCard}
          withdrawConfig={withdrawConfig}
          totalWithdraw={totalWithdraw}
          user={user}
        />
        <AppSpacer size={65} />
        <AppButton
          variant="blue"
          className="text-white w-100 fixed-bottom rounded-0"
          showNext
          onClick={onConfirm}
        >
          Xác nhận
        </AppButton>
      </AppPage>
    </Modal>
  );
};
export default ConfirmWithdrawPage;
