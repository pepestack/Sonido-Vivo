import { Card } from 'react-bootstrap'
import { Icono } from '../../atoms/Icono/Icono'
import { Texto } from '../../atoms/Texto/Texto'

// Acceso a una categoría: toda la tarjeta es un botón y avisa con onElegir()
// Dentro de un <button> no puede ir un título ni un párrafo, por eso los textos son <span> en bloque
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
      <Texto como="span" className="d-block h6 fw-bold mb-1">
        {props.texto}
      </Texto>
      <Texto como="span" className="d-block small text-muted mb-0">
        {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
      </Texto>
    </Card>
  )
}
