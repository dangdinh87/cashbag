import AppImage from '@/components/app/app-image';
import AppPage from '@/components/app/app-page';
import { AppConst } from '@/configs';
import { ArrowRightIcon, HandIcon, WalletIcon } from '@/configs/assets';
import { formatter, helper } from '@/utils';
import React, { useEffect } from 'react';
import { ListGroup, Ratio } from 'react-bootstrap';
import { useDispatch, useSelector } from 'umi';

function UserPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.userState);
  useEffect(() => {
    dispatch({
      type: 'userState/getUserDetail',
    });
  }, []);

  if (!user) return <></>;

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
        <ListGroup.Item
          className="position-relative bg-gray text-white fw-bold d-flex flex-row justify-content-center fs-5 p-3c"
          action
          disabled
        >
          <small>Rút tiền</small>
          <ArrowRightIcon className="position-absolute end-0 me-3" />
        </ListGroup.Item>
      </ListGroup>
      <i className="mx-3 fs-8 text-primary">Bạn chưa đủ điều kiện rút tiền</i>
    </AppPage>
  );
}

export default UserPage;
