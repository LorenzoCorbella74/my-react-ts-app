import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../../store/products.store";
import { Link } from "react-router-dom";

function MiniCart() {
  const cart = useProducts((state) => state.cart);
  const removeFromCart = useProducts((state) => state.removeFromCart);

  const total = cart.reduce(
    (acc, product) => acc + product.cost * product.count,
    0
  );

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <h3 className="mb-2">Your Cart:</h3>
        <FontAwesomeIcon icon={faCartShopping} className="me-2" />
      </div>
      <hr />
      {cart &&
        cart.map((product) => (
          <div key={product.id}>
            <div className="d-flex flex-row align-items-center">
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <div className="d-flex">
                  <p className="card-subtitle mb-2">
                    <span className="text-muted">Num:</span> {product.count}
                  </p>
                  <p className="ms-3">
                    <span className="text-muted">Cost:</span>{" "}
                    {product.cost * product.count}€
                  </p>
                </div>
              </div>

              <FontAwesomeIcon
                icon={faTrash}
                color="red"
                onClick={() => removeFromCart(product.id)}
              />
            </div>
          </div>
        ))}
      {cart.length > 0 && (
        <>
          <hr />
          <p>Total: {total}€</p>
          <p className="mt-6">
            {/*  <a href="#" className="card-link"> */}
            <Link className="link-primary" to="/order">
              <h5>Proceed to order</h5>
            </Link>
            {/* </a> */}
          </p>
        </>
      )}
    </>
  );
}

export default MiniCart;
