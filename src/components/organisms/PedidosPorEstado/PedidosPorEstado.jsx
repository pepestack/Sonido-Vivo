import { Card, ListGroup } from 'react-bootstrap'
import { Insignia } from '../../atoms/Insignia/Insignia'
import { Titulo } from '../../atoms/Titulo/Titulo'

// porEstado: { 'En preparación': 2, Despachado: 0, ... }; colores: color de la insignia de cada estado
export function PedidosPorEstado(props) {
  return (
    <Card as="section" className="shadow-sm border-0 h-100">
      <Card.Body className="p-4">
        <Titulo nivel={2} className="h5 fw-bold mb-3">Pedidos por estado</Titulo>
        <ListGroup variant="flush">
          {Object.entries(props.porEstado).map(([estado, cantidad]) => (
            <ListGroup.Item key={estado} className="d-flex justify-content-between align-items-center px-0">
              <Insignia color={props.colores[estado] ?? 'secondary'} className="px-3 py-2">{estado}</Insignia>
              <span className="fw-bold fs-5">{cantidad}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
