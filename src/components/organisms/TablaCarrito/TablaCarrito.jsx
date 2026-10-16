import { Card, Table } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Entrada } from "../../atoms/Entrada/Entrada";
import { Precio } from "../../atoms/Precio/Precio";

// items: [{ id, nombre, precio, cantidad }]
export function TablaCarrito({ items, onCambiarCantidad, onQuitar }) {
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
          {items.map((item) => (
            <tr key={item.id}>
              <td className="fw-bold">{item.nombre}</td>
              <td><Precio monto={item.precio} /></td>
              <td>
                <Entrada
                  id={`cantidad-${item.id}`}
                  tipo="number"
                  min={1}
                  valor={item.cantidad}
                  etiquetaAccesible={`Cantidad de ${item.nombre}`}
                  onChange={(evento) => onCambiarCantidad(item.id, Number(evento.target.value))}
                  tamano="sm"
                  className="cantidad-carrito"
                />
              </td>
              <td><Precio monto={item.precio * item.cantidad} /></td>
              <td>
                <Boton variante="danger" tamano="sm" onClick={() => onQuitar(item.id)}>
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
