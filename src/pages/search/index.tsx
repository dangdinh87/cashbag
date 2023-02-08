import AppLoadMore from '@/components/app/app-loadmore';
import AppPage from '@/components/app/app-page';
import AppSearchBox from '@/components/app/app-search';
import AppSpacer from '@/components/app/app-spacer';
import AppSwitchSelect from '@/components/app/app-switch-select';
import BrandBonusItem from '@/components/common/brand-bonus-item';
import BrandNormalLine from '@/components/common/brand-normal-line';
import { helper } from '@/utils';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

enum SearchTypeEnum {
  BrandBonus,
  BrandNormal,
}

function SearchPage({ dispatch, loading, searchState }) {
  const { listBrandBonus, filterListBrandBonus, filterListBrand, listBrand } =
    searchState;
  const [searchType, setSearchType] = useState(SearchTypeEnum.BrandBonus);
  const [keyword, setKeyword] = useState();
  const optionsFilter = [
    {
      value: SearchTypeEnum.BrandBonus,
      label: 'Thương hiệu ngày vàng',
    },
    {
      value: SearchTypeEnum.BrandNormal,
      label: 'Thương hiệu thường',
    },
  ];
  const getBrandsBonus = (
    keyword?: string,
    pageToken?: string,
    isLoadMore?: boolean,
  ) => {
    dispatch({
      type: 'searchState/getBrandsBonus',
      payload: {
        data: {
          keyword,
          pageToken,
        },
        isLoadMore,
      },
    });
  };

  const getBrandAll = (
    keyword?: string,
    pageToken?: string,
    isLoadMore?: boolean,
  ) => {
    dispatch({
      type: 'searchState/getBrandAll',
      payload: {
        data: {
          keyword,
          pageToken,
        },
        isLoadMore,
      },
    });
  };

  const handleFuncSearch = debounce((value) => {
    setKeyword(value);
    if (searchType === SearchTypeEnum.BrandBonus) {
      return getBrandsBonus(value);
    } else if (searchType === SearchTypeEnum.BrandNormal) {
      return getBrandAll(value);
    }
  }, 300);

  const handleSelectSwitch = (value) => {
    clearState();
    setSearchType(value);
    if (value === SearchTypeEnum.BrandBonus) {
      getBrandsBonus(keyword);
      return;
    } else if (value === SearchTypeEnum.BrandNormal) {
      getBrandAll(keyword);
      return;
    }
  };

  useEffect(() => {
    getBrandsBonus();
    return () => {
      clearState();
    };
  }, []);

  const clearState = () => {
    dispatch({
      type: 'searchState/clearState',
    });
  };

  return (
    <AppPage title="Tìm kiếm" className="bg-white px-3">
      <div
        className="position-fixed bg-white w-100 start-0 px-2 pb-2"
        style={{ zIndex: 1 }}
      >
        <AppSearchBox
          className="bg-light my-2"
          placeholder="Tìm thương hiệu"
          onChange={(value) => {
            handleFuncSearch(value);
          }}
        />
        <AppSwitchSelect
          options={optionsFilter}
          onChange={handleSelectSwitch}
        />
      </div>
      <AppSpacer size={100} />
      {searchType === SearchTypeEnum.BrandBonus && (
        <AppLoadMore
          shouldLoadMore={!!filterListBrandBonus.nextPageToken}
          onLoadMore={() =>
            getBrandsBonus(keyword, filterListBrandBonus.nextPageToken, true)
          }
          loading={loading.effects['searchState/getBrandsBonus']}
        >
          {listBrandBonus?.map((item) => {
            const { brand, seller } = item;
            return (
              <BrandBonusItem
                brand={brand}
                seller={seller}
                key={item._id}
                onClick={() =>
                  helper.navigateToRedirect(brand._id, seller.url, true)
                }
              />
            );
          })}
        </AppLoadMore>
      )}
      {searchType === SearchTypeEnum.BrandNormal && (
        <AppLoadMore
          shouldLoadMore={!!filterListBrand.nextPageToken}
          onLoadMore={() =>
            getBrandAll(keyword, filterListBrand.nextPageToken, true)
          }
          loading={loading.effects['searchState/getBrandAll']}
        >
          {listBrand?.map((item) => {
            return (
              <BrandNormalLine
                itemClassName="border border-light"
                item={item}
                key={item._id}
              />
            );
          })}
        </AppLoadMore>
      )}
    </AppPage>
  );
}

export default connect(({ searchState, loading }: any) => ({
  searchState,
  loading,
}))(SearchPage);
