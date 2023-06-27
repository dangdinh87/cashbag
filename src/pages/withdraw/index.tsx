import { Button } from 'react-bootstrap';
import { Link, useSelector } from 'umi';

import { navigator } from '@/utils';
import AppPage from '@/components/app/app-page';
import { RootState } from '@/interface';
import WithdrawView from './components/withdraw-view';

const WithDrawPage = () => {
  const { bankCardSelectedWithdraw, user, appData } = useSelector(
    (state: RootState) => ({
      bankCardSelectedWithdraw: state.withdrawModel.bankCardSelectedWithdraw,
      user: state.userState.user,
      appData: state.mainState.appData,
    }),
  );

  if (!user) {
    navigator.pushPath('/user');
    return <></>;
  }

  const handleWithdrawSuccess = (requestId: string) => {
    navigator.replacePath(`/withdraw-history/${requestId}`);
  };

  return (
    <AppPage
      title="Thực hiện rút tiền"
      className="p-3"
      toolbarProps={{
        extraContent: (
          <Link
            to={{
              pathname: '/withdraw-history',
              state: navigator.defaultState,
            }}
          >
            <Button variant="link" className="p-0 fs-7">
              Lịch sử
            </Button>
          </Link>
        ),
      }}
    >
      <WithdrawView
        appData={appData}
        user={user}
        currentBankCard={bankCardSelectedWithdraw}
        onWithdrawSuccess={handleWithdrawSuccess}
      />
    </AppPage>
  );
};
export default WithDrawPage;
