import BottomMenu from '@/components/app/bottom-menu';
import ScrollToTopOnMount from '@/components/app/scroll-to-top';
import FloaterChat from '@/components/common/float-chat';
import { HomeIcon, OrderIcon, UserIcon } from '@/configs/assets';
import useKeepPositionScroll from '@/hooks/useKeepPosition';
import classNames from 'classnames';
import React from 'react';
import { Location, useDispatch } from 'umi';
import styles from './styles.scss';

interface Props {
  location: Location;
}
const Layout: React.FC<Props> = (props) => {
  const { children, location } = props;
  const dispatch = useDispatch();

  // const locationA = useKeepPositionScroll();

  const menus = [
    {
      icon: <HomeIcon />,
      name: 'Sản phẩm',
      route: '/home',
    },
    {
      icon: <OrderIcon />,
      name: 'Đơn hàng',
      route: '/transaction',
    },
    {
      icon: <UserIcon />,
      name: 'Tài khoản',
      route: '/user',
    },
  ];

  const handleOAChat = () => {
    dispatch({
      type: 'mainState/openZaloChat',
    });
  };

  const isHideMenu = ['/search', '/category', '/brand', '/redirect'].some(
    (el) => location.pathname.includes(el),
  );

  return (
    <ScrollToTopOnMount
      isException={location.pathname === '/home'}
      trigger={location.pathname}
    >
      <div>
        {children}
        <>
          {!isHideMenu && <BottomMenu menus={menus} location={location} />}
          <FloaterChat
            onClick={handleOAChat}
            className={classNames({ 'mb-0': isHideMenu }, styles.floatChat)}
          />
        </>
      </div>
    </ScrollToTopOnMount>
  );
};
export default Layout;
