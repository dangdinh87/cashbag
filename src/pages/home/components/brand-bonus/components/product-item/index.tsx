import AppImage from '@/components/app/app-image';
import { formatter, helper } from '@/utils';
import classnames from 'classnames';
import { Ratio } from 'react-bootstrap';

const ProductItem = ({ product, onClick = null, className }) => {
  return (
    <div
      className={classnames('p-1 w-100 bg-white rounded-2', className)}
      onClick={onClick}
    >
      <Ratio aspectRatio={'1x1'}>
        <AppImage
          src={helper.getPhotoURL(product.photo)}
          className="w-100 rounded-2 object-fit-contain bg-light"
        />
      </Ratio>
      <p
        className="fs-8 text-gray my-1 two-line__ellipses lh-sm"
        style={{ height: 30 }}
      >
        {product.name}
      </p>
      <p className="text-primary fs-9">{product?.webBonus?.text} hoàn tiền</p>
      <p className="text-blue fs-9">{formatter.currency(product.price)}</p>
    </div>
  );
};

export default ProductItem;
