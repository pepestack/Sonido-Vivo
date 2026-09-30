import { Card, Col, Container, Row } from "react-bootstrap";
import Login from "../components/organisms/Login";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <Container className="my-5 pt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center">Iniciar Sesión</h2>
              <Login />
              <div className="text-center mt-3">
                <p className="mb-0">
                  ¿No tienes cuenta?
                </p>
                <Link to="/registro">Registrarse</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
