import { Card, Table } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Insignia } from "../../atoms/Insignia/Insignia";
import { Precio } from "../../atoms/Precio/Precio";
import { nombreCategoria } from "../../../utils/formato";

export function TablaProductos({ productos, onVer, onEliminar }) {
  return (
    <Card as="section" className="shadow-sm border-0">
      <Card.Body className="p-0">
        <Table responsive hover striped className="text-nowrap mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="ps-4">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categoría</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col" className="text-end pe-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="ps-4 fw-bold">{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{nombreCategoria(producto.categoria)}</td>
                <td><Precio monto={producto.precio} /></td>
                <td>
                  {/* en amarillo cuando llega al stock crítico */}
                  <Insignia
                    color={producto.stock <= producto.stockCritico ? "warning" : "secondary"}
                    className={producto.stock <= producto.stockCritico ? "text-dark" : ""}
                  >
                    {producto.stock}
                  </Insignia>
                </td>
                <td className="text-end pe-4">
                  <Boton variante="outline-primary" tamano="sm" onClick={() => onVer(producto.id)}>
                    Ver
                  </Boton>
                  <Boton variante="outline-danger" tamano="sm" className="ms-1" onClick={() => onEliminar(producto.id)}>
                    Eliminar
                  </Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
