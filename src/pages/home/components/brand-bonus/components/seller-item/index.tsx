import AppImage from '@/components/app/app-image';
import { helper } from '@/utils';

const SellerItem = ({ seller, primaryColor, viewDetailBrand }) => {
  return (
    <div
      style={{ width: 105, padding: 6 }}
      className="bg-white rounded-1 me-2 py-3 d-flex flex-column justify-content-center align-items-center"
      onClick={() => viewDetailBrand(seller._id)}
    >
      <div
        style={{ width: 72, height: 72 }}
        className="p-1  rounded-circle border border-1 border-gray"
      >
        <AppImage
          src={helper.getPhotoURL(seller.logo)}
          className="w-100 h-100 object-fit-contain"
        />
      </div>
      <div style={{ color: primaryColor }} className="mt-2">
        <p className="fs-8">Hoàn tiền</p>
        <p className="fs-6 fw-bolder"> {seller.bonus.text}</p>
      </div>
    </div>
  );
};

export default SellerItem;
