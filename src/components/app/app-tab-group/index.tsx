import './style.scss';

import React from 'react';
import { Nav } from 'react-bootstrap';

import { helper } from '@/utils';

import SelectItem from './select-item';
import TabItem from './tab-item';

interface Props {
  defaultValue?: any;
  active?: any;
  fill?: boolean;
  variant?: 'dark' | 'light';
  orientation?: 'vertical' | 'horizontal';
  containerRef?: any;
  onChange?: (value: any) => void;
  className?: string;
}
const AppTabGroup: React.FC<Props> & { Item: typeof TabItem; Select } = (
  props,
) => {
  const {
    containerRef,
    defaultValue,
    active,
    fill,
    className = '',
    style,
    variant = 'light',
    children,
    orientation = 'horizontal',
    onChange,
  } = props;

  return (
    <Nav
      ref={containerRef}
      fill={fill}
      variant="tabs"
      className={helper.classNames(
        'app-tab flex-nowrap overflow-auto hide-scrollbar',
        orientation,
        variant,
        className,
      )}
      defaultActiveKey={defaultValue}
      onSelect={onChange}
      activeKey={active}
      style={style}
    >
      {children}
    </Nav>
  );
};
AppTabGroup.Item = TabItem;
AppTabGroup.Select = SelectItem;

export default AppTabGroup;
