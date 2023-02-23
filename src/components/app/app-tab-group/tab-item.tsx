import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import { useForkRef } from 'rooks';

import { ICommonProps } from '@/interfaces/common/common-props';
import { helper } from '@/utils';

interface TabItemProps {
  eventKey: any;
  children?: any;
  defaultVisible?: boolean;
  onClick?: (event: any) => void;
}

const TabItem = React.forwardRef<any, TabItemProps>(
  (
    { eventKey, className = '', style, children, onClick, defaultVisible },
    ref,
  ) => {
    const tabRef = React.useRef<any>();
    const handleRef = useForkRef(tabRef, ref);

    useEffect(() => {
      if (!defaultVisible) {
        return;
      }
      handleScrollIntoView('auto');
    }, [defaultVisible]);

    const handleClick = (event) => {
      handleScrollIntoView('smooth');
      onClick?.(event);
    };

    const handleScrollIntoView = (behavior) => {
      tabRef.current!.focus();
      tabRef.current.scrollIntoView({
        behavior,
        inline: isMobile ? 'center' : 'nearest',
        block: 'center',
      });
    };

    return (
      <Nav.Item
        ref={handleRef}
        className={helper.classNames('flex-shrink-0')}
        onClick={handleClick}
      >
        <Nav.Link
          as="div"
          eventKey={eventKey}
          className={helper.classNames(
            'tab-item fw-bold fs-7 flex-shrink-0 h-100 px-3 d-flex flex-row align-items-center',
            className,
          )}
          style={style}
        >
          {children}
        </Nav.Link>
      </Nav.Item>
    );
  },
);

export default TabItem;
