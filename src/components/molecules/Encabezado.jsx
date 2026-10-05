import { Col, Row } from "react-bootstrap";
import Boton from "../atoms/Boton";
import Texto from "../atoms/Texto";
import Titulo from "../atoms/Titulo";

// Título de página con subtítulo opcional y, a la derecha, un botón o contenido propio (children)
export default function EncabezadoPagina({
  titulo,
  subtitulo,
  textoBoton,
  rutaBoton,
  claseTitulo = "h2 fw-bold mb-0",
  children,
}) {
  const derecha =
    children ??
    (textoBoton && (
      <Boton variante="success" to={rutaBoton}>
        {textoBoton}
      </Boton>
    ));

  return (
    <Row as="header" className="mb-4 align-items-center">
      <Col xs={12} md={6}>
        <Titulo nivel={1} className={claseTitulo}>
          {titulo}
        </Titulo>
        {subtitulo && <Texto className="text-muted mb-0">{subtitulo}</Texto>}
      </Col>
      {derecha && (
        <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
          {derecha}
        </Col>
      )}
    </Row>
  );
}
