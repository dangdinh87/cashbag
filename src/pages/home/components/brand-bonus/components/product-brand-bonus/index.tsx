import AppButton from '@/components/app/app-button';
import { ArrowRightIcon, GridIcon } from '@/configs/assets';
import classnames from 'classnames';
import { Row } from 'react-bootstrap';
import ProductItem from '../product-item';

function ProductListBrandBonus({ productList, brand, classNameViewMore }) {
  const { products = [], total } = productList;
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p className="text-gray fw-bold text-uppercase fs-7">Sản Phẩm ưu đãi</p>
        <p className="fs-8" style={{ color: brand.primaryColor }}>
          {total} sản phẩm
        </p>
      </div>
      <Row className="w-auto flex-nowrap overflow-scroll hide-scrollbar mx-n3 px-3 mt-2">
        {products.map((product, index) => {
          return (
            <div
              key={product._id}
              style={{ width: 160 }}
              className={classnames('px-0 me-2')}
            >
              <ProductItem product={product} />
            </div>
          );
        })}
        <ViewMoreProductList
          brand={brand}
          classNameViewMore={classNameViewMore}
        />
      </Row>
      <AppButton
        showNext
        className={classnames(
          classNameViewMore,
          'w-100 text-gray bg-white py-2 fs-7 rounded-2 fw-bolder mt-2',
        )}
      >
        Xem tất cả
      </AppButton>
    </>
  );
}

export default ProductListBrandBonus;

const ViewMoreProductList = ({ brand, classNameViewMore }) => {
  return (
    <div
      style={{
        width: 160,
        color: brand.primaryColor,
      }}
      className={classnames(
        classNameViewMore,
        'bg-white rounded-1 d-flex flex-column justify-content-center align-items-center',
      )}
    >
      <GridIcon width={40} />
      <div className="d-flex align-items-center justify-content-center">
        <p className="ms-1 fs-7 fw-bolder">Xem tất cả</p>
        <ArrowRightIcon />
      </div>
    </div>
  );
};
