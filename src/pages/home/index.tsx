import AppCarousel from '@/components/app/app-carousel';
import AppImage from '@/components/app/app-image';
import Header from '@/components/app/header';
import zalo from '@/services/zalo';
import { helper, navigator } from '@/utils';
import { useEffect } from 'react';
import { Ratio } from 'react-bootstrap';
import { connect } from 'umi';
import BrandBonusSection from './components/brand-bonus';
import BrandByCategorySection from './components/brand-by-categories';

function HomePage({ dispatch, homeState, loading }) {
  const { homeBanners = [], brandBonus = [], brandByCategory = [] } = homeState;

  const getNews = () => {
    dispatch({
      type: 'homeState/getHomeBanners',
      payload: {
        data: {
          // type: 'primary',
        },
      },
    });
  };

  const getBrandBonus = () => {
    dispatch({
      type: 'homeState/getBrandBonus',
    });
  };

  const getBrandByCategories = () => {
    dispatch({
      type: 'homeState/getBrandByCategory',
    });
  };

  useEffect(() => {
    // if (
    //   homeBanners.length > 0 ||
    //   brandBonus.length > 0 ||
    //   brandByCategory.length > 0
    // )
    //   return;
    getNews();
    getBrandBonus();
    getBrandByCategories();
  }, []);

  const homeBannerImages = homeBanners
    .sort(helper.sortByValue('order'))
    .map((item: any) => {
      const firstPhoto = homeBanners[0].photo;
      const photo = item.photo;
      return (
        <Ratio
          key={item._id}
          className="rounded-3 mb-4 overflow-hidden"
          aspectRatio={firstPhoto.sizes.md.height / firstPhoto.sizes.md.width}
        >
          <AppImage
            className="w-100 h-100 object-fit-cover"
            src={helper.getPhotoURL(photo, 'md')}
          />
        </Ratio>
      );
    });

  const viewDetailBrand = () => {};

  const brandBonusList = brandBonus.map((brand: any) => {
    return (
      <BrandBonusSection
        key={brand._id}
        brand={brand}
        viewDetailBrand={viewDetailBrand}
      />
    );
  });

  const brandByCategoryList = brandByCategory
    .sort(helper.sortByValue('order'))
    .map((item) => {
      return <BrandByCategorySection key={item._id} item={item} />;
    });

  const handleClickSearch = () => navigator.pushPath('/search');

  return (
    <div className="w-100 h-100">
      <Header onClickSearch={handleClickSearch} className="px-3" />
      <div className="px-3">
        <AppCarousel
          carouselProps={{
            controls: false,
          }}
          className="mt-2"
          content={homeBannerImages}
        />
      </div>
      {brandBonusList}
      {brandByCategoryList}
    </div>
  );
}

export default connect(({ homeState, loading }: any) => ({
  homeState,
  loading,
}))(HomePage);
