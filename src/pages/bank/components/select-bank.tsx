import AppBottomSheet from '@/components/app/app-bottom-sheet';
import AppImage from '@/components/app/app-image';
import AppSearchBox from '@/components/app/app-search';
import AppSpacer from '@/components/app/app-spacer';
import { ArrowRightIcon } from '@/configs/assets';
import { Bank, RootState } from '@/interface';
import { helper } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'umi';

export default function SelectBank({
  visible,
  onClose,
  onSelectBank,
  currentBank,
}) {
  const {
    loading,
    bankModel: { banks = [], bankFilter },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const getBankList = (query?: any) => {
    dispatch({
      type: 'bankModel/getBankList',
      payload: {
        query,
      },
    });
  };

  const handleClose = () => {
    onClose?.();
    setTimeout(() => setKeyword(''), 200);
  };

  const handleSearchClientBank = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleSelectBank = (bank: Bank) => {
    onSelectBank(bank);
  };

  useEffect(() => {
    getBankList();
  }, []);

  const bankSearchList = useMemo(
    () =>
      banks.filter((bank: Bank) =>
        bank?.shortName?.toLowerCase()?.includes(keyword.trim().toLowerCase()),
      ),
    [banks, keyword, handleSelectBank, onClose],
  );

  return (
    <AppBottomSheet
      title={'Chọn Ngân hàng'}
      headerClass="pb-2 pt-2"
      onClose={handleClose}
      closeBtn
      visible={visible}
      bodyClass="pt-0 "
    >
      <div className="bg-white position-fixed w-100 mx-n3 mt-n1">
        <AppSearchBox
          placeholder="Tìm ngân hàng"
          className="rounded-0 bg-white border-1 border border-light"
          onChange={(keyword: string) => handleSearchClientBank(keyword)}
          closeValueIcon
        />
      </div>
      <AppSpacer size={41} />
      {bankSearchList?.map((bank: Bank) => {
        return (
          <div
            className="d-flex align-items-center my-2c"
            onClick={() => handleSelectBank(bank)}
          >
            <AppImage
              src={helper.getPhotoURL(bank.logo)}
              className="rounded-2 object-fit-contain border border-1 border-light flex-shrink-0"
              height={69}
              width={69}
            />
            <div className="flex-grow-1 mx-3">
              <p className="fw-bold fs-7  ">{bank.shortName}</p>
              <p className="fs-8 text-muted ">{bank.name}</p>
            </div>
            <ArrowRightIcon />
          </div>
        );
      })}
    </AppBottomSheet>
  );
}
