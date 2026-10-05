import { Card, Col, Row } from "react-bootstrap";
import Boton from "../atoms/Boton";
import Enlace from "../atoms/Enlace";
import Imagen from "../atoms/Imagen";
import Texto from "../atoms/Texto";
import Titulo from "../atoms/Titulo";

export default function TarjetaBlog({ blog }) {
  return (
    <Card
      as="article"
      className="mb-4 shadow-sm border-0 custom-lb-container"
    >
      <Row className="g-0 align-items-center p-3">
        <Col md={6} className="p-3">
          <Titulo nivel={3} className="fw-bold mb-3">
            {blog.titulo}
          </Titulo>

          <Texto className="text-muted mb-4">
            {blog.descripcion}
          </Texto>

          <Boton
            to={blog.ruta}
            variante="naranja"
            className="text-white fw-bold"
          >
            Ver caso completo
          </Boton>
        </Col>

        <Col md={6} className="text-center">
          <Enlace to={blog.ruta}>
            <Imagen
              src={blog.imagen}
              alt={blog.alt}
              className={`img-fluid rounded border w-100 blog-img-resumen ${blog.claseImagen}`.trim()}
            />
          </Enlace>
        </Col>
      </Row>
    </Card>
  );
}