import classNames from 'classnames';
import React from 'react';
import MobileToolbar, { MobileToolbarProps } from './toolbar';

interface Props {
  title?: string | React.ReactNode;
  toolbarProps?: MobileToolbarProps;
  className?: string;
}
const AppPage: React.FC<Props> = ({
  title,
  toolbarProps,
  className,
  children,
}) => {
  return (
    <div className={classNames('w-100 overflow-visible min-vh-100', className)}>
      <MobileToolbar title={title} {...toolbarProps} />
      {children}
    </div>
  );
};
export default AppPage;
