import React from 'react';
import { NavDropdown } from 'react-bootstrap';

import { ICommonProps } from '@/interfaces/common/common-props';
import { helper } from '@/utils';

interface SelectItemProps extends ICommonProps {
  options?: any[];
  title: any;
  renderOption: (option: any) => React.ReactNode;
}

const SelectItem = React.forwardRef<any, SelectItemProps>(
  ({ title, options, className = '', style, renderOption }, ref) => {
    return (
      <NavDropdown
        ref={ref}
        className={helper.classNames('flex-shrink-0 fw-bold h-100', className)}
        style={style}
        title={title}
        active
      >
        {options?.map((option) =>
          renderOption ? renderOption(option) : option,
        )}
      </NavDropdown>
    );
  },
);

export default SelectItem;
