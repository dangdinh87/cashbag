import AppImage from '@/components/app/app-image';
import CommonEmpty from '@/components/empty/common-empty';
import { AssetConst } from '@/configs';

function EmptyTransaction() {
  return (
    <CommonEmpty
      className="text-gray mt-5"
      icon={<AppImage src={AssetConst.image.emptyOrder} />}
      title="Chưa có đơn hàng nào được ghi nhận"
      message="Đơn hàng có hoàn tiền của bạn sẽ hiện ra ở đây sau khi mua sắm online"
    />
  );
}

export default EmptyTransaction;
