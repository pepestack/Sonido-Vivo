import { formatoDinero } from '../../../utils/formato'

export function Precio(props){
  return <span className={props.className ?? ''}>{formatoDinero(props.monto)}</span>
}
