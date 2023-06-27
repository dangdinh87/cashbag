import AppBottomSheet from '@/components/app/app-bottom-sheet';
import AppSearchBox from '@/components/app/app-search';
import AppSpacer from '@/components/app/app-spacer';
import { ArrowRightIcon } from '@/configs/assets';
import { Branch, City, RootState } from '@/interface';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'umi';

enum List {
  City,
  Branch,
}

export default function SelectBranchPopup({
  visible,
  onClose,
  cities,
  currentBank,
  onSelectBranch,
}) {
  const {
    loading,
    bankModel: { banks = [], bankFilter, branches },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = useState(List.City);
  const [keyword, setKeyword] = useState('');

  const handleClose = () => {
    onClose?.();
    setTimeout(() => {
      setCurrentType(List.City);
      setKeyword('');
    }, 200);
  };

  const handleSelectCity = (slug) => {
    dispatch({
      type: 'bankModel/getBankBranchList',
      payload: {
        query: {
          city: slug,
        },
        bankId: currentBank._id,
      },
      callback: () => {
        setCurrentType(List.Branch);
        setKeyword('');
      },
    });
  };

  const handleSelectBranch = (branch) => {
    onSelectBranch(branch);
    handleClose();
  };

  cities = useMemo(
    () =>
      cities.filter((city: City) =>
        city?.name?.toLowerCase()?.includes(keyword.trim().toLowerCase()),
      ),
    [keyword],
  );

  const newBranchesSearch = useMemo(
    () =>
      branches.filter((branch: Branch) =>
        branch?.name?.toLowerCase()?.includes(keyword.trim().toLowerCase()),
      ),
    [branches, keyword],
  );

  return (
    <AppBottomSheet
      title={
        currentType === List.City
          ? 'Chọn Tỉnh/Thành phố'
          : 'Chọn chi nhánh ngân hàng'
      }
      headerClass=""
      onClose={handleClose}
      closeBtn
      visible={visible}
      bodyClass="pt-0 "
    >
      <div className="bg-white position-fixed w-100 mx-n3 mt-n1">
        <AppSearchBox
          value={keyword}
          placeholder={
            currentType === List.City
              ? 'Tìm Tỉnh/Thành phố'
              : 'Tìm chi nhánh ngân hàng'
          }
          className="rounded-0 bg-white border-1 border border-light"
          onChange={(keyword: string) => setKeyword(keyword)}
          closeValueIcon
        />
      </div>
      <AppSpacer size={42} />
      {currentType === List.City &&
        cities.map((item: City) => (
          <div
            className="d-flex align-items-center justify-content-between my-3"
            onClick={() => handleSelectCity(item.slug)}
          >
            <p className="text-muted fs-7">{item.name}</p>{' '}
            <ArrowRightIcon height={20} />
          </div>
        ))}
      {currentType === List.Branch &&
        newBranchesSearch?.map((branch: Branch) => {
          return (
            <div
              className="d-flex align-items-center justify-content-between my-3"
              onClick={() => handleSelectBranch(branch)}
            >
              <p className="text-muted fw-normal fs-7 ">{branch.name}</p>
              <ArrowRightIcon height={20} />
            </div>
          );
        })}
    </AppBottomSheet>
  );
}
