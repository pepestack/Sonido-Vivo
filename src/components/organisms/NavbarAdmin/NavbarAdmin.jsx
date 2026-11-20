import { Container, Navbar } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Icono } from "../../atoms/Icono/Icono";
import { Texto } from "../../atoms/Texto/Texto";
import { MarcaLogo } from "../../molecules/MarcaLogo/MarcaLogo";

// onAlternarMenu: abre/cierra el sidebar en pantallas chicas; onCerrarSesion: termina la sesión
export function NavbarAdmin(props) {
  return(
    <header>
      <Navbar expand="lg" bg="dark" variant="dark" data-bs-theme="dark" className="shadow-sm">
        <Container fluid className="px-3 px-sm-4 flex-nowrap">
          <Boton
            variante="naranja"
            className="navbar-toggler d-lg-none my-1 me-2"
            onClick={props.onAlternarMenu}
            controla="sidebar"
            expandido={props.menuAbierto}>
              <span className="navbar-toggler-icon" aria-hidden="true"/>{' '}
              <Texto como="span" className="d-none d-sm-inline">
                {props.menuAbierto ? 'Cerrar' : 'Menu'}
              </Texto>
            </Boton>

            <MarcaLogo variante="admin" ruta="/admin" onNavegar={props.onNavegar}/>

            <div className="d-flex ms-auto flex-shrink-0">
              <Boton variante="outline-light" tamano="sm" className="text-nowrap" etiquetaAccesible="Cerrar Sesión" onClick={props.onCerrarSesion}>
                <Icono icono="bi bi-box-arrow-right" className="d-sm-none" />
                <Texto como="span" className="d-none d-sm-inline">Cerrar Sesión</Texto>
              </Boton>
            </div>
        </Container>
      </Navbar>
    </header>
  )
}
