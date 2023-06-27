import { createContext, useContext, useState, ReactNode } from 'react';
import { getPhoneNumber } from 'zmp-sdk/apis';

import { RootState } from '@/interface/common';
import AppConfirmModal from '@/components/app/app-confirm-modal';
import { PhoneInfoIcon } from '@/configs/assets';
import { serviceZalo } from '@/services';
import { useDispatch, useSelector } from 'umi';
import { toast } from '@/components/app/toast/manager';

type RequestPhoneContextType = {
  handleRequestPhone: (callback?: () => void, forceRequest?: boolean) => void;
};

const RequestPhoneContext = createContext<RequestPhoneContextType>({
  handleRequestPhone: () => {},
});

export function useContextRequestPhone(): RequestPhoneContextType {
  return useContext(RequestPhoneContext);
}

type RequestPhoneWrapProps = {
  children: ReactNode;
};

export function RequestPhoneWrap({ children }: RequestPhoneWrapProps) {
  const [visible, setVisible] = useState<ReactNode>(<></>);
  const {
    mainState: { isPhoneRequested },
    userState,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const handleRequestPhone = (callback?: () => void, forceRequest?: false) => {
    const isVerifiedPhone = !!userState?.user?.phone?.verified;

    if (isVerifiedPhone) return callback?.();

    if (!forceRequest && isPhoneRequested) {
      return callback?.();
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
        onConfirm={() => handleAllowGetPhoneUser(callback, forceRequest)}
        onClose={() => {
          setVisible(<></>);
          updateStateRequestPhone();
          !forceRequest && callback?.();
        }}
      />,
    );
  };

  const updatePhoneUser = (data) => {
    dispatch({
      type: 'userState/requestPhoneUser',
      payload: {
        data,
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

  const handleAllowGetPhoneUser = async (
    callback?: () => void,
    forceRequest?: false,
  ) => {
    // await storage.setShowPhoneRequested();
    updateStateRequestPhone();
    await getPhoneNumber({
      success: async (data) => {
        // xử lý khi gọi api thành công
        let { token } = data;
        const accessToken = await serviceZalo.getAccessToken();

        // xử lý cho trường hợp sử dụng phiên bản Zalo mới (phiên bản lớn hơn 23.02.01)
        if (token) {
          await updatePhoneUser({ token, accessToken });
          setVisible(<></>);
          !forceRequest && callback?.();
        }
      },
      fail: (error) => {
        console.log(error);
        // xử lý khi gọi api thất bại
        setVisible(<></>);
        !forceRequest && callback?.();

        if (error.code === -2002) {
          toast.show(
            'Bạn đã từ chối quyền truy cập SĐT trước đó. Vui lòng cấp lại tại mục Cấp Quyền của Zalo mini App.',
          );
        }
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
