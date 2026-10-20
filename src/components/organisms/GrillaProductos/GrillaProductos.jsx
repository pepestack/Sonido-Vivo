import { Col, Row } from "react-bootstrap";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { TarjetaProducto } from "../../molecules/TarjetaProducto/TarjetaProducto";

export function GrillaProductos(props) {
  return (
    <section className={props.className ?? ""}>
      {props.titulo && (
        <Titulo nivel={2} className="mb-3">
          {props.titulo}
        </Titulo>
      )}
      <Row className="g-4">
        {props.productos.map((producto) => (
          <Col as="article" key={producto.id} xs={12} md={6} lg={4}>
            <TarjetaProducto
              producto={producto}
              onAgregar={props.onAgregar}
              onNavegar={props.onNavegar}
              mostrarDescripcion={props.mostrarDescripcion ?? false}
            />
          </Col>
        ))}
      </Row>
      {props.productos.length === 0 && (
        <Texto className="text-muted text-center py-5">
          No hay productos para mostrar.
        </Texto>
      )}
    </section>
  );
}
