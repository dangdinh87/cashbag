import AppBottomSheet from '@/components/app/app-bottom-sheet';
import AppButton from '@/components/app/app-button';
import AppImage from '@/components/app/app-image';
import AppLoadMore from '@/components/app/app-loadmore';
import BrandNormalLine from '@/components/common/brand-normal-line';
import { helper } from '@/utils';
import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'umi';

function BrandByCategoryItem({ item }) {
  const [visibleListBrand, setVisibleListBrand] = useState(false);
  const dispatch = useDispatch();
  const { loading, homeState } = useSelector((state: any) => state);
  const { listBrandByCategory, listBrandByCategoryFilter } = homeState;
  // const { handleBottomSheet } = useBottomSheet();
  const getCategoriesByBrand = (brandId) => {
    dispatch({
      type: 'brandDetailState/getCategoriesByBrand',
      payload: {
        brandId,
      },
    });
  };

  const getListBrandByCategory = (
    categoryID = '',
    pageToken?,
    isLoadMore = false,
  ) => {
    dispatch({
      type: 'homeState/getListBrandByCategory',
      payload: {
        data: {
          pageToken,
        },
        categoryID,
        isLoadMore,
      },
    });
  };

  const handleViewMore = (categoryID) => {
    setVisibleListBrand(true);
    getListBrandByCategory(categoryID);
  };

  const { category, brands, totalBrand } = item;
  return (
    <div className="bg-light rounded-2 p-3 mb-3">
      <div className="d-flex align-content-center justify-content-start mb-3">
        <div
          style={{ height: 48, width: 48 }}
          className="d-flex align-items-center justify-content-center p-2 rounded-circle bg-primary"
        >
          <AppImage
            src={helper.getPhotoURL(category.logo)}
            className="w-100 h-100 object-fit-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
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
        return (
          <BrandNormalLine
            itemClassName={'border border-light'}
            item={item}
            key={item._id}
          />
        );
      })}

      <AppButton
        onClick={() => handleViewMore(category._id)}
        showNext
        className={classnames(
          'w-100 text-gray bg-white py-2 fs-7 rounded-2 fw-bolder mt-2 border-0',
        )}
      >
        Xem tất cả
      </AppButton>
      <AppBottomSheet
        title={category?.name}
        headerClass="pb-2 pt-2"
        onClose={() => {
          setVisibleListBrand(false);
        }}
        closeBtn
        visible={visibleListBrand}
        bodyClass="pt-1"
      >
        <AppLoadMore
          onLoadMore={() => {
            getListBrandByCategory(
              category._id,
              listBrandByCategoryFilter?.nextPageToken,
              true,
            );
          }}
          loading={loading.effects['homeState/getListBrandByCategory']}
          shouldLoadMore={!!listBrandByCategoryFilter.nextPageToken}
        >
          {listBrandByCategory?.map((item) => {
            return (
              <BrandNormalLine
                itemClassName={'border border-light'}
                item={item}
                key={item._id}
              />
            );
          })}
        </AppLoadMore>
      </AppBottomSheet>
    </div>
  );
}

export default BrandByCategoryItem;
