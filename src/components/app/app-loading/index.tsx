import React from 'react';
import { Spinner } from 'react-bootstrap';

function AppLoading() {
  return (
    <div className="d-flex align-items-center justify-content-center pt-3">
      <Spinner variant="border" color="primary" />
    </div>
  );
}

export default AppLoading;
