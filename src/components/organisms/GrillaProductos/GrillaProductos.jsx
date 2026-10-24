import { Col, Row } from "react-bootstrap";
import { Effect } from "@animate-ui/react/primitives/effects/effect";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { AvisoVacio } from "../../molecules/AvisoVacio/AvisoVacio";
import { TarjetaProducto } from "../../molecules/TarjetaProducto/TarjetaProducto";

// animado: las tarjetas aparecen una tras otra al entrar en pantalla (solo se usa en el Home)
// nivelTitulo: 1 cuando la grilla es lo principal de la página (ej. Ofertas); se ve igual en ambos casos
export function GrillaProductos(props) {
  return (
    <section className={props.className ?? ""}>
      {props.titulo && (
        <Titulo nivel={props.nivelTitulo ?? 2} className="h2 mb-3">
          {props.titulo}
        </Titulo>
      )}
      <Row className="g-4">
        {props.productos.map((producto, indice) => {
          const tarjeta = (
            <TarjetaProducto
              producto={producto}
              onAgregar={props.onAgregar}
              onNavegar={props.onNavegar}
              mostrarDescripcion={props.mostrarDescripcion ?? false}
            />
          );
          // el Effect va dentro del Col para no romper la grilla de Bootstrap (Row > Col)
          return (
            <Col as="article" key={producto.id} xs={12} md={6} lg={4}>
              {props.animado ? (
                <Effect fade slide blur inView delay={indice * 120} className="h-100">
                  {tarjeta}
                </Effect>
              ) : (
                tarjeta
              )}
            </Col>
          );
        })}
      </Row>
      {props.productos.length === 0 && <AvisoVacio texto="No hay productos para mostrar." />}
    </section>
  );
}
