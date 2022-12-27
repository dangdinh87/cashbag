import BottomMenu from '@/components/app/bottom-menu';
import { HomeIcon, OrderIcon, UserIcon } from '@/configs/assets';
import React from 'react';
import { Location } from 'umi';

interface Props {
  location: Location;
}
const Layout: React.FC<Props> = (props) => {
  const { children, location } = props;

  const menus = [
    {
      icon: <HomeIcon />,
      name: 'Sản phẩm',
      route: '/home',
    },
    {
      icon: <OrderIcon />,
      name: 'Đơn hàng',
      route: '/order',
    },
    {
      icon: <UserIcon />,
      name: 'Tài khoản',
      route: '/user/account',
    },
  ];

  const isHideMenu = ['/search', '/category', 'brand'].some((el) =>
    location.pathname.includes(el),
  );

  return (
    <div>
      {children}
      <>
        {!isHideMenu && <BottomMenu menus={menus} location={location} />}
        {/* <FloaterChat className={styles.floatChat} onClick={handleOAChat} /> */}
      </>
    </div>
  );
};
export default Layout;
