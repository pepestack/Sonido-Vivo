import { Card } from 'react-bootstrap'
import { Icono } from '../../atoms/Icono/Icono'
import { Texto } from '../../atoms/Texto/Texto'

// Cifra destacada del dashboard y los reportes. valor llega ya formateado (ej. "$1.234")
export function TarjetaEstadistica(props) {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body className="d-flex align-items-center gap-3">
        <Icono icono={props.icono} className={`fs-2 ${props.color ?? 'text-primary'}`} />
        <div>
          <Texto className="small text-muted mb-0">{props.titulo}</Texto>
          <Texto className="fs-4 fw-bold mb-0">{props.valor}</Texto>
        </div>
      </Card.Body>
    </Card>
  )
}
