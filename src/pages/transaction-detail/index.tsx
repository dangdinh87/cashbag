import AppPage from '@/components/app/app-page';
import { AppConst } from '@/configs';
import { NoSuccessIcon, OrderIcon, SuccessIcon } from '@/configs/assets';
import { formatter, helper } from '@/utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useParams, useSelector } from 'umi';
import SectionItem from './components/section';
import { Timeline } from 'antd';
import './index.scss';
import { toast } from '@/components/app/toast/manager';

function TransactionDetail() {
  const dispatch = useDispatch();
  const params = useParams<{ transactionId: string }>();
  const [currentColor, setCurrentColor] = useState('');
  const { transactionDetail } = useSelector(
    (state: any) => state.transactionDetailState,
  );
  const getDetailTransaction = () => {
    dispatch({
      type: 'transactionDetailState/getDetailTransaction',
      payload: {
        transactionId: params.transactionId,
      },
    });
  };

  const handleCopy = (value) => {
    helper.copyToClipboard(value);
    toast.show('Copy thành công');
  };

  useEffect(() => {
    if (transactionDetail?.status) {
      setCurrentColor(AppConst.colorState.cashback[transactionDetail.status]);
    }
  }, [transactionDetail]);

  useEffect(() => {
    getDetailTransaction();
    return () => {
      dispatch({
        type: 'transactionDetailState/clearState',
      });
    };
  }, []);

  if (!transactionDetail) return <></>;

  const listInfo = [
    {
      content: transactionDetail?.brand?.name,
    },
    {
      title: 'Giá trì',
      content: formatter.currency(transactionDetail?.transactionValue),
    },
    {
      title: 'Mã đơn hàng',
      content: `#${transactionDetail?.transactionId}`,
      extraContent: (
        <span onClick={() => handleCopy(transactionDetail?.transactionId)}>
          Copy
        </span>
      ),
    },
    {
      title: 'Trạng thái đơn hàng',
      content: `Đơn hàng ${AppConst.filterState.order[
        transactionDetail?.status
      ]?.toLowerCase()}`,
    },
    {
      title: `Hoàn tiền ${AppConst.filterState.order[
        transactionDetail?.status
      ]?.toLowerCase()}`,
      content: formatter.currency(transactionDetail?.commission),
    },
  ];

  const handleListBeforeRender = () => {
    let elementIndex = -1;
    transactionDetail?.histories?.forEach((history, index) => {
      if (
        ['cashback', 'rejected'].includes(history.status) &&
        !history?.current
      )
        return (elementIndex = index);
    });

    const newList = [...transactionDetail?.histories];
    if (elementIndex >= 0) {
      const remove = newList?.splice(elementIndex, 1);
      newList?.unshift({
        ...remove[0],
        isBlock: true,
        defaultText: 'Sau 60 - 90 ngày kể từ thời gian ghi nhận đơn hàng',
      });
    }

    return newList;
  };

  return (
    <AppPage title="Đơn hàng" className="bg-white">
      <div className="p-3">
        <Row>
          <Col xs={'auto'}>
            <OrderIcon width={20} />
          </Col>
          <Col className="px-1">
            {listInfo.map((item: any, index: number) => (
              <SectionItem
                key={index}
                color={AppConst.colorState.cashback[transactionDetail?.status]}
                title={item.title}
                content={item.content}
                extraContent={item.extraContent}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col xs={'auto'}>
            <OrderIcon width={20} />
          </Col>
          <Col className="px-1 fs-5 text-gray fw-bolder">
            Quy trình hoàn tiền
          </Col>
        </Row>
        <Row className="px-1 mt-2">
          <Timeline>
            {handleListBeforeRender()
              ?.reverse()
              ?.map((history) => {
                return (
                  <Timeline.Item
                    key={history._id}
                    dot={history?.isBlock ? <NoSuccessIcon /> : <SuccessIcon />}
                  >
                    <div className="text-gray ms-1">
                      <p className="fs-8 fw-bold ">{history.title}</p>
                      <p className="fs-9 ">
                        {history.defaultText ||
                          formatter.dateTime(history.createdAt)}
                      </p>
                    </div>
                  </Timeline.Item>
                );
              })}
          </Timeline>
        </Row>
      </div>
    </AppPage>
  );
}

export default TransactionDetail;
