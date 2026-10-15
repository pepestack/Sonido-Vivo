import { Nav, Offcanvas } from 'react-bootstrap'
import { NavItem } from '../../molecules/NavItem/NavItem'
import { sidebarPrincipal, sidebarSecundario } from '../../../data/navegacion'
import { esRutaActiva } from '../../../utils/rutas'

const claseItem = 'text-body d-flex align-items-center gap-2'


export function SidebarAdmin(props){
  function renderizarItems(items){
    return items.map((item) => (
      <NavItem
        key={item.texto}
        texto={item.texto}
        ruta={item.ruta}
        icono={item.icono}
        deshabilitado={item.deshabilitado}
        activo={esRutaActiva(props.rutaActual, item.ruta, item.exacto)}
        className={claseItem}
        onNavegar={props.onNavegar}
      />
    ))
  }

  return(
    <Offcanvas
      responsive="lg"
      show={props.abierto}
      onHide={props.onCerrar}
      id="sidebar"
      className="sidebar border-end"
    >
      <Offcanvas.Header closeButton className="d-lg-none">
        <Offcanvas.Title>Menú</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-3">
        <nav className="d-flex flex-columns flex-grow-1 justify-content-between">
          <Nav as="ul" variant="pills" className="flex-column gap-1 mb-auto">
            {renderizarItems(sidebarPrincipal)}
          </Nav>
          <Nav as="ul" variant="pills" className="flex-column gap-1 my-3">
            {renderizarItems(sidebarSecundario)}
          </Nav>
        </nav>
      </Offcanvas.Body>

    </Offcanvas>
  )
}
