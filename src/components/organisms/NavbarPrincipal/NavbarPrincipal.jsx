import { Navbar, Container, Nav } from "react-bootstrap";
import { NavItem } from "../../molecules/NavItem/NavItem";
import { BotonCarrito } from "../../molecules/BotonCarrito/BotonCarrito";
import { MarcaLogo } from "../../molecules/MarcaLogo/MarcaLogo";
import { esRutaActiva } from "../../../utils/rutas";
import { Buscador } from "../../molecules/Buscador/Buscador";
import { DropdownUsuario } from "../../molecules/DropdownUsuario/DropdownUsuario";

export function NavbarPrincipal(props) {
return (
    <header className="fixed-top">
      <Navbar expand="lg" className="navbar-custom" collapseOnSelect>
        <Container fluid className="px-4">
          <MarcaLogo onNavegar={props.onNavegar} />
          <Navbar.Toggle aria-controls="navbar-tienda" className="orange-btn" />

          <Navbar.Collapse id="navbar-tienda">
            <Nav as="ul" className="me-auto mb-2 mb-lg-0 ms-lg-4 fw-bold fs-5 text-center text-lg-start">
              {props.enlaces.map((enlace) => (
                <NavItem
                  key={enlace.ruta}
                  texto={enlace.texto}
                  ruta={enlace.ruta}
                  activo={esRutaActiva(props.rutaActual, enlace.ruta, enlace.ruta === '/')}
                  onNavegar={props.onNavegar}
                />
              ))}
            </Nav>
            <Buscador
              id="buscador"
              placeholder="¿Qué estás buscando?"
              etiquetaAccesible="Buscar productos"
              onBuscar={props.onBuscar}
              className="my-2 my-lg-0 me-lg-2 mx-auto mx-lg-0 search-navbar"
            />
            <div className="d-flex justify-content-center align-items-center gap-2 ms-lg-2 mb-2 mb-lg-0">
              <DropdownUsuario opciones={props.menuCuenta} onNavegar={props.onNavegar} />
              <BotonCarrito cantidad={props.totalItems} onClick={() => props.onNavegar('/carrito')} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

