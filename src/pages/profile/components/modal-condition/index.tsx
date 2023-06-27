import AppBottomSheet from '@/components/app/app-bottom-sheet';
import { SuccessIcon } from '@/configs/assets';
import classNames from 'classnames';

type Props = {
  list: {
    valid: boolean;
    content: string;
    onClick?: () => void;
  }[];
  visible?: boolean;
  onClose?: () => void;
};

export default function ModalConditionWithdraw({
  list = [],
  visible,
  onClose,
}: Props) {
  return (
    <AppBottomSheet
      title="Điều kiện rút tiền"
      visible={visible}
      onClose={onClose}
      className="h-auto"
      closeBtn
      bodyClass="pt-0"
      headerClass="text-gray fs-4"
    >
      {list.map((item, index) => (
        <div
          className="d-flex align-items-center my-3"
          key={index}
          onClick={() => {
            onClose();
            item.onClick?.();
          }}
        >
          {item.valid ? (
            <SuccessIcon className="text-green" width={36} height={36} />
          ) : (
            <SuccessIcon width={36} color="#717791" height={36} />
          )}
          <p
            className={classNames('fw-bold ms-3', {
              'text-green': item.valid,
              'text-gray': !item.valid,
            })}
          >
            {item.content}
          </p>
        </div>
      ))}
    </AppBottomSheet>
  );
}
