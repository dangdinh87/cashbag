import { AssetConst } from '@/configs';
import { LogoIcon, SuccessIcon } from '@/configs/assets';
import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import AppButton from '../app-button';
import AppImage from '../app-image';

export default function OnBoarding({ show }) {
  const listInfo = [
    'Khám phá ưu đãi hoàn tiền đến 20% từ các thương hiệu uy tín trên Cashbag',
    'Hoàn tiền không giới hạn tại các thương hiệu ngày vàng',
    'Được rút tiền hoàn về tài khoản ngân hàng của bạn',
  ];

  return (
    <Modal
      centered
      fullscreen
      show={show}
      contentClassName="bg-primary d-flex align-items-center justify-content-center p-3"
    >
      <LogoIcon
        className="text-white flex-shrink-0"
        width="143px"
        height="42px"
      />
      <AppImage
        className="mt-3"
        src={AssetConst.image.splash}
        style={{ maxWidth: 256, minHeight: 343 }}
      />
      <Card className="p-3 mt-3">
        {listInfo.map((item, index) => (
          <div className="d-flex align-items-center justify-content-start py-1">
            <SuccessIcon className="flex-shrink-0" />
            <p className="text-dark ms-3 fs-8">{item}</p>
          </div>
        ))}
      </Card>
      <AppButton
        className="w-100 bg-white text-primary py-2 mt-3 fs-7"
        showNext
        // onClick={() => setShowGuide(false)}
      >
        Tiếp tục
      </AppButton>
    </Modal>
  );
}
