import { Card, Table } from 'react-bootstrap'
import { FilaCategoriaAdmin } from '../../molecules/FilaCategoriaAdmin/FilaCategoriaAdmin'

// categorias: [{ valor, texto, cantidad }]; onEditar y onEliminar reciben la categoría completa
export function TablaCategorias(props) {
  return (
    <Card as="section" className="shadow-sm border-0">
      <Card.Body className="p-0">
        <Table responsive hover striped className="text-nowrap mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="ps-4">Nombre</th>
              <th scope="col">Dirección</th>
              <th scope="col">Productos</th>
              <th scope="col" className="text-end pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {props.categorias.map((categoria) => (
              <FilaCategoriaAdmin
                key={categoria.valor}
                categoria={categoria}
                onEditar={props.onEditar}
                onEliminar={props.onEliminar}
              />
            ))}
            {props.categorias.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-muted">
                  No hay categorías registradas.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
