import { Card, Table } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Precio } from "../../atoms/Precio/Precio";
import { Selector } from "../../atoms/Selector/Selector";
import { limiteDe, opcionesCantidad } from "../../../utils/carrito";

// items: [{ id, nombre, precio, stock, cantidad }]
export function TablaCarrito(props) {
  return (
    <Card className="shadow p-4">
      <Table responsive className="align-middle mb-0">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr key={item.id}>
              <td className="fw-bold">{item.nombre}</td>
              <td><Precio monto={item.precio} /></td>
              <td>
                <Selector
                  id={`cantidad-${item.id}`}
                  valor={item.cantidad}
                  opciones={opcionesCantidad(limiteDe(item))}
                  onChange={(evento) => props.onCambiarCantidad(item.id, Number(evento.target.value))}
                  className="cantidad-carrito"
                />
              </td>
              <td><Precio monto={item.precio * item.cantidad} /></td>
              <td>
                <Boton variante="danger" tamano="sm" onClick={() => props.onQuitar(item.id)}>
                  Eliminar
                </Boton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
