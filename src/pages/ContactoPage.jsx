import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Contacto from "../components/organisms/Contacto";

function ContactoPage() {
  return (
    <PlantillaPublica>
      <Container className="my-5 pt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-center">Contacto</h2>
                <p className="text-center text-muted">
                  Queremos conocer tu opinión. Escríbenos tus comentarios, dudas
                  o sugerencias y estaremos encantados de leerte.
                </p>
                <Contacto />
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default ContactoPage;
