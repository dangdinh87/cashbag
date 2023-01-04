/* eslint-disable react-hooks/rules-of-hooks */
import AppPage from '@/components/app/app-page';
import { serviceBrand } from '@/services';
import zalo from '@/services/zalo';
import { navigator } from '@/utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'umi';

import './index.scss';
import AnimateLogo from './logo-animate';

const RedirectPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const { brand, url, type } = location.state as any;

  useEffect(() => {
    if (brand && url) {
      serviceBrand.getLinkRedirect({ brand, url, type }).then((res) => {
        const result = res?.data?.url;
        if (result) {
          zalo.openOutApp(result);
          setIsSuccess(true);
        }
      });
    }
  }, [location.state]);

  return (
    <AppPage title="Điều hướng" className="bg-white">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: '80vh',
        }}
      >
        <AnimateLogo />
        {!isSuccess ? (
          <p className="position-absolute fw-normal text-waiting fs-6 fw-bolder text-gray">
            {'Vui lòng chờ trong giây lát'}
          </p>
        ) : (
          <a
            className="text-waiting position-absolute fw-normal"
            onClick={() => navigator.goBack()}
          >
            Quay lại Cashbag
          </a>
        )}
      </div>
    </AppPage>
  );
};

export default RedirectPage;
