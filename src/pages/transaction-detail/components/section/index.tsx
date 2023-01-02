const SectionItem = ({ title = '', content = '', color, extraContent }) => {
  return (
    <div className="mb-2 mt-1">
      <div className="d-flex justify-content-between align-items-center fs-8 fw-bold text-gray">
        <p className="text-gray">{title}</p>
        {extraContent}
      </div>
      <p style={{ color: color }} className="fs-6 fw-bolder">
        {content}
      </p>
    </div>
  );
};

export default SectionItem;
