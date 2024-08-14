import { Spinner as BootstrapSpinner } from "react-bootstrap";

function Spinner() {
  return (
    <BootstrapSpinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  );
}

export default Spinner;
