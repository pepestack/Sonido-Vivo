import { Card, Col, Row, Table } from 'react-bootstrap'
import { Precio } from '../../atoms/Precio/Precio'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { InsigniaEstado } from '../../molecules/InsigniaEstado/InsigniaEstado'
import { ResumenTotales } from '../../molecules/ResumenTotales/ResumenTotales'
import { formatoFecha, nombreCompleto, numeroPedido } from '../../../utils/formato'

// Comprobante (boleta) de un pedido: lo usan la compra exitosa, "Mis pedidos" y el panel de administración
export function DetallePedido(props) {
  const pedido = props.pedido
  const entrega = pedido.entrega

  return (
    <Card as="article" className="shadow-sm border-0">
      <Card.Header as="header" className="bg-dark text-white d-flex flex-wrap justify-content-between align-items-center gap-2 py-3 px-4">
        <Titulo nivel={2} className="h5 mb-0">Pedido {numeroPedido(pedido.id)}</Titulo>
        <InsigniaEstado estado={pedido.estado} className="px-3 py-2" />
      </Card.Header>
      <Card.Body className="p-4">
        <Row className="g-4 mb-4">
          <Col xs={12} md={6}>
            <Titulo nivel={3} className="h6 text-uppercase text-muted">Cliente</Titulo>
            <Texto className="fw-semibold mb-1">{nombreCompleto(pedido.cliente)}</Texto>
            <Texto className="mb-1">{pedido.cliente.correo}</Texto>
            <Texto className="small text-muted mb-0">{formatoFecha(pedido.fecha)}</Texto>
          </Col>
          <Col xs={12} md={6}>
            <Titulo nivel={3} className="h6 text-uppercase text-muted">Entrega y pago</Titulo>
            {entrega.tipo === 'retiro' ? (
              <Texto className="mb-1">Retiro en tienda (Viña del Mar)</Texto>
            ) : (
              <>
                <Texto className="mb-1">Despacho a domicilio</Texto>
                <Texto className="mb-1">{entrega.direccion}, {entrega.comuna}, {entrega.region}</Texto>
              </>
            )}
            <Texto className="small text-muted mb-0">Tarjeta {pedido.tarjeta}</Texto>
          </Col>
        </Row>

        <Table responsive className="align-middle mb-4">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-end">Precio</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.items.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td className="text-end"><Precio monto={item.precio} /></td>
                <td className="text-center">{item.cantidad}</td>
                <td className="text-end"><Precio monto={item.precio * item.cantidad} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col xs={12} md={6} className="ms-auto">
            <ResumenTotales subtotal={pedido.subtotal} despacho={pedido.despacho} total={pedido.total} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
