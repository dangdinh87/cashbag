import AppButton from '@/components/app/app-button';
import AppImage from '@/components/app/app-image';
import AppPage from '@/components/app/app-page';
import ScrollToTopOnMount from '@/components/app/scroll-to-top';
import Section from '@/components/common/section';
import { formatter, helper, navigator } from '@/utils';
import { useContextRequestPhone } from '@/wrappers/request-phone';
import classNames from 'classnames';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect, useParams } from 'umi';

function BrandDetailPage({ dispatch, brandDetailState, loading }) {
  const { handleRequestPhone } = useContextRequestPhone();
  const { brandId } = useParams<{ brandId: string }>();
  const { brandInfo, categories = [], guides = [] } = brandDetailState;
  const getBrandInfo = () => {
    dispatch({
      type: 'brandDetailState/getBrandInfo',
      payload: {
        brandId,
      },
    });
  };

  const getCategoriesByBrand = () => {
    dispatch({
      type: 'brandDetailState/getCategoriesByBrand',
      payload: {
        brandId,
      },
    });
  };

  const getGuidesByBrand = () => {
    dispatch({
      type: 'brandDetailState/getGuidesByBrand',
      payload: {
        brandId,
      },
    });
  };

  useEffect(() => {
    helper.getWindow()?.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    getBrandInfo();
    getCategoriesByBrand();
    getGuidesByBrand();
    return () => {
      dispatch({
        type: 'brandDetailState/clearState',
      });
    };
  }, []);

  if (!brandId || !brandInfo?.name) return <></>;

  const getMinHeight = (size: any) => {
    const widthWidow = screen?.width;
    return (widthWidow * size?.height) / size?.width;
  };

  const handleClickBuy = () => {
    handleRequestPhone(() =>
      helper.navigateToRedirect(brandInfo._id, brandInfo?.affiliate.url),
    );
  };

  return (
    // <ScrollToTopOnMount trigger={location.pathname}>
    <AppPage title={brandInfo?.name} className="p-3">
      <div className="rounded-2">
        <div className="w-100 position-relative">
          <AppImage
            src={helper.getPhotoURL(brandInfo?.cover)}
            className="w-100 rounded-top h-auto object-fit-cover"
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
        <div className="d-flex bg-white justify-content-evenly align-items-center p-4">
          {brandInfo.statistic?.transactionTotal > 0 && (
            <>
              <div className="text-center">
                <p className="text-primary fs-6 fw-bolder">
                  {formatter.formatShortNumber(
                    brandInfo.statistic.transactionTotal,
                  )}
                </p>
                <p className="fs-8 text-gray">Đơn hàng</p>
              </div>
              <div className="text-center">
                <p className="text-primary fs-6 fw-bolder">
                  {formatter.formatShortNumberCash(
                    brandInfo.statistic.cashbackTotal,
                  )}
                </p>
                <p className="fs-8 text-gray">Tiền đã hoàn</p>
              </div>
            </>
          )}
        </div>
        <AppButton
          showNext
          className="bg-primary w-100 rounded-bottom rounded-0 py-2c"
          onClick={() => {
            handleClickBuy();
          }}
        >
          Mua ngay
        </AppButton>
      </div>
      {categories.length > 0 && (
        <Section
          className="mt-4"
          brand={brandInfo}
          mainTitle={'DANH MỤC HOÀN TIỀN'}
          title={`${categories.length} danh mục hoàn tiền`}
        >
          <div
            className="my-2 mx-n3 px-3 overflow-scroll hide-scrollbar d-flex"
            style={{ height: 105 }}
          >
            {categories?.map((element, index) => {
              const isLast = index === categories?.length - 1;
              return (
                <div
                  key={element._id}
                  className={classNames(
                    'p-2 bg-white rounded-2 flex-shrink-0',
                    {
                      'me-2': !isLast,
                    },
                  )}
                  style={{ width: 105 }}
                  onClick={() =>
                    navigator.pushPath(
                      `/category/${brandInfo._id}/${element._id}`,
                    )
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
          </div>
          {/* <AppButton
              showNext
              className="w-100 text-gray bg-white py-2 fs-7 rounded-2 fw-bolder mt-2 border-0"
            >
              Xem tất cả
            </AppButton> */}
        </Section>
      )}
      <Section
        className="mt-4"
        brand={brandInfo}
        mainTitle={'Hoàn Tiền Như Thế Nào'}
        title={'Đọc kỹ trước khi mua sắm'}
      >
        {guides.map((guide) => {
          return (
            <div className="mt-3" key={guide._id}>
              <p className="text-primary fw-bolder fs-8 mb-2">{guide.desc}</p>
              <ListGroup>
                {guide.items.map((item) => {
                  return (
                    <ListGroup.Item key={item._id}>
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
    </AppPage>
    // </ScrollToTopOnMount>
  );
}

export default connect(({ brandDetailState, loading }: any) => ({
  brandDetailState,
  loading,
}))(BrandDetailPage);
