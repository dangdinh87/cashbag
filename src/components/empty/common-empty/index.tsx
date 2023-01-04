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
    <div
      className={`text-center p-3 d-flex flex-column justify-content-center align-items-center ${className}`}
      style={{ minHeight: 'inherit' }}
    >
      <div className={classNames('mb-3')}>{icon}</div>
      {title && (
        <p
          className={classNames(
            'mb-2 fw-bold',
            size === 'lg' ? 'fs-6' : 'fs-6',
          )}
        >
          {title}
        </p>
      )}
      <p className="text-center fs-8">{message}</p>
    </div>
  );
};
export default CommonEmpty;
