import { Segmented } from 'antd';

function AppSwitchSelect({ options = [], onChange, className, block = true }) {
  return (
    <Segmented
      className={className}
      block={block}
      options={options}
      onChange={onChange}
      onResize={undefined}
      onResizeCapture={undefined}
    />
  );
}

export default AppSwitchSelect;
