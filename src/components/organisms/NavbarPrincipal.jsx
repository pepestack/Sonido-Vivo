import { Navbar, Container } from "react-bootstrap";
import Logo from "../molecules/Logo";
import NavList from "../molecules/NavList";
import BotonCarrito from "../molecules/BotonCarrito";
import DropdownUsuario from "./DropdownUsuario";

function NavbarPrincipal() {
  return (
    <Navbar expand="lg" fixed="top" className="navbar-custom">
      <Container fluid className="px-4">
        <Logo />

        <Navbar.Toggle aria-controls="navbarSupportedContent" />

        <Navbar.Collapse id="navbarSupportedContent">
          <NavList />
          <DropdownUsuario />
          <BotonCarrito />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPrincipal;