import AppBottomSheet from '@/components/app/app-bottom-sheet';
import AppLoadMore from '@/components/app/app-loadmore';
import AppSearchBox from '@/components/app/app-search';
import { useState } from 'react';
import { debounce } from 'lodash';
import BrandBonusItem from '@/pages/search/components/brand-bonus-item';

function SearchSection({
  searchSellersByBrand,
  searchSellers = [],
  filterSearchSellers,
  brandInfo,
  loading,
  dispatch,
  className,
}) {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleClickSearch = () => {
    setVisible(true);
    searchSellersByBrand();
  };

  const onClose = () => {
    setVisible(false);
    setTimeout(() => {
      dispatch({
        type: 'brandBonusState/updateState',
        payload: {
          searchSellers: [],
          filterSearchSellers: {},
        },
      });
    }, 300);
  };

  const handleFuncSearch = debounce((value) => {
    setKeyword(value);
    return searchSellersByBrand(value);
  }, 300);

  return (
    <div className={className}>
      <AppSearchBox
        placeholder="Tìm kiếm thương hiệu"
        onClick={handleClickSearch}
      />
      <AppBottomSheet
        visible={visible}
        title="Tìm kiếm"
        onClose={onClose}
        closeBtn
        bodyClass="pt-0"
      >
        <AppSearchBox
          placeholder="Tìm kiếm thương hiệu"
          onChange={handleFuncSearch}
        />
        <AppLoadMore
          loading={loading}
          onLoadMore={() =>
            searchSellersByBrand(
              keyword,
              filterSearchSellers.nextPageToken,
              true,
            )
          }
          shouldLoadMore={!!filterSearchSellers.nextPageToken}
        >
          {searchSellers?.map((item) => {
            return (
              <BrandBonusItem brand={brandInfo} seller={item} key={item._id} />
            );
          })}
        </AppLoadMore>
      </AppBottomSheet>
    </div>
  );
}

export default SearchSection;
