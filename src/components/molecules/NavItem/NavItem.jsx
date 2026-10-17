import { Nav } from 'react-bootstrap'
import { Icono } from '../../atoms/Icono/Icono'

// Enlace de navegación con ícono opcional. No conoce el router: es un <a href> real que
// cancela la recarga y avisa a props.onNavegar. activo lo calcula quien lo usa.
export function NavItem(props) {
  const className = props.className ?? ''
  const contenido = (
    <>
      {props.icono && <Icono icono={props.icono} />}
      <span>{props.texto}</span>
    </>
  )

  if (props.deshabilitado) {
    return (
      <Nav.Item as="li">
        <Nav.Link disabled className={className}>
          {contenido}
        </Nav.Link>
      </Nav.Item>
    )
  }

  function ir(evento) {
    evento.preventDefault()
    props.onNavegar(props.ruta)
  }

  return (
    <Nav.Item as="li">
      <Nav.Link href={props.ruta} active={props.activo ?? false} className={className} onClick={ir}>
        {contenido}
      </Nav.Link>
    </Nav.Item>
  )
}

