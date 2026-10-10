import { Enlace } from "../../atoms/Enlace/Enlace";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { Texto } from "../../atoms/Texto/Texto";
import logo from "../../../assets/images/logo.png";
import logoBlanco from "../../../assets/images/logo-blanco.png";

export function MarcaLogo({ variante = "tienda", to = "/" }) {
  if (variante === "admin") {
    return (
      <Enlace
        to={to}
        className="navbar-brand d-flex align-items-center text-decoration-none"
      >
        <Imagen src={logoBlanco} alt="Sonido Vivo" className="logo-sm" />
        <Texto como="span" className="ms-2 fw-bold text-white">
          Sonido Vivo{" "}
          <span className="d-none d-md-inline">
            | <span className="text-warning">Panel Administrador</span>
          </span>
        </Texto>
      </Enlace>
    );
  }

  return (
    <Enlace
      to={to}
      className="navbar-brand d-flex align-items-center text-decoration-none"
    >
      <Imagen src={logo} alt="Sonido Vivo" className="logo" />
      <Texto como="span" className="sv-logo-title">
        <span className="sonido">Sonido </span>
        <span className="vivo">Vivo</span>
      </Texto>
    </Enlace>
  );
}
