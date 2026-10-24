import { Card, Col, Row } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Enlace } from "../../atoms/Enlace/Enlace";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

export function TarjetaBlog(props) {
  const blog = props.blog;

  return (
    <Card
      as="article"
      className="mb-4 shadow-sm border-0 custom-lb-container"
    >
      <Row className="g-0 align-items-center p-3">
        <Col md={6} className="p-3">
          <Titulo nivel={2} className="h3 fw-bold mb-3">
            {blog.titulo}
          </Titulo>

          <Texto className="text-muted mb-4">
            {blog.descripcion}
          </Texto>

          <Boton
            onClick={() => props.onNavegar(blog.ruta)}
            variante="naranja"
            className="text-white fw-bold"
          >
            Ver caso completo
          </Boton>
        </Col>

        <Col md={6} className="text-center">
          <Enlace ruta={blog.ruta} onNavegar={props.onNavegar}>
            <Imagen
              src={blog.imagen}
              alt={blog.alt}
              className={`img-fluid rounded border w-100 object-fit-cover blog-img-resumen ${blog.claseImagen ?? ''}`.trim()}
            />
          </Enlace>
        </Col>
      </Row>
    </Card>
  );
}
