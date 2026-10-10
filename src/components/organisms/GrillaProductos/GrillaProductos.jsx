import { Col, Row } from "react-bootstrap";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { TarjetaProducto } from "../../molecules/TarjetaProducto/TarjetaProducto";

export function GrillaProductos({
  productos,
  onAgregar,
  titulo,
  mostrarDescripcion = false,
  className = "",
}) {
  return (
    <section className={className}>
      {titulo && (
        <Titulo nivel={2} className="mb-3">
          {titulo}
        </Titulo>
      )}
      <Row className="g-4">
        {productos.map((producto) => (
          <Col as="article" key={producto.id} xs={12} md={6} lg={4}>
            <TarjetaProducto
              producto={producto}
              onAgregar={onAgregar}
              mostrarDescripcion={mostrarDescripcion}
            />
          </Col>
        ))}
      </Row>
      {productos.length === 0 && (
        <Texto className="text-muted text-center py-5">
          No hay productos para mostrar.
        </Texto>
      )}
    </section>
  );
}
