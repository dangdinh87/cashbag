import { AssetConst } from '@/configs';
import { LogoIcon } from '@/configs/assets';
import firebase from '@/utils/firebase';
import { useContextRequestPhone } from '@/wrappers/request-phone';
import React, { useEffect } from 'react';
import { Card, Modal } from 'react-bootstrap';
import { Dispatch, IMainState, Loading, connect } from 'umi';
import AppButton from '../app-button';
import AppImage from '../app-image';

interface Props {
  dispatch: Dispatch;
  loading: Loading;
  mainState: IMainState;
}
const AppInitializer: React.FC<Props> = ({
  dispatch,
  loading,
  children,
  mainState,
}) => {
  const { showOnboarding, loadingNewUser } = mainState;
  const { handleRequestPhone } = useContextRequestPhone();
  useEffect(() => {
    dispatch({
      type: 'mainState/initApp',
    });

    firebase.initFirebaseApp();
  }, []);

  if (loading.effects['mainState/initApp']) {
    return <></>;
  }

  const closeModal = () => {
    dispatch({
      type: 'mainState/updateState',
      payload: {
        showOnboarding: false,
      },
    });
  };

  const listInfo = [
    {
      title: 'Tiết kiệm hơn khi mua sắm online ',
      content:
        'Nhận hoàn tiền đến 20% khi mua sắm tại hơn 200 thương hiệu liên kết trên Cashbag',
      photo: require('../../../assets/images/onboaring_1.png'),
    },
    {
      title: 'Hoàn tiền thật, không hoàn xu',
      content: 'Được rút tiền hoàn về tài khoản ngân hàng khi số dư đủ 70.000đ',
      photo: require('../../../assets/images/onboaring_2.png'),
    },
    {
      title: 'Hỗ trợ 24/7',
      content:
        'Cho phép xác nhận khách hàng qua số điện thoại để Cashbag phục vụ tốt nhất',
      photo: require('../../../assets/images/onboaring_3.png'),
    },
  ];

  return (
    <>
      <Modal
        centered
        fullscreen
        show={showOnboarding}
        contentClassName="bg-primary d-flex align-items-center justify-content-start p-3"
      >
        <LogoIcon
          className="text-white flex-shrink-0"
          width="143px"
          height="42px"
        />
        <AppImage
          className="mt-3 object-fit-contain"
          src={AssetConst.image.splash}
          style={{ maxWidth: 332, minHeight: 332 }}
        />
        <Card className="p-3 mt-3">
          {listInfo.map((item, index) => (
            <div className="text-center text-primary" key={index}>
              <div className="d-flex align-items-center justify-content-center pt-1">
                <AppImage
                  className="flex-shrink-0 object-fit-cover"
                  src={item.photo}
                  style={{ width: 22 }}
                />
                <p className=" ms-2 fs-6 fw-bold">{item.title}</p>
              </div>
              <p className="fs-7">{item.content}</p>
            </div>
          ))}
        </Card>
        <AppButton
          className="w-100"
          variant="outline-primary bg-white py-2c mt-3 fs-7"
          showNext
          onClick={() => {
            handleRequestPhone();
            closeModal();
          }}
          loading={loadingNewUser}
        >
          Tiếp tục
        </AppButton>
      </Modal>
      {children}
    </>
  );
};
export default connect(({ mainState, loading }: any) => ({
  loading,
  mainState,
}))(AppInitializer);
