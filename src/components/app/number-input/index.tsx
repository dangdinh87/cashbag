import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

import { formatter } from '@/utils';

import { CommonProps } from '@/interface';
import styles from './styles.scss';

interface Props extends CommonProps {
  prefix?: any;
  prefixStyled?: boolean;
  placeholder?: string;
  inputRef?: any;
  inputProps?: any;
  onChange?: (value: number) => void;
  onKeyDown?: (event: any) => void;
  value?: number;
  defaultValue?: number;
  type?: 'currency' | 'number';
  className?: string;
}
const AppNumberInput: React.FC<Props> = React.forwardRef<any, Props>(
  (
    {
      className = '',
      style,
      prefix,
      prefixStyled = true,
      placeholder = '',
      inputProps,
      onChange,
      onKeyDown,
      value,
      defaultValue,
      type = 'number',
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string | number>('');
    useEffect(() => {
      setInputValue(formatValue(value || defaultValue));
    }, [value]);

    const handleChange = (changedValue) => {
      const numberValue = changedValue?.replace(/[^0-9]+/g, '');
      setInputValue(formatValue(numberValue));
      onChange?.(Number(numberValue));
    };

    const formatValue = (numberValue) => {
      return formatter.number(Number(numberValue));
    };

    const isSuffixInput = type !== 'number';

    const suffix = () => {
      switch (type) {
        case 'currency':
          return 'đ';
        default:
          return null;
      }
    };

    return (
      <InputGroup
        ref={ref}
        className={classNames(`rounded text-truncate=`, styles.numberInput)}
        style={style}
      >
        {prefix && (
          <span
            className={`input-group-text ${
              prefixStyled ? '' : 'bg-transparent border-0'
            }`}
          >
            {prefix}
          </span>
        )}
        <FormControl
          defaultValue={defaultValue}
          value={inputValue}
          type="text"
          inputMode="numeric"
          className={classNames(styles.suffixInput, 'rounded', className)}
          style={style}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onChange={(event: any) => handleChange(event.target.value)}
          {...inputProps}
        />
        {isSuffixInput && (
          <div className={classNames(styles.suffix, className)}>{suffix()}</div>
        )}
      </InputGroup>
    );
  },
);
export default AppNumberInput;
