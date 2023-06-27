import { ContactIcon } from '@/configs/assets';
import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  onClick(): void;
  className?: string;
}

const DEFAULT_POSITION_ACTION_X = window.innerWidth - 70;
const DEFAULT_POSITION_ACTION_Y = window.innerHeight - 110; // Vị trí x mặc định (chiều rộng màn hình - kích thước component - khoảng cách)

const FloaterChat: React.FC<Props> = ({ className, onClick }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: DEFAULT_POSITION_ACTION_X,
    y: DEFAULT_POSITION_ACTION_Y,
  });
  const elementRef = useRef<HTMLButtonElement>(null);
  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, clientY } = event;
      const { left, top } = elementRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: clientX - left,
        y: clientY - top,
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [],
  );

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { x: offsetX, y: offsetY } = offsetRef.current;
    const newX = clientX - offsetX;
    const newY = clientY - offsetY;
    setPosition({ x: newX, y: newY });
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  return (
    <Button
      ref={elementRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'move',
      }}
      onDragStart={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseDown={handleMouseDown}
      variant="white"
      className={classNames(
        'rounded-circle p-1 position-fixed d-flex align-items-center justify-content-center shadow cursor-pointer text-primary',
        className,
      )}
      onClick={onClick}
    >
      <ContactIcon />
    </Button>
  );
};

export default FloaterChat;
