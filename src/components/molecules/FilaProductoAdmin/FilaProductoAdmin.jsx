import { Precio } from '../../atoms/Precio/Precio'
import { AccionesFila } from '../AccionesFila/AccionesFila'
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
      {/* sin onEliminar no se muestra el botón (ej: la vista de productos críticos) */}
      <AccionesFila
        onVer={() => props.onVer(producto)}
        onEditar={() => props.onEditar(producto)}
        onEliminar={props.onEliminar && (() => props.onEliminar(producto))}
      />
    </tr>
  )
}
