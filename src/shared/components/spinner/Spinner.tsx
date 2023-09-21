import Spinner from "react-bootstrap/Spinner";

import "./Spinner.css";

type BTSpinnerProps = {
  message?: string;
};

function BTSpinner(
  { message }: BTSpinnerProps /* = { message: "Loading..." } */
) {
  const fullHeight = { height: "100vh" };
  return (
    <div
      className="d-flex justify-content-center align-items-center bt-spinner"
      style={fullHeight}
    >
      <Spinner animation="border" role="status" />
      {message && <p className="ms-2 mt-3">{message}</p>}
    </div>
  );
}

export default BTSpinner;
