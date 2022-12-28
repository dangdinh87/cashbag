import AppBottomSheet from '@/components/app/app-bottom-sheet';
import AppButton from '@/components/app/app-button';
import AppLoadMore from '@/components/app/app-loadmore';
import { ArrowRightIcon, GridIcon } from '@/configs/assets';
import classnames from 'classnames';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'umi';
import ProductItem from '../product-item';
import ProductListWrap from '../product-list-popup';

function ProductListBrandBonus({
  productList = [],
  total,
  brand,
  classNameViewMore,
}) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const loading = useSelector((state: any) => state.loading);
  const { products, filterProducts } = useSelector(
    (state: any) => state.brandBonusState,
  );
  const dispatch = useDispatch();
  const getProductByBrandBonus = (pageToken?, isLoadMore = false) => {
    dispatch({
      type: 'brandBonusState/getProductByBrandBonus',
      payload: {
        data: { pageToken },
        brandId: brand._id,
        isLoadMore,
      },
    });
  };

  const viewMoreProduct = () => {
    getProductByBrandBonus('', false);
    setVisiblePopup(true);
  };
  const onCloseBottomSheet = () => {
    setVisiblePopup(false);
    // dispatch({
    //   type: 'brandBonusState/updateState',
    //   payload: {
    //     products: [],
    //     filterProducts: {},
    //   },
    // });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <p className="text-gray fw-bold text-uppercase fs-7">Sản Phẩm ưu đãi</p>
        <p className="fs-8" style={{ color: brand?.primaryColor }}>
          {total} sản phẩm
        </p>
      </div>
      <Row className="w-auto flex-nowrap overflow-scroll hide-scrollbar mx-n3 px-3 mt-2">
        {productList.map((product, index) => {
          return (
            <div
              key={product._id}
              style={{ width: 160 }}
              className={classnames('px-0 me-2')}
            >
              <ProductItem product={product} className={undefined} />
            </div>
          );
        })}
        <ViewMoreProductList
          brand={brand}
          classNameViewMore={classNameViewMore}
          onCLick={viewMoreProduct}
        />
      </Row>
      <AppButton
        onClick={viewMoreProduct}
        showNext
        className={classnames(
          classNameViewMore,
          'w-100 text-gray bg-white py-2 fs-7 rounded-2 fw-bolder mt-2',
        )}
      >
        Xem tất cả
      </AppButton>

      <AppBottomSheet
        onClose={onCloseBottomSheet}
        visible={visiblePopup}
        title="Sản phẩm ưu đãi"
        closeBtn
      >
        <AppLoadMore
          onLoadMore={() =>
            getProductByBrandBonus(filterProducts?.nextPageToken, true)
          }
          shouldLoadMore={!!filterProducts?.nextPageToken}
          loading={loading.effects['brandBonusState/getProductByBrandBonus']}
        >
          <ProductListWrap products={products} />
        </AppLoadMore>
      </AppBottomSheet>
    </>
  );
}

export default ProductListBrandBonus;

const ViewMoreProductList = ({ brand, classNameViewMore, onCLick = null }) => {
  return (
    <div
      onClick={onCLick}
      style={{
        width: 160,
        color: brand?.primaryColor,
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
