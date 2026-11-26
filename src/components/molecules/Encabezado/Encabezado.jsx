import { Col, Row } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Icono } from "../../atoms/Icono/Icono";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

// Título de página con subtítulo opcional y, a la derecha, un botón o contenido propio (children).
// onRefrescar agrega antes del botón uno solo con ícono para volver a cargar los datos;
// refrescando lo deshabilita mientras carga
export function Encabezado(props) {
  const claseTitulo = props.claseTitulo ?? "h2 fw-bold mb-0";
  const botones = (props.onRefrescar || props.textoBoton) && (
    <>
      {props.onRefrescar && (
        <Boton
          variante="success"
          className={props.textoBoton ? "me-2" : ""}
          onClick={props.onRefrescar}
          disabled={props.refrescando}
          etiquetaAccesible="Actualizar"
        >
          <Icono icono="bi bi-arrow-clockwise" />
        </Boton>
      )}
      {props.textoBoton && (
        <Boton variante="success" onClick={props.onAccion}>
          {props.textoBoton}
        </Boton>
      )}
    </>
  );
  const derecha = props.children ?? botones;

  return (
    <Row as="header" className="mb-4 align-items-center">
      <Col xs={12} md={6}>
        <Titulo nivel={1} className={claseTitulo}>
          {props.titulo}
        </Titulo>
        {props.subtitulo && <Texto className="text-muted mb-0">{props.subtitulo}</Texto>}
      </Col>
      {derecha && (
        <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
          {derecha}
        </Col>
      )}
    </Row>
  );
}
