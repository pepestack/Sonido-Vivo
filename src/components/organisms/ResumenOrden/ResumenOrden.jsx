import { Card } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Precio } from "../../atoms/Precio/Precio";
import { Titulo } from "../../atoms/Titulo/Titulo";

// items (opcional): lista compacta de lo que se compra, para el checkout
// onContinuar (opcional): sin él no se muestra el botón
export function ResumenOrden(props) {
  return (
    <Card className="shadow p-4">
      <Titulo nivel={3} className="mb-3">Orden</Titulo>
      {props.items && (
        <>
          <ul className="list-unstyled small mb-0">
            {props.items.map((item) => (
              <li key={item.id} className="d-flex justify-content-between gap-3 mb-2">
                <span>{item.cantidad} × {item.nombre}</span>
                <Precio monto={item.precio * item.cantidad} className="text-nowrap" />
              </li>
            ))}
          </ul>
          <hr />
        </>
      )}
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal:</span>
        <Precio monto={props.subtotal} />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span>Despacho:</span>
        {props.despacho > 0 ? <Precio monto={props.despacho} /> : <span>Sin costo</span>}
      </div>
      <hr />
      <div className={`d-flex justify-content-between fw-bold fs-5 ${props.onContinuar ? "mb-4" : ""}`}>
        <span>Total:</span>
        <Precio monto={props.total} className="text-success" />
      </div>
      {props.onContinuar && (
        <Boton variante="dark" className="w-100" onClick={props.onContinuar}>
          {props.textoBoton ?? "Continuar con la compra"}
        </Boton>
      )}
    </Card>
  );
}
