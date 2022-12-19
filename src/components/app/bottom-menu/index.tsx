import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Location } from 'umi';
import Button from 'react-bootstrap/Button';

import { navigator } from '@/utils';
import AppSpacer from '../app-spacer';

interface Props {
  menus: any[];
  location: Location;
}
const BottomMenu: React.FC<Props> = ({ menus, location }) => {
  return (
    <>
      <AppSpacer size={68} />
      <Navbar fixed="bottom" className="bg-white py-0 shadow">
        <Nav fill className="w-100 fs-8" defaultActiveKey={location.pathname}>
          {menus.map((item, index) => (
            <Nav.Item key={index}>
              <Nav.Link
                active={location.pathname === item.route}
                onClick={() => navigator.replacePath(item.route)}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <div className="mb-1">{item.icon}</div>
                {item.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Navbar>
    </>
  );
};
export default BottomMenu;
