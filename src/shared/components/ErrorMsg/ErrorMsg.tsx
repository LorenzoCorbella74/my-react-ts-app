import { FetchError } from "../../services/FetchError";
type ErrorMsgProp = {
  error: FetchError;
};

function ErrorMsg({ error }: ErrorMsgProp) {
  return (
    <div className="text-danger">
      <span className="fw-bold">{error.code}</span> - {error.message}
    </div>
  );
}

export default ErrorMsg;
