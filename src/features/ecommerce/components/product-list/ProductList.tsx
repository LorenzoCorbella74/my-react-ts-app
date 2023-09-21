import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../../store/products.store";
import { useEffect } from "react";
import ProductListItem from "../product-item/Product";

import ErrorMsg from "../../../../shared/components/ErrorMsg/ErrorMsg";
// CSS
import "./ProductList.css";

function ProductList() {
  const { products, getProducts, error } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <h3 className="mb-2">Products:</h3>
        <FontAwesomeIcon icon={faList} className="me-2" />
      </div>
      {error ? (
        <ErrorMsg error={error} />
      ) : (
        <div className="scrollable-container">
          {products &&
            products.map((product) => (
              <ProductListItem product={product} key={product.id} />
            ))}
        </div>
      )}
    </>
  );
}

export default ProductList;
