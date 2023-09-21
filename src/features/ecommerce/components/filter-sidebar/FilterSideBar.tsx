import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../../store/products.store";
import { memo, useState } from "react";
import { useLocation } from "react-router-dom";

function FilterSideBar() {
  const getProducts = useProducts((state) => state.getProducts);

  const location = useLocation();

  console.log(location.pathname, location.pathname !== "/order ");

  const [query, setQuery] = useState("");

  const handleChange = (event: any) => {
    setQuery(event.target?.value);
  };

  const search = () => {
    getProducts(query);
    setQuery("");
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <h3 className="mb-2">Filters</h3>
        <FontAwesomeIcon icon={faFilter} className="me-2" />
      </div>
      <hr />
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          id="query"
          name="query"
          onChange={handleChange}
          value={query}
          aria-label="Search"
          aria-describedby="input-group-button-right"
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          id="input-group-button-right"
          onClick={() => search()}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default memo(FilterSideBar);
