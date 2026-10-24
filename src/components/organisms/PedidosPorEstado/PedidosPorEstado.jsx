import { Card, ListGroup } from 'react-bootstrap'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { InsigniaEstado } from '../../molecules/InsigniaEstado/InsigniaEstado'

// porEstado: { 'En preparación': 2, Despachado: 0, ... }
export function PedidosPorEstado(props) {
  return (
    <Card as="section" className="shadow-sm border-0 h-100">
      <Card.Body className="p-4">
        <Titulo nivel={2} className="h5 fw-bold mb-3">Pedidos por estado</Titulo>
        <ListGroup variant="flush">
          {Object.entries(props.porEstado).map(([estado, cantidad]) => (
            <ListGroup.Item key={estado} className="d-flex justify-content-between align-items-center px-0">
              <InsigniaEstado estado={estado} className="px-3 py-2" />
              <Texto como="span" className="fw-bold fs-5">{cantidad}</Texto>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
