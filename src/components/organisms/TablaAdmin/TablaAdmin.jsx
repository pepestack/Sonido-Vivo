import { Card, Table } from 'react-bootstrap'
import { Titulo } from '../../atoms/Titulo/Titulo'

// Marco común de las tablas del admin. Las filas llegan como children.
// columnas: [{ texto, className }]; vacia: muestra mensajeVacio en vez de filas
// titulo (opcional): encabezado sobre la tabla; className: clases de la tarjeta
export function TablaAdmin(props) {
  return (
    <Card as="section" className={props.className ?? 'shadow-sm border-0'}>
      <Card.Body className="p-0">
        {props.titulo && (
          <Titulo nivel={2} className="h5 fw-bold p-4 mb-0">
            {props.titulo}
          </Titulo>
        )}
        <Table responsive hover striped className="text-nowrap align-middle mb-0">
          <thead className="table-dark">
            <tr>
              {props.columnas.map((columna) => (
                <th key={columna.texto} scope="col" className={columna.className}>
                  {columna.texto}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.children}
            {props.vacia && (
              <tr>
                <td colSpan={props.columnas.length} className="text-center py-4 text-muted">
                  {props.mensajeVacio ?? 'No hay registros.'}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
