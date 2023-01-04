import AppImage from '@/components/app/app-image';
import { ArrowRightIcon } from '@/configs/assets';
import { helper } from '@/utils';
import classnames from 'classnames';
import moment from 'moment';

function BrandBonusItem({ brand, seller, onClick }) {
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
  return (
    <div
      className="my-2 mx-n3 px-3 overflow-scroll hide-scrollbar d-flex"
      style={{ height: 105 }}
      onClick={onClick}
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
              {brand?.name}
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
            <p className="fs-8 mb-auto text-gray lh-sm">Tất cả sản phẩm</p>
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
}

export default BrandBonusItem;
