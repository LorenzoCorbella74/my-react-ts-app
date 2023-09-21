import { Product } from "../../types/ecommerce";
import Badge from "react-bootstrap/esm/Badge";
import { useNavigate } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../../store/products.store";

type ProductItemProps = {
  product: Product;
};

function ProductListItem({ product }: ProductItemProps) {
  let navigate = useNavigate();
  const addToCart = useProducts((state) => state.addToCart);
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justifier-content-between align-items-center">
          <a href="#" className="card-link">
            <h5 onClick={() => navigate("/" + product.id)}>{product.title}</h5>
          </a>
          <h6 className="text-muted ms-auto">
            Rating:
            <Badge bg="primary" pill className="ms-2">
              {product.rating}
            </Badge>
          </h6>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          Availability:{"   "}
          {product.count ? (
            product.count
          ) : (
            <span className="text-danger">Non disponibile</span>
          )}
        </h6>
        <p className="card-text">{product.description} </p>
        {!!product.count && (
          <a
            href="#"
            className="card-link"
            onClick={() => addToCart(product.id)}
          >
            Add to cart
          </a>
        )}
      </div>
    </div>
  );
}

export default ProductListItem;
