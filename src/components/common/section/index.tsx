import { CalendarIcon } from '@/configs/assets';
import classNames from 'classnames';

function Section({ className = '', brand, title, mainTitle, children }) {
  return (
    <div className={className}>
      <div
        className={classNames(
          'd-flex align-content-center justify-content-start',
        )}
      >
        <div
          style={{
            backgroundColor: brand?.primaryColor || '#BC4066',
            height: 48,
            width: 48,
          }}
          className="d-flex align-items-center justify-content-center p-2 rounded-circle"
        >
          <CalendarIcon />
        </div>
        <div className="ms-2 flex-column d-flex justify-content-center">
          <p className="text-uppercase fs-9 text-muted">{title}</p>
          <p className="fs-6 text-gray fw-bolder">{mainTitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Section;
