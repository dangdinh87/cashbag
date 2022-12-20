import AppImage from '@/components/app/app-image';
import AppLoadMore from '@/components/app/app-loadmore';
import AppPage from '@/components/app/app-page';
import AppSearchBox from '@/components/app/app-search';
import AppSwitchSelect from '@/components/app/app-switch-select';
import { ArrowRightIcon } from '@/configs/assets';
import { helper } from '@/utils';
import classnames from 'classnames';
import moment from 'moment';
import { useCallback, useEffect } from 'react';
import { connect } from 'umi';
import { debounce } from 'lodash';
import AppSpacer from '@/components/app/app-spacer';

function SearchPage({ dispatch, loading, searchState }) {
  const { listBrandBonus, filterListBrandBonus } = searchState;
  const optionsFilter = [
    {
      value: '1',
      label: 'Thương hiệu ngày vàng',
    },
    {
      value: '2',
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

  const expirationDate = (value: number) => {
    return moment
      .duration(value * 1000)
      .asDays()
      .toFixed();
  };

  const getTagRemaining = (seller) => {
    const result = {
      always_happening: 'Luôn diễn ra',
      ongoing: `Còn ${expirationDate(seller.remainingSeconds)} ngày`,
    };
    return result[seller.status];
  };

  const debounceSearch = useCallback(
    debounce((value: string) => {
      getBrandsBonus?.(value, '');
    }, 500),
    [],
  );

  useEffect(() => {
    getBrandsBonus();
  }, []);

  return (
    <AppPage title="Tìm kiếm" className="bg-white px-2 ">
      <div className="position-fixed bg-white w-100">
        <AppSearchBox
          className="bg-light my-2"
          placeholder="Tìm thương hiệu"
          onChange={debounceSearch}
        />
        <AppSwitchSelect
          options={optionsFilter}
          onChange={debounce((e) => console.log(e), 1000)}
        />
      </div>
      <AppSpacer size={96} />

      <div>
        <AppLoadMore
          shouldLoadMore={!!filterListBrandBonus.nextPageToken}
          onLoadMore={() =>
            getBrandsBonus(
              filterListBrandBonus.keyword,
              filterListBrandBonus.nextPageToken,
              true,
            )
          }
          loading={loading.effects['searchState/getBrandsBonus']}
        >
          {listBrandBonus?.map((item) => {
            const { brand, seller } = item;
            return (
              <div
                className="my-2 mx-n3 px-3 overflow-scroll hide-scrollbar d-flex"
                style={{ height: 105 }}
              >
                <div
                  className="position-relative rounded-2 d-flex justify-content-between align-items-center h-100 bg-white flex-shrink-0 p-2 me-2 border-light border"
                  style={{ width: 'calc(100% - 125px)' }}
                >
                  <div
                    className={classnames(
                      'd-flex flex-column h-100 justify-content-center',
                    )}
                  >
                    <div className="d-flex position-absolute top-0 mt-2">
                      <div className="rounded-2 bg-light text-gray fs-9 px-2 py-0 w-fit me-1">
                        {getTagRemaining(seller)}
                      </div>
                      <div className="rounded-2 bg-light text-gray fs-9 px-2 py-0 w-fit">
                        {brand.name}
                      </div>
                    </div>
                    <AppImage
                      src={helper.getPhotoURL(seller?.logo)}
                      className="object-fit-contain"
                      style={{
                        maxWidth: 148,
                        maxHeight: 48,
                      }}
                    />
                  </div>
                  <ArrowRightIcon className="text-muted" />
                </div>
                {
                  <div
                    className={classnames(
                      'p-2 bg-white rounded-2 flex-shrink-0 border-light border',
                    )}
                    style={{ width: 105 }}
                  >
                    <div className="d-flex flex-column justify-content-between h-100">
                      <p className="fs-8 mb-auto text-gray lh-sm">
                        Tất cả sản phẩm
                      </p>
                      <div
                        style={{
                          color: brand.primaryColor,
                        }}
                      >
                        <p className="fs-8">Hoàn tiền đến</p>
                        <p className="fs-6 fw-bolder ">{seller.bonus.text}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            );
          })}
        </AppLoadMore>
      </div>
    </AppPage>
  );
}

export default connect(({ searchState, loading }: any) => ({
  searchState,
  loading,
}))(SearchPage);
