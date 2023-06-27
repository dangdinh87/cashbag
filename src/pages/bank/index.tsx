import { useEffect, useState } from 'react';
import { Form, ListGroup, Ratio } from 'react-bootstrap';
import { BankState, useDispatch, useSelector } from 'umi';

import AppButton from '@/components/app/app-button';
import AppImage from '@/components/app/app-image';
import AppPage from '@/components/app/app-page';
import CommonEmpty from '@/components/empty/common-empty';
import { BankTwoTone } from '@/configs/assets';
import { BankCard } from '@/interface';
import { helper, navigator } from '@/utils';
import { WithdrawState } from '../withdraw/model';
import BankCardManagement from './components/manage-bank-card';

const BankPage = () => {
  const [visibleSetupCard, setVisibleSetupCard] = useState(false);
  const dispatch = useDispatch();
  const { cards, currentBankCard } = useSelector(
    (state: { bankModel: BankState }) => state.bankModel,
  );
  const { bankCardSelectedWithdraw } = useSelector(
    (state: { withdrawModel: WithdrawState }) => state.withdrawModel,
  );

  const getBankCards = () => {
    dispatch({
      type: 'bankModel/getUserBankList',
    });
  };

  useEffect(() => {
    getBankCards();
  }, []);

  const handleSelectCard = (card: BankCard) => {
    dispatch({
      type: 'withdrawModel/updateState',
      payload: {
        bankCardSelectedWithdraw: card,
      },
    });

    navigator.goBack();
  };

  const handleCrateNewBankCard = () => {
    setVisibleSetupCard(true);
  };

  const onCreateBankCard = (data) => {
    dispatch({
      type: 'bankModel/createBankCards',
      payload: {
        data,
      },
      callback: getBankCards,
    });
  };

  const onUpdateBankCard = (data, cardId) => {
    dispatch({
      type: 'bankModel/updateBankCards',
      payload: {
        data,
        cardId,
      },
      callback: getBankCards,
    });
  };

  const onDeleteBankCard = (cardId) => {
    dispatch({
      type: 'bankModel/deleteBankCards',
      payload: {
        cardId,
      },
      callback: getBankCards,
    });
  };

  const editBank = (bank: BankCard, e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({
      type: 'bankModel/updateState',
      payload: {
        currentBankCard: bank,
      },
    });
    setVisibleSetupCard(true);
  };

  return (
    <AppPage
      title={'Chọn tài khoản ngân hàng'}
      className="bg-white pb-5"
      style={{
        minHeight: 'calc(100vh - 50px)',
      }}
    >
      <ListGroup className="rounded-0">
        {cards?.length > 0 ? (
          cards.map((item) => (
            <ListGroup.Item key={item._id} className="px-1 py-0" action>
              <Form.Check
                name="userBankCard"
                type="radio"
                className="d-flex flex-row ps-0"
                id={item._id}
              >
                <Form.Check.Input
                  className="mx-2 my-auto flex-shrink-0"
                  type="radio"
                  onClick={() => handleSelectCard(item)}
                  checked={bankCardSelectedWithdraw?._id === item._id}
                />
                <Form.Check.Label className="d-flex flex-row align-items-center px-1 py-3c w-100">
                  <Ratio
                    className="flex-shrink-0 rounded border border-light overflow-hidden"
                    aspectRatio="1x1"
                    style={{ width: 64 }}
                  >
                    <AppImage
                      className="object-fit-contain w-100 h-100 "
                      src={helper.getPhotoURL(item.bank.logo)}
                    />
                  </Ratio>
                  <div className="px-2c w-100 h-100 d-flex flex-column justify-content-center">
                    <p className="fs-8 fw-bold ">{item.bank.name}</p>
                    <p className="fs-8 ">{item.branchName}</p>
                    <p className="fs-8">STK {item.cardNumber}</p>
                  </div>
                  <p
                    className="text-blue fw-bold fs-7"
                    onClick={(e) => editBank(item, e)}
                  >
                    Sửa
                  </p>
                </Form.Check.Label>
              </Form.Check>
            </ListGroup.Item>
          ))
        ) : (
          <CommonEmpty
            className="text-gray h-100 pt-0 mt-5"
            icon={<BankTwoTone />}
            title="Bạn chưa thêm tài khoản ngân hàng nào"
          />
        )}
      </ListGroup>
      <BankCardManagement
        visible={visibleSetupCard}
        onClose={() => setVisibleSetupCard(false)}
        isEdit={!!currentBankCard?._id}
        onCreateBankCard={onCreateBankCard}
        onUpdateBankCard={onUpdateBankCard}
        onDeleteBankCard={onDeleteBankCard}
        currentBankCard={currentBankCard}
      />
      <AppButton
        className="w-100 fixed-bottom rounded-0"
        showNext
        onClick={handleCrateNewBankCard}
      >
        Thêm tài khoản ngân hàng
      </AppButton>
    </AppPage>
  );
};
export default BankPage;
