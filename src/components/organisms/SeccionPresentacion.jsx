import { Col, Row } from "react-bootstrap";
import Imagen from "../atoms/Imagen";
import Titulo from "../atoms/Titulo";
import Texto from "../atoms/Texto";
import { Boton } from "../atoms/Boton/Boton";

export default function SeccionPresentacion({ titulo, texto, imagen, alt, textoBoton, rutaBoton }) {
    return (
        <section className="p-4 p-md-5 my-4 rounded-3 custom-lb-container">
            <Row className="flex-lg-row-reverse align-items-center g-5">
                <Col xs={10} sm={8} lg={4}>
                    <Imagen src={imagen} alt={alt} className="d-block mx-lg-auto img-fluid rounded-3" />
                </Col>
                <Col xs={12} lg={8}>
                    <Titulo nivel={1} className="display-4">
                        {titulo}
                    </Titulo>
                    <Texto className="lead">{texto}</Texto>
                    <hr className="my-4" />
                    <Boton tamano="lg" to={rutaBoton}>
                        {textoBoton}
                    </Boton>
                </Col>
            </Row>
        </section>
    )
}