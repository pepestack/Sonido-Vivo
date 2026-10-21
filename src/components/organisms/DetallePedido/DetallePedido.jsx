import { Card, Col, Row, Table } from 'react-bootstrap'
import { Insignia } from '../../atoms/Insignia/Insignia'
import { Precio } from '../../atoms/Precio/Precio'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { colorEstado } from '../../../data/pedidos'
import { formatoFecha, nombreCompleto, numeroPedido } from '../../../utils/formato'

// Comprobante (boleta) de un pedido: lo usan la compra exitosa, "Mis pedidos" y el panel de administración
export function DetallePedido(props) {
  const pedido = props.pedido
  const entrega = pedido.entrega

  return (
    <Card as="article" className="shadow-sm border-0">
      <Card.Header as="header" className="bg-dark text-white d-flex flex-wrap justify-content-between align-items-center gap-2 py-3 px-4">
        <Titulo nivel={2} className="h5 mb-0">Pedido {numeroPedido(pedido.id)}</Titulo>
        <Insignia color={colorEstado[pedido.estado] ?? 'secondary'} className="px-3 py-2">
          {pedido.estado}
        </Insignia>
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

        <Table responsive className="align-middle mb-0">
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
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end">Subtotal</td>
              <td className="text-end"><Precio monto={pedido.subtotal} /></td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end">Despacho</td>
              <td className="text-end">{pedido.despacho > 0 ? <Precio monto={pedido.despacho} /> : 'Sin costo'}</td>
            </tr>
            <tr className="fw-bold fs-5">
              <td colSpan={3} className="text-end border-0">Total</td>
              <td className="text-end border-0"><Precio monto={pedido.total} className="text-success" /></td>
            </tr>
          </tfoot>
        </Table>
      </Card.Body>
    </Card>
  )
}
