import { Col, Row } from "react-bootstrap";
import { TarjetaDestacado } from "../../molecules/TarjetaDestacado/TarjetaDestacado";

// destacados: [{ id, titulo, descripcion }]
// claseTarjeta: reemplaza las clases por defecto de cada TarjetaDestacado
export function GrillaDestacados(props) {
  const className = props.className ?? "";

  return (
    <section className={className}>
      <Row className="g-4">
        {props.destacados.map((destacado) => (
          <Col key={destacado.id} xs={12} md={4}>
            <TarjetaDestacado
              titulo={destacado.titulo}
              descripcion={destacado.descripcion}
              className={props.claseTarjeta}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}
