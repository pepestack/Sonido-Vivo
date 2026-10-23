import { Precio } from '../../atoms/Precio/Precio'
import { AccionesFila } from '../AccionesFila/AccionesFila'
import { InsigniaEstado } from '../InsigniaEstado/InsigniaEstado'
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
        <InsigniaEstado estado={pedido.estado} />
      </td>
      <AccionesFila onVer={() => props.onVer(pedido)} />
    </tr>
  )
}
