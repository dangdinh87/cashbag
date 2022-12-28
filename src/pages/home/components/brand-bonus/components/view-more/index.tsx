import { GridIcon } from '@/configs/assets';

export default function ViewMoreSeller({ brand, viewMoreBrand, total }) {
  return (
    <div
      style={{
        width: 105,
        padding: 6,
        backgroundColor: brand.primaryColor,
      }}
      className="border rounded-1 py-3 d-flex flex-column justify-content-center align-items-center border-white border-1"
      onClick={viewMoreBrand}
    >
      <GridIcon className="text-white" width={40} />
      <div className="text-white text-center">
        <p className="fs-9">
          Xem tất cả <br />
          thương hiệu
        </p>
        <p className="fs-6 fw-bolder">{`+${total}`}</p>
      </div>
    </div>
  );
}
