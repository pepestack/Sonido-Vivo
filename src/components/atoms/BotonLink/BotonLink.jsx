import { Link } from "react-router-dom";

export function BotonLink({ to, texto, variante = "primary",className="", children}) {
  return (
    <Link to={to} className={`btn btn-${variante} ${className}`.trim() }>
      {texto}
      {children}
    </Link>
  );
}

