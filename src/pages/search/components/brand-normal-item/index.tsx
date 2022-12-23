import AppImage from '@/components/app/app-image';
import BrandNormalLine from '@/components/common/brand-normal-line';
import { helper } from '@/utils';

function BrandByCategoryItem({ item }) {
  const { category, brands, totalBrand = 0 } = item;
  return (
    <div className="bg-light rounded-3 p-3 mb-3">
      <div className="d-flex align-content-center justify-content-start mb-3">
        <div
          style={{ height: 48, width: 48 }}
          className="d-flex align-items-center justify-content-center p-2 rounded-circle bg-white"
        >
          <AppImage
            src={helper.getPhotoURL(category.logo)}
            className="w-100 h-100 object-fit-contain"
          />
        </div>
        <div className="ms-2 flex-column d-flex justify-content-center">
          <p className="text-uppercase fs-9 text-muted">
            {totalBrand} thương hiệu hoàn tiền
          </p>
          <p className="fs-6 text-gray fw-bolder">{category.name}</p>
        </div>
      </div>
      {brands.map((item) => {
        return <BrandNormalLine item={item} key={item._id} />;
      })}
    </div>
  );
}

export default BrandByCategoryItem;
