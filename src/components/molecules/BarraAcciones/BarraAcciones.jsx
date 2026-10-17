import { ButtonGroup } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'

// Barra "Volver | Editar · Eliminar" de las vistas de detalle del admin
export function BarraAcciones(props) {
  const className = props.className ?? 'mt-3'

  return (
    <nav className={`d-flex justify-content-between ${className}`}>
      <Boton variante="outline-secondary" onClick={props.onVolver}>
        Volver
      </Boton>
      <ButtonGroup>
        <Boton onClick={props.onEditar}>Editar</Boton>
        {props.onEliminar && (
          <Boton variante="danger" onClick={props.onEliminar}>
            Eliminar
          </Boton>
        )}
      </ButtonGroup>
    </nav>
  )
}