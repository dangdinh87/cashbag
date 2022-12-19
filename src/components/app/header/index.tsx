import { LogoIcon, SearchIcon } from '@/configs/assets';
import classnames from 'classnames';

interface T {
  onClickSearch: () => void;
  className?: string;
}

const Header: React.FC<T> = ({ onClickSearch, className }) => {
  return (
    <div className={classnames(className, 'py-3')}>
      <div className="d-flex align-items-center justify-content-between">
        <LogoIcon />
        <SearchIcon onClick={onClickSearch} />
      </div>
    </div>
  );
};

export default Header;
