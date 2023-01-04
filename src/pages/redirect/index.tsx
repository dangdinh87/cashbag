/* eslint-disable react-hooks/rules-of-hooks */
import AppPage from '@/components/app/app-page';
import { serviceBrand } from '@/services';
import { useEffect, useState } from 'react';
import { useLocation } from 'umi';

import './index.scss';
import AnimateLogo from './logo-animate';

const RedirectPage = (props) => {
  // const location = useLocation();
  // console.log(location);
  // const [redirectLink, setRedirectLink] = useState<string>('');

  // useEffect(() => {
  //   serviceBrand
  //     .getLinkRedirect(1, 1)
  //     .then((res) => {
  //       const result = res?.data?.url;
  //       setRedirectLink(result);
  //     })
  //     .catch(() => setRedirectLink(''));
  // }, []);

  return (
    <AppPage title="Điều hướng" className="bg-white">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: '80vh',
        }}
      >
        <AnimateLogo />
        <p className="position-absolute fw-normal text-waiting fs-6 fw-bolder text-gray">
          Vui lòng chờ trong giây lát
        </p>
      </div>
    </AppPage>
  );
};

export default RedirectPage;
