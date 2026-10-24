import { Insignia } from '../../atoms/Insignia/Insignia'
import { colorEstado } from '../../../utils/pedidos'

// Estado de un pedido con su color ('En preparación', 'Despachado', ...)
export function InsigniaEstado(props) {
  return (
    <Insignia color={colorEstado[props.estado] ?? 'secondary'} className={props.className}>
      {props.estado}
    </Insignia>
  )
}
