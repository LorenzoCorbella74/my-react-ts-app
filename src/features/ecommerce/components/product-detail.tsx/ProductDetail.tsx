import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../store/products.store";
import ErrorMsg from "../../../../shared/components/ErrorMsg/ErrorMsg";

function ProductDetail() {
  let { productId } = useParams();

  const { getProduct, selectedProduct, error, addToCart, removeFromCart } =
    useProducts();

  const cart = useProducts((state) => state.cart);

  let isInCart = cart.some((p) => p.id.toString() === productId);

  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, [productId]);

  return (
    <>
      <Link className="link-primary" to="/">
        <p>Back</p>
      </Link>

      {error ? <ErrorMsg error={error} /> : ""}
      {selectedProduct && (
        <div className="card mb-3">
          <div className="card-body">
            <img
              className="img-fluid"
              src={
                "https://dummyimage.com/600x400/000/fff.png&text=" +
                selectedProduct.title
              }
              alt="dummy"
            />
            <h3>{selectedProduct.title}</h3>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.cost}€</p>
            <a
              href="#"
              className="card-link"
              onClick={() =>
                isInCart
                  ? removeFromCart(selectedProduct.id)
                  : addToCart(selectedProduct.id)
              }
            >
              {isInCart ? "Remove From Cart" : "Add to cart"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
