import { Navbar, Container, Nav } from "react-bootstrap";
import { Logo } from "../../molecules/Logo/Logo";
import { NavItem } from "../../molecules/NavItem/NavItem";
import { BotonCarrito } from "../../molecules/BotonCarrito/BotonCarrito";
import { DropdownUsuario } from "../../molecules/DropdownUsuario/DropdownUsuario";
import { useCarrito } from "../../../context/useContexto";
import { menuCuenta, navTienda } from "../../../data/navegacion";
export function NavbarPrincipal() {
  const { totalItems } = useCarrito();
  return (
    <header className="fixed-top">
      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container fluid className="px-4">
          <Logo />

          <Navbar.Toggle aria-controls="navbar-tienda" className="orange-btn" />

          <Navbar.Collapse id="navbar-tienda">
            <Nav as="ul" className="me-auto mb-2 mb-lg-0 ms-lg-4 fw-bold fs-5">
              {navTienda.map((enlace) => (
                <NavItem key={enlace.ruta} texto={enlace.texto} ruta={enlace.ruta} exacto={enlace.ruta === '/'} />
              ))}
            </Nav>
            <DropdownUsuario opciones={menuCuenta}/>
            <div className="d-flex ms-lg-2 mb-2 mb-lg-0">
              <BotonCarrito cantidad={totalItems} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

