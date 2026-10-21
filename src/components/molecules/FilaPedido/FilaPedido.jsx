import { Boton } from '../../atoms/Boton/Boton'
import { Insignia } from '../../atoms/Insignia/Insignia'
import { Precio } from '../../atoms/Precio/Precio'
import { colorEstado } from '../../../data/pedidos'
import { formatoFecha, nombreCompleto, numeroPedido } from '../../../utils/formato'

// mostrarCliente: agrega la columna del cliente (en "Mis pedidos" no hace falta)
export function FilaPedido(props) {
  const pedido = props.pedido

  return (
    <tr>
      <td className="ps-4 fw-bold">{numeroPedido(pedido.id)}</td>
      <td>{formatoFecha(pedido.fecha)}</td>
      {props.mostrarCliente && <td>{nombreCompleto(pedido.cliente)}</td>}
      <td>{pedido.entrega.tipo === 'retiro' ? 'Retiro en tienda' : 'Despacho'}</td>
      <td><Precio monto={pedido.total} /></td>
      <td>
        <Insignia color={colorEstado[pedido.estado] ?? 'secondary'}>{pedido.estado}</Insignia>
      </td>
      <td className="text-end pe-4">
        <Boton variante="outline-primary" tamano="sm" onClick={() => props.onVer(pedido)}>
          Ver detalle
        </Boton>
      </td>
    </tr>
  )
}
