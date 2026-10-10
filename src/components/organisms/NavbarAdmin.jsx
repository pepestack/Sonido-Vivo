import { Container, Navbar } from "react-bootstrap";
import { Boton } from "../atoms/Boton/Boton";
import Texto from "../atoms/Texto";
import MarcaLogo from "../molecules/MarcaLogo";

// onAlternarMenu: abre/cierra el sidebar en pantallas chicas
export default function NavbarAdmin({ onAlternarMenu, menuAbierto }) {
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        data-bs-theme="dark"
        className="shadow-sm"
        
      >
        <Container fluid className="px-4">
          <Boton
            variante="naranja"
            className="d-lg-none my-1 me-2"
            onClick={onAlternarMenu}
          >
            <span className="navbar-toggler-icon" aria-hidden="true" />{" "}
            <Texto como="span" className="d-none d-sm-inline">
              {menuAbierto ? "Cerrar" : "Menu"}
            </Texto>
          </Boton>

          <MarcaLogo variante="admin" to="/admin" />

          <div className="d-flex ms-auto">
            <Boton variante="outline-light" tamano="sm" to="/">
              Cerrar Sesión
            </Boton>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}
