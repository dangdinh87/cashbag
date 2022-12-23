import { Segmented } from 'antd';

function AppSwitchSelect({ options = [], onChange }) {
  return (
    <Segmented
      block
      options={options}
      onChange={onChange}
      onResize={undefined}
      onResizeCapture={undefined}
    />
  );
}

export default AppSwitchSelect;
