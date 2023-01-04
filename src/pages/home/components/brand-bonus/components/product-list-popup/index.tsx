import { helper } from '@/utils';
import ProductItem from '../product-item';

function ProductListWrap({ products = [], brand }) {
  return (
    <div className="w-100">
      <div className="row row-cols-2">
        {products.map((product) => {
          return (
            <div className="col p-1" key={product._id}>
              <ProductItem
                product={product}
                className="shadow-sm"
                onClick={() =>
                  helper.navigateToRedirect(brand._id, product.url, true)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListWrap;
