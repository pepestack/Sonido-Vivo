import { Col, Container, Row } from "react-bootstrap";
import Icono from "../atoms/Icono";
import Titulo from "../atoms/Titulo";
import ListaEnlaces from "../molecules/ListaEnlaces";
import Texto from "../atoms/Texto";
import FormularioNewsletter from "../molecules/FormularioNewsletter";
import { footerCuenta, footerInfo } from "../../data/navegacion";

export default function Footer(){
    return (
        <footer className="footer pt-5">
            <Container>
                <Row className="g-4 text-white">
                    <Col xs={12} md={6} lg={3}>
                        <Titulo nivel={3}>Sonido Vivo</Titulo>
                        <div className="mb-4">
                            <Icono clase="fa-brands fa-cc-visa fa-2x" className="me-2"/>
                            <Icono clase="fa-brands fa-cc-mastercard fa-2x"/>
                        </div>
                    </Col>

                    <Col xs={12} md={6} lg={2}>
                        <ListaEnlaces titulo="Información" enlaces={footerInfo}/>
                    </Col>

                    <Col xs={12} md={6} lg={3}>
                        <ListaEnlaces titulo="Mi Cuenta" enlaces={footerCuenta}/>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                        <Titulo nivel={3}>Newsletter</Titulo>
                        <Texto className="mb-4">¡Suscríbete al Newsletter y entérate primero de nuestras ofertas!</Texto>
                        <FormularioNewsletter/>
                    </Col>
                </Row>
            </Container>

            <div className="bg-dark mt-5">
                <Container>
                    <Row className="py-3 text-white">
                        <Col xs={12} md={6} className="text-center text-md-start">
                            <Texto className="mb-0">&copy; 2026 Sonido Vivo</Texto>
                        </Col>
                        <Col xs={12} md={6} className="text-center text-md-end">
                            <Texto className="mb-0">DSY1104</Texto>
                        </Col>
                    </Row> 
                </Container>
            </div>
        </footer>
    )
}