import ProductItem from '../product-item';

function ProductListWrap({ products = [] }) {
  return (
    <div className="w-100">
      <div className="row row-cols-2">
        {products.map((product) => {
          return (
            <div className="col p-1" key={product._id}>
              <ProductItem product={product} className="shadow-sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductListWrap;
