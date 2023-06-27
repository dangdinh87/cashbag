import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import AppLoading from '../app-loading';
import AppSpacer from '../app-spacer';
import MobileToolbar, { MobileToolbarProps } from './toolbar';

interface Props {
  title?: string | React.ReactNode;
  toolbarProps?: MobileToolbarProps;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
}
const AppPage: React.FC<Props> = ({
  title,
  toolbarProps,
  className,
  children,
  style,
  loading,
}) => {
  return (
    <div className="bg-light">
      <AppSpacer size={50} className="bg-white" />
      <MobileToolbar title={loading ? 'Loading...' : title} {...toolbarProps} />
      <div
        style={{
          minHeight: 'calc(100vh - 50px)',
          ...style,
        }}
        className={classNames('w-100', className)}
      >
        {loading ? <AppLoading /> : children}
      </div>
    </div>
  );
};
export default AppPage;
