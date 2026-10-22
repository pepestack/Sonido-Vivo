import { Col, Row } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Titulo } from "../../atoms/Titulo/Titulo";

// Accesos rápidos del Home a cada categoría del catálogo
// categorias: [{ valor, texto, cantidad }]; onNavegar(ruta) lleva a /categoria/:valor
export function GrillaCategorias(props) {
  return (
    <section className={props.className ?? ""}>
      {props.titulo && (
        <Titulo nivel={2} className="mb-3">
          {props.titulo}
        </Titulo>
      )}
      <Row className="g-3">
        {props.categorias.map((categoria) => (
          <Col key={categoria.valor} xs={6} md={4} lg={3}>
            <Boton
              variante="outline-dark"
              className="w-100 h-100 py-3"
              onClick={() => props.onNavegar(`/categoria/${categoria.valor}`)}
            >
              <span className="d-block fw-bold">{categoria.texto}</span>
              <small>{categoria.cantidad} productos</small>
            </Boton>
          </Col>
        ))}
      </Row>
    </section>
  );
}
