import { Card } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Precio } from "../../atoms/Precio/Precio";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { ResumenTotales } from "../../molecules/ResumenTotales/ResumenTotales";

// items (opcional): lista compacta de lo que se compra, para el checkout
// onContinuar (opcional): sin él no se muestra el botón
export function ResumenOrden(props) {
  return (
    <Card className="shadow p-4">
      <Titulo nivel={2} className="h3 mb-3">Orden</Titulo>
      {props.items && (
        <>
          <ul className="list-unstyled small mb-0">
            {props.items.map((item) => (
              <li key={item.id} className="d-flex justify-content-between gap-3 mb-2">
                <Texto como="span">{item.cantidad} × {item.nombre}</Texto>
                <Precio monto={item.precio * item.cantidad} className="text-nowrap" />
              </li>
            ))}
          </ul>
          <hr />
        </>
      )}
      <ResumenTotales subtotal={props.subtotal} despacho={props.despacho} total={props.total} />
      {props.onContinuar && (
        <Boton variante="dark" className="w-100 mt-4" onClick={props.onContinuar}>
          {props.textoBoton ?? "Continuar con la compra"}
        </Boton>
      )}
    </Card>
  );
}
