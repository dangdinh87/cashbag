import AppTabGroup from '@/components/app-tab-group';
import AppSpacer from '@/components/app/app-spacer';
import { navigator } from '@/utils';
import { useEffect } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useLocation, useSelector } from 'umi';
import EmptyTransaction from './components/transaction-empty';
import TransactionItem from './components/transaction-item';

function TransactionPage() {
  const state = useSelector((state: any) => state);
  const { loading, transactionState } = state;
  const { transactionList = [] } = transactionState;
  const dispatch = useDispatch();
  const { query } = useLocation() as any;

  const getListOrder = (status?, pageToken?, isLoadMore?) => {
    dispatch({
      type: 'transactionState/getListOrder',
      payload: {
        data: { status, pageToken },
        isLoadMore,
      },
    });
  };

  const handleFilterOrder = (status) => {
    navigator.replaceLocation({
      pathname: `/transaction`,
      query: status && {
        status,
      },
    });
  };

  const handleClickTransaction = (transactionId) => {
    navigator.pushPath(`/transaction/${transactionId}`);
  };

  useEffect(() => {
    getListOrder(query.status);
  }, [query.status]);

  const orderMenus = [
    { _id: 'cashback', name: 'Hoàn tiền' },
    { _id: 'pending', name: 'Đang chờ duyệt' },
    { _id: 'approved', name: 'Đã duyệt' },
    { _id: 'rejected', name: 'Đã hủy' },
  ];

  const isLoading = loading.effects['transactionState/getListOrder'];

  return (
    <div className="bg-white" style={{ minHeight: 'calc(100vh - 50px)' }}>
      <AppTabGroup
        defaultValue={''}
        active={query.status}
        onChange={handleFilterOrder}
        className="bg-white fixed-top shadow-sm"
      >
        <AppTabGroup.Item eventKey="">Tất cả</AppTabGroup.Item>
        {orderMenus.map((order) => {
          return (
            <AppTabGroup.Item key={order._id} eventKey={order._id}>
              {order.name}
            </AppTabGroup.Item>
          );
        })}
      </AppTabGroup>
      <AppSpacer size={44} />
      {}
      <ListGroup variant="flush">
        {isLoading ? (
          <Spinner variant="border" className='mx-auto mt-3'/>
        ) : transactionList?.length > 0 ? (
          transactionList.map((transaction: any) => {
            return (
              <ListGroup.Item key={transaction._id} className="p-2">
                <TransactionItem
                  transaction={transaction}
                  onClick={() => handleClickTransaction(transaction._id)}
                />
              </ListGroup.Item>
            );
          })
        ) : (
          <EmptyTransaction />
        )}
      </ListGroup>
    </div>
  );
}

export default TransactionPage;
