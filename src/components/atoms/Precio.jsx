import { formatoDinero } from '../../utils/formato'

export default function Precio({ monto, className = '' }) {
  return <span className={className}>{formatoDinero(monto)}</span>
}
