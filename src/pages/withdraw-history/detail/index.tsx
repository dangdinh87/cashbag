import AppPage from '@/components/app/app-page';
import { RootState } from '@/interface';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useIntl, useParams, useSelector } from 'umi';
import CashInfo from './components/cash-info';
import ReasonInfo from './components/reason-info';
import ReceiverInfo from './components/receiver-info';
import AppLoading from '@/components/app/app-loading';

const WithdrawHistoryDetail = (props) => {
  const { withdrawHistoryState, loading } = useSelector(
    (state: RootState) => state,
  );
  const { withdrawDetail } = withdrawHistoryState;
  const { formatMessage } = useIntl();
  const params: { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getWithdrawDetail();
    return () => {
      clearState();
    };
  }, []);

  const clearState = () => {
    dispatch({
      type: 'withdrawHistoryState/clearState',
    });
  };

  const getWithdrawDetail = () => {
    dispatch({
      type: 'withdrawHistoryState/getWithdrawDetail',
      payload: {
        withdrawId: params.id,
      },
    });
  };

  const handleSupportChannel = () => {
    dispatch({
      type: 'mainState/openZaloChat',
    });
  };

  const isLoading = loading.effects['withdrawHistoryState/getWithdrawDetail'];

  return (
    <AppPage
      title={'Chi tiết rút tiền'}
      className="bg-light"
      style={{
        minHeight: 'calc(100vh - 50px)',
      }}
      toolbarProps={{
        extraContent: (
          <Button
            variant="link"
            className="p-0 fs-7"
            onClick={handleSupportChannel}
          >
            Trợ giúp
          </Button>
        ),
      }}
    >
      {isLoading ? (
        <AppLoading />
      ) : (
        withdrawDetail && (
          <>
            <Card className="mx-3 mb-3 mt-3">
              <CashInfo withdrawDetail={withdrawDetail} />
            </Card>
            {withdrawDetail.rejectedReason && (
              <Card className={classNames('mx-3 mb-3')}>
                <Card.Body className="py-2c">
                  <ReasonInfo withdrawDetail={withdrawDetail} />
                </Card.Body>
              </Card>
            )}
            <p className="fw-bold mx-3">Tài khoản nhận tiền</p>
            <Card className="mt-2 rounded-0">
              <ReceiverInfo withdrawDetail={withdrawDetail} />
            </Card>
          </>
        )
      )}
    </AppPage>
  );
};
export default WithdrawHistoryDetail;
