import AppImage from '@/components/app/app-image';
import AppLoadMore from '@/components/app/app-loadmore';
import AppPage from '@/components/app/app-page';
import AppSpacer from '@/components/app/app-spacer';
import BrandBonusItem from '@/components/common/brand-bonus-item';
import { helper, navigator } from '@/utils';
import { useEffect } from 'react';
import { connect, useParams } from 'umi';
import ProductListBrandBonus from '../home/components/brand-bonus/components/product-brand-bonus';
import SearchSection from './components/search-section';
import Section from './components/section';

function BrandBonusDetailPage({ dispatch, loading, brandBonusState }) {
  const { brandId } = useParams<{ brandId: string }>();
  const {
    brandInfo,
    sellers,
    searchSellers,
    brandsNewest = [],
    products = [],
    filterSellers,
    filterSearchSellers,
    totalSellers,
    totalProducts,
  } = brandBonusState;

  const getBrandNewest = () => {
    dispatch({
      type: 'brandBonusState/getBrandNewest',
      payload: {
        brandId,
      },
    });
  };
  const getBrandInfo = () => {
    dispatch({
      type: 'brandBonusState/getBrandInfo',
      payload: {
        brandId,
      },
    });
  };
  const getProductByBrandBonus = () => {
    dispatch({
      type: 'brandBonusState/getProductByBrandBonus',
      payload: {
        brandId,
      },
    });
  };
  const getSellersByBrand = (pageToken?, isLoadMore?) => {
    dispatch({
      type: 'brandBonusState/getSellersByBrand',
      payload: {
        brandId,
        data: {
          pageToken,
          sort: 'bonus.percent:desc',
        },
        isLoadMore,
      },
    });
  };

  const searchSellersByBrand = (keyword?, pageToken?, isLoadMore?) => {
    dispatch({
      type: 'brandBonusState/searchSellersByBrand',
      payload: {
        brandId,
        data: {
          keyword,
          pageToken,
        },
        isLoadMore,
      },
    });
  };

  useEffect(() => {
    getBrandInfo();
    getBrandNewest();
    getProductByBrandBonus();
    getSellersByBrand();
    return () => {
      dispatch({
        type: 'brandBonusState/clearState',
      });
    };
  }, [brandId]);

  const sectionNotice = () => {
    return (
      <div className="d-flex my-3">
        <div className="w-50 me-1">
          <div className="bg-orange text-white p-2 pt-3 rounded-2 fw-bolder">
            Hoàn tiền không hạn mức
          </div>
          <p className="text-gray fs-8 mt-2">
            <span
              style={{
                color: brandInfo?.primaryColor,
              }}
            >
              Không hạn mức{' '}
            </span>
            hoàn tiền tối đa dành cho các đơn hàng thuộc chương trình
          </p>
        </div>
        <div className="w-50 ms-1">
          <div className="bg-primary text-white p-2 pt-3 rounded-2 fw-bolder">
            Liên tục đổi mới hằng tuần
          </div>
          <p className="text-gray fs-8 mt-2">
            <span
              style={{
                color: brandInfo?.primaryColor,
              }}
            >
              Không phân biệt
            </span>{' '}
            tiền thưởng cho khách mua lần đầu và các lần sau
          </p>
        </div>
      </div>
    );
  };

  const isLoading = loading.effects['brandBonusState/getBrandInfo'];

  // if (!brandInfo?.name) return <></>;

  return (
    <AppPage
      title={`Ngày vàng ${brandInfo?.name}`}
      className="bg-white px-3 pt-2"
      toolbarProps={{
        onBack: () => navigator.goBack(),
      }}
      loading={isLoading}
    >
      {brandInfo && (
        <>
          <SearchSection
            className=""
            brandInfo={brandInfo}
            searchSellers={searchSellers}
            filterSearchSellers={filterSearchSellers}
            searchSellersByBrand={searchSellersByBrand}
            loading={loading.effects['brandBonusState/searchSellersByBrand']}
            dispatch={dispatch}
          />
          {/* <AppSpacer size={5} className="bg-light mx-n3" /> */}
          {brandsNewest?.length > 0 && (
            <Section
              brand={brandInfo}
              mainTitle={'Mới nhất'}
              title={`${brandsNewest?.length} thương hiệu hoàn tiền`}
              className="my-2"
            >
              <div className="d-flex overflow-auto hide-scrollbar mx-n3 px-3 mt-2">
                {brandsNewest.map((seller) => {
                  return (
                    <AppImage
                      src={helper.getPhotoURL(seller.logo)}
                      width={72}
                      height={72}
                      className="object-fit-contain rounded-circle border-light me-2 border p-1"
                      key={seller._id}
                      onClick={() =>
                        helper.navigateToRedirect(
                          brandInfo._id,
                          seller.url,
                          true,
                        )
                      }
                    />
                  );
                })}
              </div>
            </Section>
          )}
          <AppSpacer size={5} className="bg-light mx-n3" />
          {totalProducts > 0 && (
            <>
              <Section
                brand={brandInfo}
                mainTitle={'Mới nhất'}
                title={'thương hiệu hoàn tiền'}
                className="my-2"
              >
                <ProductListBrandBonus
                  brand={brandInfo}
                  total={totalProducts}
                  productList={products}
                  classNameViewMore="border border-light"
                />
              </Section>
              <AppSpacer size={5} className="bg-light mx-n3" />
            </>
          )}
          <Section
            brand={brandInfo}
            mainTitle={`Ngày vàng ${brandInfo?.name} - Tất cả`}
            title={`${totalSellers} thương hiệu`}
            className="my-2"
          >
            <AppLoadMore
              loading={loading.effects['brandBonusState/getSellersByBrand']}
              onLoadMore={() =>
                getSellersByBrand(filterSellers?.nextPageToken, true)
              }
              shouldLoadMore={!!filterSellers?.nextPageToken}
            >
              {sellers?.map((item, index) => {
                return (
                  <>
                    <BrandBonusItem
                      onClick={() =>
                        helper.navigateToRedirect(brandInfo._id, item.url, true)
                      }
                      brand={brandInfo}
                      seller={item}
                      key={item._id}
                    />
                    {(index === 5 ||
                      (totalSellers < 6 && totalSellers === index + 1)) &&
                      sectionNotice()}
                  </>
                );
              })}
            </AppLoadMore>
          </Section>
        </>
      )}
    </AppPage>
  );
}

export default connect(({ brandBonusState, loading }: any) => ({
  brandBonusState,
  loading,
}))(BrandBonusDetailPage);
