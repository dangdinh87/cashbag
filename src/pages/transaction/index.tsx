import AppTabGroup from '@/components/app-tab-group';
import AppImage from '@/components/app/app-image';
import AppSpacer from '@/components/app/app-spacer';
import { AppConst } from '@/configs';
import { ArrowRightIcon } from '@/configs/assets';
import { formatter, helper, navigator } from '@/utils';
import { useEffect } from 'react';
import { ListGroup, Ratio } from 'react-bootstrap';
import { useDispatch, useLocation, useSelector } from 'umi';
import TransactionItem from './components/transaction-item';

function TransactionPage() {
  const transactionState = useSelector((state: any) => state.transactionState);
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

  useEffect(() => {
    getListOrder(query.status);
  }, [query.status]);

  const orderMenus = [
    { _id: 'cashback', name: 'Hoàn tiền' },
    { _id: 'pending', name: 'Đang chờ duyệt' },
    { _id: 'approved', name: 'Đã duyệt' },
    { _id: 'rejected', name: 'Đã hủy' },
  ];

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
      <ListGroup variant="flush">
        {transactionList.map((transaction: any) => {
          return (
            <ListGroup.Item key={transaction._id} className="p-2">
              <TransactionItem transaction={transaction} onClick={null} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default TransactionPage;
