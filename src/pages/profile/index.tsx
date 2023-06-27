import AppButton from '@/components/app/app-button';
import AppImage from '@/components/app/app-image';
import AppPage from '@/components/app/app-page';
import { HandIcon, WalletIcon } from '@/configs/assets';
import { formatter, navigator } from '@/utils';
import { useContextRequestPhone } from '@/wrappers/request-phone';
import { useEffect, useMemo, useState } from 'react';
import { ListGroup, Ratio } from 'react-bootstrap';
import {
  Dispatch,
  IMainState,
  UserState,
  history,
  useDispatch,
  useSelector,
} from 'umi';
import ModalConditionWithdraw from './components/modal-condition';
import classNames from 'classnames';

function UserPage() {
  const dispatch: Dispatch = useDispatch();
  const { user } = useSelector(
    (state: { userState: UserState }) => state.userState,
  );

  const { appData } = useSelector(
    (state: { mainState: IMainState }) => state.mainState,
  );

  const { handleRequestPhone } = useContextRequestPhone();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'userState/getUserDetail',
    });
  }, []);

  if (!user) return <></>;

  const { statistic } = user;

  const infos = [
    {
      icon: <WalletIcon />,
      name: 'Số dư trong túi',
      value: user.statistic.remainingCash,
    },
    {
      icon: <HandIcon />,
      name: 'Hoàn tiền chờ duyệt',
      value: user.statistic.pendingCommission,
    },
  ];

  const conditionWithdrawList = useMemo<any>(
    () => [
      {
        valid: statistic.remainingCash >= appData.withdrawCash.minWithdrawValue,
        content: `Có số dư tài khoản trên ${formatter.currency(
          appData.withdrawCash.minWithdrawValue,
        )}`,
      },
      {
        valid:
          statistic.successExpense >=
          appData.withdrawCash.minWithdrawSuccessExpense,
        content: `Có tổng chi tiêu trên ${formatter.currency(
          appData.withdrawCash.minWithdrawSuccessExpense,
        )}`,
      },
      {
        valid: !!user.phone?.verified,
        content: 'Xác nhận số điện thoại',
        onClick: () => handleRequestPhone(null, true),
      },
      {
        valid: true,
        content: 'Tạo tài khoản Cashbag',
      },
    ],
    [user],
  );

  const sortedConditionWithdrawList = useMemo(() => {
    const sortedArray = [...conditionWithdrawList];
    sortedArray.sort((a, b) => (a.valid === b.valid ? 0 : a.valid ? 1 : -1));
    return sortedArray;
  }, [conditionWithdrawList]);

  const handleRequestWithdraw = () => {
    navigator.pushPath('/withdraw');
  };

  const validWithdraw =
    statistic.remainingCash >= appData.withdrawCash.minWithdrawValue &&
    statistic.successExpense >=
      appData.withdrawCash.minWithdrawSuccessExpense &&
    !!user.phone?.full;

  const handleShowConditionWithdraw = () => {
    setModal(true);
  };

  return (
    <AppPage title="Tài khoản" toolbarProps={{ hideBack: true }}>
      <ListGroup className="mt-3 mx-3 bg-transparent">
        <ListGroup.Item>
          <div
            className={`media d-flex flex-row align-items-center`}
            style={{ cursor: 'pointer' }}
          >
            <Ratio
              style={{ width: 48, height: 48 }}
              className="mr-2 bg-white rounded-circle overflow-hidden"
            >
              <AppImage
                className="object-fit-cover w-100 h-100"
                roundedCircle
                src={user.avatar}
              />
            </Ratio>
            <div className="media-body px-2">
              <h5 className="mb-0 fw-bold">{user.name}</h5>
            </div>
          </div>{' '}
        </ListGroup.Item>
        {infos.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex flex-row align-items-center"
            action
          >
            {item.icon}
            <div className="flex-fill ms-3">
              <p className="fs-7 fw-bold">{item.name}</p>
              <p className="fs-7 text-primary fw-bold">
                {formatter.currency(item.value)}
              </p>
            </div>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="p-0">
          {!validWithdraw && (
            <p
              className="mx-3 my-1c fs-7 fw-bold text-primary"
              onClick={handleShowConditionWithdraw}
            >
              Bạn chưa đủ điều kiện rút tiền
            </p>
          )}

          <AppButton
            showNext
            className={classNames('w-100 rounded-0 rounded-bottom', {
              'bg-muted border-muted': !validWithdraw,
            })}
            // disabled={!validWithdraw}
            onClick={() =>
              !validWithdraw
                ? handleShowConditionWithdraw()
                : handleRequestWithdraw()
            }
          >
            <b>Rút tiền</b>
          </AppButton>
        </ListGroup.Item>
      </ListGroup>
      <ModalConditionWithdraw
        list={sortedConditionWithdrawList}
        visible={modal}
        onClose={() => setModal(false)}
      />
    </AppPage>
  );
}

export default UserPage;
