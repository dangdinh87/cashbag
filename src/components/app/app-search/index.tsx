import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

import { CloseIcon, SearchIcon } from '@/configs/assets';

interface Props {
  defaultValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  hideIcon?: boolean;
  closeValueIcon?: boolean;
  onSearch?: (keyword) => void;
  onChange?: (value) => void;
  onClick?: () => void;
  inputClassName?: string;
  value?: string;
  searchNoKeyword?: any;
  className?: string;
}
const AppSearchBox: React.FC<Props> = React.forwardRef<any, Props>(
  (props, ref) => {
    const {
      placeholder,
      autoFocus,
      defaultValue,
      className,
      hideIcon,
      onClick,
      onSearch,
      onChange,
      closeValueIcon = false,
      inputClassName,
      value,
      searchNoKeyword,
    } = props;

    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleChange = (event) => {
      setInputValue(event.target.value);
      onChange?.(event.target.value);
    };

    const handleEnter = (event) => {
      const { value } = event.target;
      if (event.keyCode !== 13) {
        return;
      }

      if (value?.length === 0) return searchNoKeyword?.();
      onSearch?.(value);
    };

    const handleClearInput = () => {
      setInputValue('');
      onChange?.('');
    };

    return (
      <InputGroup className={classNames('bg-light fs-7 rounded', className)}>
        {!hideIcon && (
          <InputGroup.Text
            className="border-0 pe-0"
            style={{ background: 'inherit' }}
          >
            <SearchIcon className='text-gray' width={20} height={20} />
          </InputGroup.Text>
        )}
        <FormControl
          style={{ fontSize: 'inherit' }}
          ref={ref}
          defaultValue={defaultValue}
          className={classNames('border-0 p-2 text-truncate', inputClassName)}
          onChange={handleChange}
          type="search"
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyDown={handleEnter}
          onClick={onClick}
          value={inputValue}
        />
        {closeValueIcon && value?.length > 0 && (
          <InputGroup.Text
            className="border-0 p-0 cursor-pointer"
            style={{ background: 'inherit' }}
          >
            <CloseIcon className="me-2" width={20} onClick={handleClearInput} />
          </InputGroup.Text>
        )}
      </InputGroup>
    );
  },
);
export default AppSearchBox;
