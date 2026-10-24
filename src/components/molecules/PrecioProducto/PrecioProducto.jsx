import { Insignia } from "../../atoms/Insignia/Insignia";
import { Precio } from "../../atoms/Precio/Precio";
import { precioFinal } from "../../../utils/precios";

// Precio que se cobra; si el producto está en oferta, muestra además el precio normal tachado
export function PrecioProducto(props) {
  const producto = props.producto;
  const enOferta = producto.precioOferta !== undefined;

  return (
    <span className={props.className ?? ""}>
      <Precio monto={precioFinal(producto)} />
      {enOferta && (
        <>
          <Precio monto={producto.precio} className="fs-6 fw-normal text-muted text-decoration-line-through ms-2" />
          <Insignia color="danger" className="fs-6 ms-2 align-middle">Oferta</Insignia>
        </>
      )}
    </span>
  );
}
