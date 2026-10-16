import { Card } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Precio } from "../../atoms/Precio/Precio";
import { Titulo } from "../../atoms/Titulo/Titulo";

export function ResumenOrden({ subtotal, despacho, total, onContinuar }) {
  return (
    <Card className="shadow p-4">
      <Titulo nivel={3} className="mb-3">Orden</Titulo>
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal:</span>
        <Precio monto={subtotal} />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span>Despacho:</span>
        <Precio monto={despacho} />
      </div>
      <hr />
      <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
        <span>Total:</span>
        <Precio monto={total} className="text-success" />
      </div>
      <Boton variante="dark" className="w-100" onClick={onContinuar} disabled={!onContinuar}>
        Continuar con la compra
      </Boton>
    </Card>
  );
}
