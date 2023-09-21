// BT CSS (no JS)
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import BTSpinner from "./shared/components/spinner/Spinner";
import FilterSideBar from "./features/ecommerce/components/filter-sidebar/FilterSideBar";
import ProductList from "./features/ecommerce/components/product-list/ProductList";
import MiniCart from "./features/ecommerce/components/mini-cart/MiniCart";

import { useProducts } from "./features/ecommerce/store/products.store";

import ProductDetail from "./features/ecommerce/components/product-detail.tsx/ProductDetail";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Order from "./features/ecommerce/components/order/Order";
import ErrorBoundary from "./shared/components/ErrorBoundary/ErrorBoundary";

function App() {
  const isLoading = useProducts((state) => state.isLoading);

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary>
          <Container fluid="md">
            <Row>
              <h2 className="my-4 text-center">MY-ESHOP</h2>
            </Row>
            <Row>
              <Col>
                <FilterSideBar />
              </Col>
              <Col xs={6}>
                <Routes>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/:productId" element={<ProductDetail />} />
                  <Route path="/order" element={<Order />} />
                </Routes>
              </Col>
              <Col>
                <MiniCart />
              </Col>
            </Row>
            <Row>{isLoading && <BTSpinner message="Loading..." />}</Row>
          </Container>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
