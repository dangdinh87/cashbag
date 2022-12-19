import AppImage from '@/components/app/app-image';
import { helper } from '@/utils';
import { Col, Ratio, Row } from 'react-bootstrap';

function ProductListBrandBonus({ productList, brand }) {
  const { products = [], total } = productList;
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <p className="text-gray fw-bold text-uppercase fs-7">Sản Phẩm ưu đãi</p>
        <p className="fs-8" style={{ color: brand.primaryColor }}>
          {total} sản phẩm
        </p>
      </div>
      <Row className="w-auto flex-nowrap overflow-scroll hide-scrollbar mx-n3 px-3">
        {products.map((product) => {
          return (
            <Col
              key={product._id}
              style={{ width: 160 }}
              className="w-100 px-0"
            >
              <ProductItemBrandBonus product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default ProductListBrandBonus;

const ProductItemBrandBonus = ({ product }) => {
  return (
    <div className="p-2 w-100">
      {/* <Ratio aspectRatio={'1x1'}> */}
        <AppImage
          src={helper.getPhotoURL(product.photo)}
          className="w-100"
          width={150}
        />
      {/* </Ratio> */}
    </div>
  );
};
