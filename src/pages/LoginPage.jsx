import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Login from "../components/organisms/Login";


function LoginPage(){
    
    return(
        <Container className="my-5 pt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                <Card className="shadow-sm">
                    <CardBody className="p-4">
                        <h2 className="text-center">Iniciar Sesión</h2>
                        <Login />
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>        
    )
}

export default LoginPage;