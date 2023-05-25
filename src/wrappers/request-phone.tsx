import AppConfirmModal from '@/components/app/app-confirm-modal';
import { PhoneInfoIcon } from '@/configs/assets';
import { storage } from '@/utils';
import { createContext, useContext, useState } from 'react';
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
    userState,
  } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const isVerifiedPhone = userState?.phone?.verified;

  const handleRequestPhone = async (callback?) => {
    const { isShowPhoneRequest } = await storage.getShowPhoneRequested();
    if (isVerifiedPhone || isShowPhoneRequest || isPhoneRequested) {
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

  const updatePhoneUser = (token) => {
    dispatch({
      type: 'userState/requestPhoneUser',
      payload: {
        query: {
          token,
        },
      },
      callback: () => {
        dispatch({
          type: 'userState/getUserDetail',
        });
      },
    });
  };

  const updateStateRequestPhone = () => {
    dispatch({
      type: 'mainState/updateState',
      payload: {
        isPhoneRequested: true,
      },
    });
  };

  const handleAllowGetPhoneUser = async (callback?) => {
    await storage.setShowPhoneRequested();
    updateStateRequestPhone();
    getPhoneNumber({
      success: async (data) => {
        // xử lý khi gọi api thành công
        let { token } = data;
        // xử lý cho trường hợp sử dụng phiên bản Zalo mới (phiên bản lớn hơn 23.02.01)
        if (token) {
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
