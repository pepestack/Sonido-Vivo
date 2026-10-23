import { Card } from 'react-bootstrap'
import { Icono } from '../../atoms/Icono/Icono'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'

// Acceso a una categoría: toda la tarjeta es un botón y avisa con onElegir()
export function TarjetaCategoria(props) {
  const cantidad = props.cantidad ?? 0

  return (
    <Card
      as="button"
      type="button"
      onClick={props.onElegir}
      className="tarjeta-categoria h-100 w-100 border-0 shadow-sm custom-lb-container text-center p-3"
    >
      <Icono icono={props.icono} className="fs-1 vivo mb-2" />
      <Titulo nivel={3} className="h6 fw-bold mb-1">
        {props.texto}
      </Titulo>
      <Texto className="small text-muted mb-0">
        {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
      </Texto>
    </Card>
  )
}
