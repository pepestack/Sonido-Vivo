import { ListGroup } from 'react-bootstrap'

// Fila "etiqueta | valor" de una vista de detalle (va dentro de un ListGroup variant="flush")
export function FilaDetalle(props) {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center gap-3 px-0 py-3">
      <b className="text-muted">{props.etiqueta}</b>
      <span className="text-end">{props.children}</span>
    </ListGroup.Item>
  )
}
