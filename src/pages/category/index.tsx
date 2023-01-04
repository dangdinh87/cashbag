import AppButton from '@/components/app/app-button';
import AppImage from '@/components/app/app-image';
import AppPage from '@/components/app/app-page';
import AppSpacer from '@/components/app/app-spacer';
import Section from '@/components/common/section';
import { helper } from '@/utils';
import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect, useParams } from 'umi';

function CategoryDetailPage({
  dispatch,
  categoryDetailState,
  brandDetailState,
  loading,
}) {
  const { categoryId, brandId } = useParams<any>();
  const { category } = categoryDetailState;
  const { brandInfo, guides } = brandDetailState;
  const getDetailCategoryBrand = () => {
    dispatch({
      type: 'categoryDetailState/getDetailCategoryBrand',
      payload: {
        categoryId,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: 'brandDetailState/getBrandInfo',
      payload: {
        brandId,
      },
    });

    dispatch({
      type: 'brandDetailState/getGuidesByBrand',
      payload: {
        brandId,
      },
    });

    getDetailCategoryBrand();
    return () => {
      dispatch({
        type: 'categoryDetailState/clearState',
      });
      dispatch({
        type: 'brandDetailState/clearState',
      });
    };
  }, []);

  if (!categoryId || !brandId || !category || !brandInfo?.name) return <></>;

  const getMinHeight = (size: any) => {
    const widthWidow = screen?.width;
    return (widthWidow * size?.height) / size?.width;
  };

  return (
    <AppPage title={brandInfo?.name} className="p-3">
      <div className="rounded-2 overflow-hidden position-relative">
        <div className="w-100 position-relative">
          <AppImage
            src={helper.getPhotoURL(brandInfo?.cover)}
            className="w-100 object-fit-cover"
            style={{
              minHeight: getMinHeight(
                brandInfo?.cover?.sizes?.md || brandInfo?.cover?.sizes?.sm,
              ),
            }}
          />
          <div
            className="position-absolute top-100 start-50 translate-middle bg-white px-3 py-2 rounded-2"
            style={{ zIndex: 1, width: '40%' }}
          >
            <AppImage
              src={helper.getPhotoURL(brandInfo.logo)}
              className="w-100"
            />
          </div>
        </div>
        <div className="fs-5 text-gray text-center px-4 fw-bolder pt-4 pb-3 bg-white">
          {category?.name}
        </div>

        <div className="d-flex bg-white justify-content-evenly">
          {category.cashbackInfo?.length > 0 ? (
            <>
              {category.cashbackInfo.map((item, index) => {
                const isLast = category.cashbackInfo.length - 1 === index;
                return (
                  <React.Fragment key={item.cashback}>
                    <div className="text-center w-50 py-3 border-top border-light">
                      <p className="text-primary fs-6 fw-bolder">
                        {item.cashback}
                      </p>
                      <p className="fs-8 text-gray">{item.desc}</p>
                    </div>
                    {!isLast && (
                      <AppSpacer
                        direction="horizontal"
                        size={1}
                        className="h-auto bg-light"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <p className="text-primary fs-6 fw-bolder pb-3">
              {category.cashbackText}
            </p>
          )}
        </div>
      </div>
      <Section
        className="mt-3"
        brand={brandInfo}
        mainTitle={'Hoàn Tiền Như Thế Nào'}
        title={'Đọc kỹ trước khi mua sắm'}
      >
        {guides.map((guide) => {
          return (
            <div className="mt-3" key={guide._id}>
              <p className="text-primary fw-bolder fs-8 mb-2">{guide.desc}</p>
              <ListGroup>
                {guide.items.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <AppImage
                          src={helper.getPhotoURL(item.icon)}
                          width="20"
                          height="20"
                          className="flex-shrink-0"
                        />
                        <p className="fs-8 text-gray ms-3">{item.desc}</p>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          );
        })}
      </Section>
      <AppSpacer size={60} />
      <AppButton
        showNext
        className="bg-primary w-100 rounded-0 py-2c position-fixed bottom-0 start-0"
        style={{ zIndex: 100 }}
      >
        Mua ngay
      </AppButton>
    </AppPage>
  );
}

export default connect(
  ({ categoryDetailState, brandDetailState, loading }: any) => ({
    categoryDetailState,
    brandDetailState,
    loading,
  }),
)(CategoryDetailPage);
