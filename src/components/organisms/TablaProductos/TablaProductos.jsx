import { Card, Table } from 'react-bootstrap'
import { FilaProductoAdmin } from '../../molecules/FilaProductoAdmin/FilaProductoAdmin'

// categorias: las actuales, para mostrar el nombre de la categoría de cada producto
export function TablaProductos(props) {
  return (
    <Card as="section" className="shadow-sm border-0">
      <Card.Body className="p-0">
        <Table responsive hover striped className="text-nowrap mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="ps-4">
                Código producto (SKU)
              </th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Categoría</th>
              <th scope="col" className="text-end pe-4">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {props.productos.map((producto) => (
              <FilaProductoAdmin
                key={producto.id}
                producto={producto}
                categorias={props.categorias}
                onVer={props.onVer}
                onEditar={props.onEditar}
                onEliminar={props.onEliminar}
              />
            ))}
            {props.productos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}