import { Segmented } from 'antd';

import './index.scss';

function AppSwitchSelect({ options = [], onChange }) {
  return (
    <Segmented
      block
      options={options}
      onChange={(value) => console.log(value)}
      onResize={undefined}
      onResizeCapture={undefined}
    />
  );
}

export default AppSwitchSelect;
