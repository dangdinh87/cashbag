import AppImage from '@/components/app/app-image';
import AppSpacer from '@/components/app/app-spacer';
import { ArrowRightIcon, CalendarIcon } from '@/configs/assets';
import { serviceBrand } from '@/services';
import { helper } from '@/utils';
import { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ProductListBrandBonus from './components/product-brand-bonus';
import SellerItem from './components/seller-item';
import ViewMoreSeller from './components/view-more';

function BrandBonusItem({ brand, viewMoreBrand, viewDetailBrand }) {
  const [productList, setProductList] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { products = [], total },
      } = await serviceBrand.getProductByBrandBonus(
        {
          order: 'desc',
        },
        brand._id,
      );
      setProductList({ products, total });
    };
    fetchData();
  }, [brand._id]);

  return (
    <div className="mb-1 p-3 bg-light rounded-2">
      <div className="d-flex align-content-center justify-content-start mb-3">
        <div
          style={{ backgroundColor: brand.primaryColor, height: 48, width: 48 }}
          className="d-flex align-items-center justify-content-center p-2 rounded-circle"
        >
          <CalendarIcon />
        </div>
        <div className="ms-2 flex-column d-flex justify-content-center">
          <p className="text-uppercase fs-9 text-muted">
            {brand.totalSellers} nhãn hàng tham dự
          </p>
          <p className="fs-6 text-gray fw-bolder">Ngày vàng thương hiệu</p>
        </div>
      </div>
      <div
        style={{ backgroundColor: brand.primaryColor }}
        className="p-3 rounded-3 shadow-lg"
      >
        <AppImage
          style={{ maxHeight: 40, maxWidth: 106 }}
          src={helper.getPhotoURL(brand.brandBonusLogo, 'md')}
          className="object-fit-contain"
        />
        <Row className="mx-n4 px-4 position-relative flex-nowrap overflow-scroll hide-scrollbar h-100 mt-3">
          {[...brand.sellers]?.slice(0, 6)?.map((seller) => {
            return (
              <SellerItem
                viewDetailBrand={viewDetailBrand}
                seller={seller}
                primaryColor={brand.primaryColor}
              />
            );
          })}
          <ViewMoreSeller
            brand={brand}
            total={brand.totalSellers - 6}
            viewMoreBrand={viewMoreBrand}
          />
        </Row>
        <div
          className="d-flex justify-content-end text-white text-uppercase fw-bolder fs-7 mt-3"
          onClick={viewMoreBrand}
        >
          Xem tất cả <ArrowRightIcon width={20} height={20} />
        </div>
      </div>
      {productList.total > 0 && (
        <div className="mt-2">
          <AppSpacer className="bg-gray-300 mx-n3 mb-2" size={1} />
          <ProductListBrandBonus productList={productList} brand={brand} />
        </div>
      )}
    </div>
  );
}

export default BrandBonusItem;
