import { Link } from "react-router-dom";

function BotonLink({ to, texto, variante = "primary" }) {
  return (
    <Link to={to} className={`btn btn-${variante}`}>
      {texto}
    </Link>
  );
}

export default BotonLink
