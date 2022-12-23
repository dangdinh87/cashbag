import AppImage from '@/components/app/app-image';
import { ArrowRightIcon } from '@/configs/assets';
import { formatter, helper } from '@/utils';
import classnames from 'classnames';

function BrandNormalLine({ item, itemClassName }) {
  const { brand, categories } = item;
  const isCashback = brand?.statistic?.cashbackTotal > 0;

  return (
    <div
      className="my-2 mx-n3 px-3 overflow-scroll hide-scrollbar d-flex"
      style={{ height: 105 }}
    >
      <div
        className={classnames(
          itemClassName,
          'rounded-2 d-flex justify-content-between align-items-center h-100 bg-white flex-shrink-0 p-2 me-2',
        )}
        style={{ width: '66%' }}
      >
        <div
          className={classnames(
            { 'justify-content-center': !isCashback },
            { 'justify-content-between': isCashback },
            'd-flex flex-column  h-100',
          )}
        >
          {isCashback && <div style={{ height: 15 }} />}
          <AppImage
            src={helper.getPhotoURL(brand?.logo)}
            className="object-fit-contain"
            style={{
              maxWidth: 120,
              maxHeight: 50,
            }}
          />
          {isCashback && (
            <p className="text-gray fs-9">
              {formatter.formatShortNumberCash(brand?.statistic?.cashbackTotal)}{' '}
              tiền đã hoàn
            </p>
          )}
        </div>
        <ArrowRightIcon className="text-muted" />
      </div>
      {categories?.map((element, index) => {
        const isLast = index === categories?.length - 1;
        return (
          <div
            key={element._id}
            className={classnames(
              'p-2 bg-white rounded-2 flex-shrink-0',
              {
                'me-2': !isLast,
              },
              itemClassName,
            )}
            style={{ width: 105 }}
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
  );
}

export default BrandNormalLine;
