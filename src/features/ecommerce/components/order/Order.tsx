import { Link } from "react-router-dom";

function Order() {
  return (
    <>
      <Link className="link-primary" to="/">
        <p>Back</p>
      </Link>
      <div>Order</div>
    </>
  );
}

export default Order;
