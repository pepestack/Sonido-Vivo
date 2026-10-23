import { FilaPedido } from '../../molecules/FilaPedido/FilaPedido'
import { TablaAdmin } from '../TablaAdmin/TablaAdmin'

// pedidos: ya filtrados y ordenados por la página. onVer recibe el pedido completo
// mostrarCliente: columna con el nombre del cliente (panel de administración)
export function TablaPedidos(props) {
  const columnas = [
    { texto: 'N°', className: 'ps-4' },
    { texto: 'Fecha' },
    ...(props.mostrarCliente ? [{ texto: 'Cliente' }] : []),
    { texto: 'Entrega' },
    { texto: 'Total' },
    { texto: 'Estado' },
    { texto: 'Acciones', className: 'text-end pe-4' },
  ]

  return (
    <TablaAdmin
      columnas={columnas}
      vacia={props.pedidos.length === 0}
      mensajeVacio={props.mensajeVacio ?? 'No hay pedidos para mostrar.'}
    >
      {props.pedidos.map((pedido) => (
        <FilaPedido
          key={pedido.id}
          pedido={pedido}
          mostrarCliente={props.mostrarCliente}
          onVer={props.onVer}
        />
      ))}
    </TablaAdmin>
  )
}
