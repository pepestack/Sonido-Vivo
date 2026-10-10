import { formatoDinero } from '../../../utils/formato'

export function Precio({ monto, className = '' }) {
  return <span className={className}>{formatoDinero(monto)}</span>
}
