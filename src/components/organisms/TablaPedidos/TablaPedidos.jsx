import { Card, Table } from 'react-bootstrap'
import { FilaPedido } from '../../molecules/FilaPedido/FilaPedido'

// pedidos: ya filtrados y ordenados por la página. onVer recibe el pedido completo
// mostrarCliente: columna con el nombre del cliente (panel de administración)
export function TablaPedidos(props) {
  return (
    <Card as="section" className="shadow-sm border-0">
      <Card.Body className="p-0">
        <Table responsive hover striped className="text-nowrap align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="ps-4">N°</th>
              <th scope="col">Fecha</th>
              {props.mostrarCliente && <th scope="col">Cliente</th>}
              <th scope="col">Entrega</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col" className="text-end pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {props.pedidos.map((pedido) => (
              <FilaPedido
                key={pedido.id}
                pedido={pedido}
                mostrarCliente={props.mostrarCliente}
                onVer={props.onVer}
              />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
