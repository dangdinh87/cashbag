import AppButton from '@/components/app/app-button';
import AppPage from '@/components/app/app-page';
import {
  ArrowRightIcon,
  BankNumberTwoTone,
  BankTwoTone,
  UserTwoTone,
} from '@/configs/assets';
import { Bank, BankCard, Branch, RootState } from '@/interface';
import { useEffect, useState } from 'react';
import { FormControl, ListGroup, Modal } from 'react-bootstrap';
import { BankState, IMainState, useDispatch, useSelector } from 'umi';
import SelectBank from './select-bank';
import SelectBranchPopup from './select-branch';

type Props = {
  visible: boolean;
  isEdit: boolean;
  onClose: () => void;
  onCreateBankCard: (data: any) => void;
  onDeleteBankCard: (cardId: string) => void;
  onUpdateBankCard: (data: any, cardId: string) => void;
  currentBankCard: BankCard;
};

const BankCardManagement = ({
  visible,
  isEdit,
  onClose,
  onCreateBankCard,
  onUpdateBankCard,
  onDeleteBankCard,
  currentBankCard,
}: Props) => {
  const [visibleSelectBank, setVisibleSelectBank] = useState(false);
  const [visibleSelectBranch, setVisibleSelectBranch] = useState(false);
  const [value, setValue] = useState<{
    cardHolderName?: string;
    cardNumber?: string;
    currentBank?: Bank;
    currentBranch?: any;
  }>({});
  const {
    loading,
    bankModel,
    mainState: { appData },
  }: {
    loading: any;
    bankModel: BankState;
    mainState: IMainState;
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const setValueForm = (key, value) => {
    setValue((v) => {
      return {
        ...v,
        [key]: value,
      };
    });
  };

  const clearDataForm = () => {
    setValue({});
    dispatch({
      type: 'bankModel/updateState',
      payload: {
        currentBankCard: {},
      },
    });
  };

  const handleCreateBankCard = () => {
    const data = {
      bank: value?.currentBank?._id,
      cardHolderName: value.cardHolderName,
      cardNumber: value.cardNumber,
      ...(value?.currentBank.isBranchRequired &&
        value?.currentBranch._id && { branch: value?.currentBranch._id }),
    };

    onCreateBankCard?.(data);
    onClose?.();
    clearDataForm();
  };

  const handleUpdateBankCard = () => {
    const cardId = currentBankCard._id;
    const data = {
      bank: value?.currentBank?._id,
      cardHolderName: value.cardHolderName,
      cardNumber: value.cardNumber,
      ...(value?.currentBank.isBranchRequired &&
        value?.currentBranch._id && { branch: value?.currentBranch._id }),
    };

    onUpdateBankCard?.(data, cardId);
    onClose?.();
    clearDataForm();
  };

  const handleDeleteBankCard = (id) => {
    onDeleteBankCard(id);
    onClose?.();
    clearDataForm();
  };

  const handleSelectBranch = (branch) => {
    setValueForm('currentBranch', branch);
    setVisibleSelectBranch(false);
  };

  const handleSelectBank = (bank) => {
    setValueForm('currentBank', bank);
    setVisibleSelectBank(false);
  };

  useEffect(() => {
    if (isEdit || currentBankCard) {
      setValue({
        cardHolderName: currentBankCard.cardHolderName,
        cardNumber: currentBankCard.cardNumber,
        currentBank: currentBankCard.bank,
        currentBranch: {
          _id: currentBankCard.branch,
          name: currentBankCard.branchName,
          bank: currentBankCard._id,
        },
      });
    }
  }, [isEdit, currentBankCard]);
  return (
    <Modal fullscreen show={visible} animation={false}>
      <AppPage
        title={
          isEdit ? 'Chỉnh sửa thông tin ngân hàng' : 'Nhập tài khoản ngân hàng'
        }
        toolbarProps={{
          onBack: () => {
            clearDataForm?.();
            onClose();
          },
        }}
        className="p-3"
      >
        <ListGroup>
          <ListGroup.Item
            action
            className="d-flex flex-row p-3 align-items-center"
            onClick={() => setVisibleSelectBank(true)}
          >
            <BankTwoTone className="flex-shrink-0 me-3" />
            {!isEdit ? (
              <div className="w-100">
                <p className="w-100 fs-7">Chọn ngân hàng</p>
                {value.currentBank ? (
                  <p className="fs-7 fw-bold text-primary">
                    {value.currentBank?.shortName}
                  </p>
                ) : (
                  <p className="fs-7 fw-bold text-gray-300 my-1">
                    Chọn tài khoản
                  </p>
                )}
              </div>
            ) : (
              <div className="w-100">
                <p className="fs-7">Chọn ngân hàng</p>
                <p className="fs-7 fw-bold text-primary">
                  {value.currentBank?.shortName}
                </p>
              </div>
            )}
            <ArrowRightIcon
              width={24}
              height={24}
              className="align-self-right text-dark"
            />
          </ListGroup.Item>
          <SelectBank
            visible={visibleSelectBank}
            onClose={() => setVisibleSelectBank(false)}
            onSelectBank={handleSelectBank}
            currentBank={value.currentBank}
          />
          {value.currentBank?.isBranchRequired && (
            <>
              <ListGroup.Item
                action
                className="d-flex flex-row p-3 align-items-center"
                onClick={() => setVisibleSelectBranch(true)}
              >
                <BankTwoTone className="flex-shrink-0 me-3" />
                {!isEdit ? (
                  <div
                    className="w-100"
                    onClick={() => setVisibleSelectBranch(true)}
                  >
                    <p className="w-100 fs-7">Chọn chi nhánh</p>
                    {value.currentBranch ? (
                      <p className="fs-7 fw-bold text-primary my-1">
                        {value.currentBranch.name}
                      </p>
                    ) : (
                      <p className="fs-7 fw-bold text-gray-300 my-1">Chưa có</p>
                    )}
                  </div>
                ) : (
                  <div className="w-100">
                    <p className="fs-7">Chọn ngân hàng</p>
                    <p className="fs-7 fw-bold text-primary">
                      {value.currentBranch?.name}
                    </p>
                  </div>
                )}
                <ArrowRightIcon
                  width={24}
                  height={24}
                  className="align-self-right text-dark"
                />
              </ListGroup.Item>
              <SelectBranchPopup
                visible={visibleSelectBranch}
                onClose={() => setVisibleSelectBranch(false)}
                cities={appData.cities}
                currentBank={value.currentBank}
                onSelectBranch={handleSelectBranch}
              />
            </>
          )}
          <ListGroup.Item className="d-flex flex-row p-3 align-items-center">
            <BankNumberTwoTone className="flex-shrink-0 me-3" />
            <div className="w-100">
              <p className="fs-7">Số tài khoản</p>
              <FormControl
                className="bg-transparent border-0 fw-bolder fs-7 p-0 rounded-0 text-primary my-1"
                placeholder="Vui lòng nhập số tài khoản"
                onChange={(e) => setValueForm('cardNumber', e.target.value)}
                value={value['cardNumber']}
              />
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex flex-row p-3 align-items-center">
            <UserTwoTone className="flex-shrink-0 me-3" />
            <div className="w-100">
              <p className="fs-7">Tên chủ tài khoản</p>
              <FormControl
                className="bg-transparent border-0 fw-bolder fs-7 p-0 rounded-0 text-primary my-1"
                placeholder="Vui lòng nhập tên chủ tài khoản"
                onChange={(e) => setValueForm('cardHolderName', e.target.value)}
                value={value['cardHolderName']}
              />
            </div>
          </ListGroup.Item>
        </ListGroup>
        {isEdit ? (
          <div className="w-100 fixed-bottom rounded-0 d-flex flex-column p-3">
            <AppButton
              onClick={handleUpdateBankCard}
              className="p-2  mb-2 fs-7"
              disabled={
                !value.currentBank ||
                !value?.cardNumber ||
                !value?.cardHolderName
              }
            >
              Cập nhật
            </AppButton>
            <AppButton
              onClick={() => handleDeleteBankCard(currentBankCard._id)}
              className="p-2 fs-7"
              variant="outline-danger"
            >
              Xóa tài khoản ngân hang{' '}
            </AppButton>
          </div>
        ) : (
          <AppButton
            className="w-100 fixed-bottom rounded-0"
            disabled={
              !value.currentBank || !value?.cardNumber || !value?.cardHolderName
            }
            onClick={handleCreateBankCard}
          >
            Lưu và tiếp tục
          </AppButton>
        )}
      </AppPage>
    </Modal>
  );
};

export default BankCardManagement;
