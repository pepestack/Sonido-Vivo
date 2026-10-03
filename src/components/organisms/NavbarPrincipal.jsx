import { Navbar, Container } from "react-bootstrap";
import Logo from "../molecules/Logo";
import NavList from "../molecules/NavList";
import BotonCarrito from "../molecules/BotonCarrito";
import DropdownUsuario from "../molecules/DropdownUsuario";
import { useCarrito } from "../../context/useContexto";
function NavbarPrincipal() {
  const { totalItems } = useCarrito();
  return (
    <header className="fixed-top">
      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container fluid className="px-4">
          <Logo />

          <Navbar.Toggle aria-controls="navbar-tienda" className="orange-btn" />

          <Navbar.Collapse id="navbar-tienda">
            <NavList />
            <DropdownUsuario />
            <div className="d-flex ms-lg-2 mb-2 mb-lg-0">
              <BotonCarrito cantidad={totalItems} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavbarPrincipal;
