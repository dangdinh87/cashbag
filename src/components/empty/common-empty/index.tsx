import classNames from 'classnames';
import React from 'react';

// import { EmptyIcon } from '@/configs/assets';

import styles from './styles.scss';

interface Props {
  icon?: any;
  title?: string;
  message?: any;
  size?: 'sm' | 'lg';
  className?: string;
}
const CommonEmpty: React.FC<Props> = ({
  icon,
  title,
  message,
  size = 'lg',
  className,
}) => {
  return (
    <div className={`text-center p-3 ${className}`}>
      <div className={classNames('mb-3')}>{icon}</div>
      {title && (
        <p
          className={classNames(
            'mb-2 fw-bold',
            size === 'lg' ? 'fs-5' : 'fs-6',
          )}
        >
          {title}
        </p>
      )}
      <p className="text-center">{message}</p>
    </div>
  );
};
export default CommonEmpty;
