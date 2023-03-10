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
            Ho??n ti???n kh??ng h???n m???c
          </div>
          <p className="text-gray fs-8 mt-2">
            <span
              style={{
                color: brandInfo?.primaryColor,
              }}
            >
              Kh??ng h???n m???c{' '}
            </span>
            ho??n ti???n t???i ??a d??nh cho c??c ????n h??ng thu???c ch????ng tr??nh
          </p>
        </div>
        <div className="w-50 ms-1">
          <div className="bg-primary text-white p-2 pt-3 rounded-2 fw-bolder">
            Li??n t???c ?????i m???i h???ng tu???n
          </div>
          <p className="text-gray fs-8 mt-2">
            <span
              style={{
                color: brandInfo?.primaryColor,
              }}
            >
              Kh??ng ph??n bi???t
            </span>{' '}
            ti???n th?????ng cho kh??ch mua l???n ?????u v?? c??c l???n sau
          </p>
        </div>
      </div>
    );
  };

  if (!brandInfo?.name) return <></>;

  return (
    <AppPage
      title={`Ng??y v??ng ${brandInfo?.name}`}
      className="bg-white px-3"
      toolbarProps={{
        onBack: () => navigator.goBack(),
      }}
    >
      <SearchSection
        className="my-2"
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
          mainTitle={'M???i nh???t'}
          title={`${brandsNewest?.length} th????ng hi???u ho??n ti???n`}
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
                    helper.navigateToRedirect(brandInfo._id, seller.url, true)
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
            mainTitle={'M???i nh???t'}
            title={'th????ng hi???u ho??n ti???n'}
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
        mainTitle={`Ng??y v??ng ${brandInfo?.name} - T???t c???`}
        title={`${totalSellers} th????ng hi???u`}
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
    </AppPage>
  );
}

export default connect(({ brandBonusState, loading }: any) => ({
  brandBonusState,
  loading,
}))(BrandBonusDetailPage);
