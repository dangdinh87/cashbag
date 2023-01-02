import { ContactIcon } from '@/configs/assets';
import classNames from 'classnames';
import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  onClick(): void;
  className?: string;
}
const FloaterChat: React.FC<Props> = ({ className, onClick }) => {
  return (
    <Button
      variant="white"
      className={classNames(
        'rounded-circle p-1 position-fixed d-flex align-items-center justify-content-center m-3 shadow cursor-pointer text-primary',
        className,
      )}
      onClick={onClick}
    >
      <ContactIcon />
    </Button>
  );
};
export default FloaterChat;
