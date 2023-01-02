import AppBottomSheet from '@/components/app/app-bottom-sheet';
import AppImage from '@/components/app/app-image';
import CategoryItem from '@/components/common/category-item';
import { ArrowRightIcon, GridIcon } from '@/configs/assets';
import { formatter, helper, navigator } from '@/utils';
import classnames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'umi';

function BrandByCategoryItem({ item }) {
  const [visible, setVisible] = useState(false);
  const { categories } = useSelector((state: any) => state.brandDetailState);
  const [brandSelected, setSelected] = useState<any>({});
  const dispatch = useDispatch();
  const getCategoriesByBrand = (brandId) => {
    dispatch({
      type: 'brandDetailState/getCategoriesByBrand',
      payload: {
        brandId,
      },
    });
  };

  const handleShowListCategories = (brand) => {
    setSelected(brand);
    setVisible(true);
    getCategoriesByBrand(brand._id);
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
        const { brand } = item;
        const isCashback = brand?.statistic?.cashbackTotal > 0;
        return (
          <div
            className="my-2 mx-n3 px-3 overflow-scroll hide-scrollbar d-flex"
            style={{ height: 105 }}
          >
            <div
              className="rounded-2 d-flex justify-content-between align-items-center h-100 bg-white flex-shrink-0 p-2 me-2"
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
                    {formatter.formatShortNumberCash(
                      brand?.statistic?.cashbackTotal,
                    )}{' '}
                    tiền đã hoàn
                  </p>
                )}
              </div>
              <ArrowRightIcon className="text-muted" />
            </div>
            {item?.categories?.map((element, index) => {
              const isLast = index === item?.categories?.length - 1;
              return (
                <div
                  key={element._id}
                  className={classnames(
                    'p-2 bg-white rounded-2 flex-shrink-0',
                    { 'me-2': !isLast },
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
            {item?.categories?.length > 1 && (
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
          </div>
        );
      })}
      <AppBottomSheet
        title={
          <AppImage src={helper.getPhotoURL(brandSelected?.logo)} width="30%" />
        }
        headerClass="pb-2 pt-2"
        onClose={() => setVisible(false)}
        closeBtn
        visible={visible}
        bodyClass="pt-1"
      >
        {categories?.map((category) => (
          <CategoryItem
            category={category}
            key={category._id}
            onClick={() =>
              navigator.pushPath(
                `/category/${brandSelected._id}/${category._id}`,
              )
            }
          />
        ))}
      </AppBottomSheet>
    </div>
  );
}

export default BrandByCategoryItem;
