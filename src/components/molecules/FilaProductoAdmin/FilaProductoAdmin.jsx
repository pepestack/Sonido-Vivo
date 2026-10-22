import { Boton } from '../../atoms/Boton/Boton'
import { Precio } from '../../atoms/Precio/Precio'
import { nombreCategoria } from '../../../utils/formato'

export function FilaProductoAdmin(props) {
  const producto = props.producto

  return (
    <tr>
      <td className="ps-4 fw-bold">{producto.id}</td>
      <td>{producto.nombre}</td>
      <td>
        <Precio monto={producto.precio} />
      </td>
      <td>{producto.stock}</td>
      <td>{nombreCategoria(producto.categoria, props.categorias)}</td>
      <td className="text-end pe-4">
        <Boton variante="outline-primary" tamano="sm" className="me-1" onClick={() => props.onVer(producto)}>
          Ver detalle
        </Boton>
        <Boton variante="outline-primary" tamano="sm" onClick={() => props.onEditar(producto)}>
          Editar
        </Boton>
        {/* sin onEliminar no se muestra el botón (ej: la vista de productos críticos) */}
        {props.onEliminar && (
          <Boton variante="outline-danger" tamano="sm" className="ms-1" onClick={() => props.onEliminar(producto)}>
            Eliminar
          </Boton>
        )}
      </td>
    </tr>
  )
}