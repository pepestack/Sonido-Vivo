import { Card, Col, Container, Row } from "react-bootstrap";
import { Register } from "../components/organisms/Register/Register";
import { Link } from "react-router-dom";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";

function RegisterPage() {
  return (
    <Container className="my-5 pt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4 custom-lb-container">
              <h2 className="text-center">Registrate</h2>
              <Register />
              <div className="text-center mt-3">
                <p className="mb-0">¿Ya tienes una cuenta? </p>
                <Link to="/login">Iniciar sesión</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
