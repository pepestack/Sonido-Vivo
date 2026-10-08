import { Row, Col, Card } from "react-bootstrap";
import Imagen from "../components/atoms/Imagen";
import Texto from "../components/atoms/Texto";
import Titulo from "../components/atoms/Titulo";
import { nosotros } from "../data/nosotros";

export default function NosotrosPage() {
  return (
    <>
      <Row className="align-items-center mb-5">
        <Col xs={12} lg={6} className="mb-4 mb-lg-0">
          <Card className="h-100 border-0 shadow-sm bg-light">
            <Card.Body className="p-4">
              <Titulo nivel={1} className="display-5 fw-bold mb-3">
                {nosotros.titulo}
              </Titulo>

              <Texto className="lead text-muted">
                {nosotros.subtitulo}
              </Texto>

              {nosotros.historia.map(parrafo => (
                <Texto key={parrafo.id}>
                  {parrafo.texto}
                </Texto>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={6} className="text-center">
          <Imagen
            src={nosotros.imagen}
            alt={nosotros.alt}
            className="img-fluid rounded shadow-lg w-75"
          />
        </Col>
      </Row>

      <Row className="text-center g-4 mt-2">
        {nosotros.destacados.map(destacado => (
          <Col xs={12} md={4} key={destacado.id}>
            <Card className="h-100 border-0 shadow-sm bg-light">
              <Card.Body className="p-4">
                <Titulo nivel={3} className="h4 text-primary">
                  {destacado.titulo}
                </Titulo>

                <Texto className="mb-0">
                  {destacado.descripcion}
                </Texto>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}