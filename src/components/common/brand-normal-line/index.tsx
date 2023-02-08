import AppBottomSheet from '@/components/app/app-bottom-sheet';
import AppImage from '@/components/app/app-image';
import { ArrowRightIcon, GridIcon } from '@/configs/assets';
import { formatter, helper, navigator } from '@/utils';
import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import CategoryItem from '../category-item';

function BrandNormalLine({ item, itemClassName }) {
  const [visibleListCategory, setVisibleListCategory] = useState(false);
  const dispatch = useDispatch();
  const { categories: moreCategories } = useSelector(
    (state: any) => state.brandDetailState,
  );

  const { brand, categories } = item;
  const isCashback = brand?.statistic?.cashbackTotal > 0;

  const getCategoriesByBrand = (brandId) => {
    dispatch({
      type: 'brandDetailState/getCategoriesByBrand',
      payload: {
        brandId,
      },
    });
  };

  const handleShowListCategories = (brand) => {
    setVisibleListCategory(true);
    getCategoriesByBrand(brand._id);
  };

  return (
    <div
      className="my-2 mx-n3 px-3 overflow-scroll hide-scrollbar d-flex"
      style={{ height: 105 }}
    >
      <div
        className={classnames(
          itemClassName,
          'rounded-2 d-flex justify-content-between align-items-center h-100 bg-white flex-shrink-0 p-2 me-2',
        )}
        style={{ width: '66%' }}
        onClick={() => navigator.pushPath(`/brand/${brand._id}`)}
      >
        <div
          className={classnames(
            { 'justify-content-center': !isCashback },
            { 'justify-content-between': isCashback },
            'd-flex flex-column  h-100',
          )}
        >
          {isCashback && <div style={{ height: 15 }} />}
          <AppImage
            src={helper.getPhotoURL(brand?.logo)}
            className="object-fit-contain"
            style={{
              maxWidth: 120,
              maxHeight: 50,
            }}
          />
          {isCashback && (
            <p className="text-gray fs-9">
              {formatter.formatShortNumberCash(brand?.statistic?.cashbackTotal)}{' '}
              tiền đã hoàn
            </p>
          )}
        </div>
        <ArrowRightIcon className="text-muted" />
      </div>
      {categories?.map((element, index) => {
        const isLast = index === categories?.length - 1;
        return (
          <div
            key={element._id}
            className={classnames(
              'p-2 bg-white rounded-2 flex-shrink-0',
              {
                'me-2': !isLast,
              },
              itemClassName,
            )}
            style={{ width: 105 }}
            onClick={() =>
              navigator.pushPath(`/category/${brand._id}/${element._id}`)
            }
          >
            <div className="d-flex flex-column justify-content-between h-100">
              <p className="fs-8 mb-auto text-gray lh-sm max-line__ellipses">
                {element.name}
              </p>
              <div>
                <p className="text-primary fs-8">Hoàn tiền</p>
                <p className="text-primary fs-6 fw-bolder ">
                  {element.cashbackText}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      {categories?.length > 1 && (
        <div
          onClick={() => handleShowListCategories(brand)}
          style={{
            width: 105,
            height: 105,
          }}
          className={classnames(
            'flex-shrink-0 bg-primary rounded-2 d-flex flex-column justify-content-center align-items-center ms-2',
          )}
        >
          <p className="ms-1 fs-8 text-white mb-1">Xem tất cả</p>
          <GridIcon width={40} height={40} className="text-white" />
        </div>
      )}
      <AppBottomSheet
        title={<AppImage src={helper.getPhotoURL(brand?.logo)} width="30%" />}
        headerClass="pb-2 pt-2"
        onClose={() => setVisibleListCategory(false)}
        closeBtn
        visible={visibleListCategory}
        bodyClass="pt-1"
      >
        {moreCategories?.map((category) => (
          <CategoryItem
            category={category}
            key={category._id}
            onClick={() =>
              navigator.pushPath(`/category/${brand._id}/${category._id}`)
            }
          />
        ))}
      </AppBottomSheet>
    </div>
  );
}

export default BrandNormalLine;
