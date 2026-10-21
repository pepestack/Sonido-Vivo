import { Card, Table } from 'react-bootstrap'
import { Precio } from '../../atoms/Precio/Precio'
import { Titulo } from '../../atoms/Titulo/Titulo'

// productos: [{ id, nombre, unidades, monto }] ya ordenados (ver resumenVentas en pedidoService)
export function TablaMasVendidos(props) {
  return (
    <Card as="section" className="shadow-sm border-0 h-100">
      <Card.Body className="p-0">
        <Titulo nivel={2} className="h5 fw-bold p-4 mb-0">Productos más vendidos</Titulo>
        <Table responsive hover className="align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="ps-4">#</th>
              <th scope="col">Producto</th>
              <th scope="col" className="text-center">Unidades</th>
              <th scope="col" className="text-end pe-4">Monto</th>
            </tr>
          </thead>
          <tbody>
            {props.productos.map((producto, indice) => (
              <tr key={producto.id}>
                <td className="ps-4 fw-bold">{indice + 1}</td>
                <td>{producto.nombre}</td>
                <td className="text-center">{producto.unidades}</td>
                <td className="text-end pe-4"><Precio monto={producto.monto} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
