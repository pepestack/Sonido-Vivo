import { Precio } from '../../atoms/Precio/Precio'
import { Texto } from '../../atoms/Texto/Texto'

// Subtotal, despacho y total de una compra: lo usan el resumen de la orden y el comprobante
export function ResumenTotales(props) {
  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <Texto como="span">Subtotal:</Texto>
        <Precio monto={props.subtotal} />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <Texto como="span">Despacho:</Texto>
        {props.despacho > 0 ? <Precio monto={props.despacho} /> : <Texto como="span">Sin costo</Texto>}
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-bold fs-5">
        <Texto como="span">Total:</Texto>
        <Precio monto={props.total} className="text-success" />
      </div>
    </>
  )
}
