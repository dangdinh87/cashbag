import classNames from 'classnames';
import React from 'react';

interface Props {
  size: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}
const AppSpacer: React.FC<Props> = ({
  size,
  direction = 'vertical',
  className,
}) => {
  return (
    <pre
      className={classNames('app-spacer m-0', className)}
      style={direction === 'vertical' ? { height: size } : { width: size }}
    />
  );
};
export default AppSpacer;
