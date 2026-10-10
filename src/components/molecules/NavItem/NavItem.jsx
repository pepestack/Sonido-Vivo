import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Icono } from '../../atoms/Icono/Icono'

export function NavItem({ texto, ruta, icono, deshabilitado = false, exacto = false, className = '', onClick }) {
  const contenido = (
    <>
      {icono && <Icono clase={icono} />}
      <span>{texto}</span>
    </>
  )

  if (deshabilitado) {
    return (
      <Nav.Item as="li">
        <Nav.Link disabled className={className}>
          {contenido}
        </Nav.Link>
      </Nav.Item>
    )
  }

  return (
    <Nav.Item as="li">
      <Nav.Link as={NavLink} to={ruta} end={exacto} eventKey={ruta} className={className} onClick={onClick}>
        {contenido}
      </Nav.Link>
    </Nav.Item>
  )
}
