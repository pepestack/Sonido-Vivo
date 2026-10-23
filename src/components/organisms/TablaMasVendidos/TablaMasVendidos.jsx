import { Precio } from '../../atoms/Precio/Precio'
import { TablaAdmin } from '../TablaAdmin/TablaAdmin'

const columnas = [
  { texto: '#', className: 'ps-4' },
  { texto: 'Producto' },
  { texto: 'Unidades', className: 'text-center' },
  { texto: 'Monto', className: 'text-end pe-4' },
]

// productos: [{ id, nombre, unidades, monto }] ya ordenados (ver resumenVentas en pedidoService)
export function TablaMasVendidos(props) {
  return (
    <TablaAdmin
      titulo="Productos más vendidos"
      columnas={columnas}
      vacia={props.productos.length === 0}
      mensajeVacio="Todavía no hay ventas."
      className="shadow-sm border-0 h-100"
    >
      {props.productos.map((producto, indice) => (
        <tr key={producto.id}>
          <td className="ps-4 fw-bold">{indice + 1}</td>
          <td>{producto.nombre}</td>
          <td className="text-center">{producto.unidades}</td>
          <td className="text-end pe-4"><Precio monto={producto.monto} /></td>
        </tr>
      ))}
    </TablaAdmin>
  )
}
