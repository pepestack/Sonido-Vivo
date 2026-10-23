import { Precio } from '../../atoms/Precio/Precio'

// Subtotal, despacho y total de una compra: lo usan el resumen de la orden y el comprobante
export function ResumenTotales(props) {
  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal:</span>
        <Precio monto={props.subtotal} />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span>Despacho:</span>
        {props.despacho > 0 ? <Precio monto={props.despacho} /> : <span>Sin costo</span>}
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-bold fs-5">
        <span>Total:</span>
        <Precio monto={props.total} className="text-success" />
      </div>
    </>
  )
}
