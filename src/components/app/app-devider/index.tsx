import classNames from 'classnames';
import React from 'react';

interface Props {
  color?: string;
}
const AppVerticalDivider: React.FC<Props> = ({ color }) => {
  return (
    <div className={classNames('vr flex-shrink-0', color && `text-${color}`)} />
  );
};
export default AppVerticalDivider;
