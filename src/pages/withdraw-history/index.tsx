import AppLoading from '@/components/app/app-loading';
import AppLoadMore from '@/components/app/app-loadmore';
import AppPage from '@/components/app/app-page';
import CommonEmpty from '@/components/empty/common-empty';
import { RootState } from '@/interface';
import { navigator } from '@/utils';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'umi';
import WithdrawHistoryItem from './components/withdraw-item';

const WithdrawHistoryPage = (props) => {
  const { withdrawHistoryState, loading } = useSelector(
    (state: RootState) => state,
  );
  const dispatch = useDispatch();
  const { withdrawHistory, filter } = withdrawHistoryState;

  useEffect(() => {
    getWithdrawHistory({});
    return () => {
      clearState();
    };
  }, []);

  const clearState = () => {
    dispatch({
      type: 'withdrawHistoryState/clearState',
    });
  };

  const getWithdrawHistory = (newFilter, isLoadMore?) => {
    const query = { ...filter, ...newFilter };
    dispatch({
      type: 'withdrawHistoryState/getWithdrawHistory',
      payload: {
        query,
        isLoadMore,
      },
    });
  };

  const handleLoadMoreHistory = () => {
    getWithdrawHistory({ pageToken: filter.nextPageToken }, true);
  };

  const handleViewWithdrawDetail = (withdrawId) => () => {
    navigator.pushPath(`/withdraw-history/${withdrawId}`);
  };

  const isLoading = loading.effects['withdrawHistoryState/getWithdrawHistory'];
  return (
    <AppPage
      title={'Lịch sử rút tiền'}
      className="bg-white"
      style={{
        minHeight: 'calc(100vh - 50px)',
      }}
    >
      {withdrawHistory?.length > 0 ? (
        <AppLoadMore
          shouldLoadMore={!!filter.nextPageToken}
          onLoadMore={handleLoadMoreHistory}
          loading={loading.effects['withdrawHistoryState/getWithdrawHistory']}
        >
          <ListGroup variant="flush">
            {withdrawHistory?.map((item) => (
              <ListGroup.Item
                key={item._id}
                action
                onClick={handleViewWithdrawDetail(item._id)}
              >
                <WithdrawHistoryItem withdrawHistory={item} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </AppLoadMore>
      ) : isLoading ? (
        <AppLoading />
      ) : (
        <CommonEmpty title="Bạn chưa có lịch sử rút tiền" />
      )}
    </AppPage>
  );
};
export default WithdrawHistoryPage;
