import classnames from 'classnames';
import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './style.scss';

export enum LoadingIndicatorTypes {
  show,
}

export interface LoadingIndicatorOptions {
  show: boolean;
}

const AppLoadingIndicator = (props: any) => {
  const { show } = props;
  return show ? (
    <div className={styles.globalOverlay}>
      <div className={classnames('shadow', styles.spinnerContainer)}>
        <Spinner animation="border" variant="primary"></Spinner>
      </div>
    </div>
  ) : null;
};

export default AppLoadingIndicator;
