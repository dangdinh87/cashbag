import { ArrowRightIcon } from '@/configs/assets';

function CategoryItem({ category, onClick = null }) {
  return (
    <div className="d-flex justify-content-between my-2 fs-8" onClick={onClick}>
      <p className="text-gray">{category?.name}</p>
      <div className="d-flex align-items-center">
        <span className="fw-bolder text-primary me-1">
          {category?.cashbackText}
        </span>
        <ArrowRightIcon width={20} />
      </div>
    </div>
  );
}

export default CategoryItem;
