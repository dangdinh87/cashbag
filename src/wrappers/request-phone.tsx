import AppConfirmModal from '@/components/app/app-confirm-modal';
import { PhoneInfoIcon } from '@/configs/assets';
import { serviceZalo } from '@/services';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import { getPhoneNumber } from 'zmp-sdk/apis';

const RequestPhoneContext = createContext({}) as any;

export function useContextRequestPhone() {
  return useContext(RequestPhoneContext) as any;
}

export function RequestPhoneWrap({ children }) {
  const [visible, setVisible] = useState<any>(<></>);
  const {
    mainState: { isPhoneRequested },
    userState: { phone = '' },
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const getUserDetail = () => {
    dispatch({
      type: 'userState/getUserDetail',
    });
  };

  // useEffect(() => {
  //   setVisible(visible);
  // }, [visible]);

  useEffect(() => {
    // getUserDetail();
  }, []);

  const handleRequestPhone = (callback) => {
    if (isPhoneRequested || phone) {
      callback?.();
      return;
    }
    setVisible(
      <AppConfirmModal
        showCloseIcon={false}
        show={true}
        image={<PhoneInfoIcon />}
        title="Cashbag cần số điện thoại của bạn"
        content="Chúng tôi cần thông tin số điện thoại của bạn để định danh tài khoản"
        cancelLabel="Đóng"
        okLabel="Cho Phép"
        onConfirm={() => handleAllowGetPhoneUser(callback)}
        onClose={() => {
          updateStateRequestPhone();
          callback?.();
        }}
      />,
    );
  };

  const updatePhoneUser = (number) => {
    console.log('call api server', number);
  };

  const updateStateRequestPhone = () => {
    dispatch({
      type: 'mainState/updateState',
      payload: {
        isPhoneRequested: true,
      },
    });
  };

  const handleAllowGetPhoneUser = (callback) => {
    updateStateRequestPhone();
    getPhoneNumber({
      success: async (data) => {
        // xử lý khi gọi api thành công
        let { token, number } = data;
        // xử lý cho trường hợp sử dụng phiên bản Zalo mới (phiên bản lớn hơn 23.02.01)
        if (number) {
          await updatePhoneUser(token);
          setVisible(<></>);
          callback?.();
        }
      },
      fail: (error) => {
        callback?.();
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };

  return (
    <RequestPhoneContext.Provider value={{ handleRequestPhone }}>
      {children}
      {visible}
    </RequestPhoneContext.Provider>
  );
}
