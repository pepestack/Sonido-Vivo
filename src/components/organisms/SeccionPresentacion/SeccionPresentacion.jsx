import { Col, Row } from "react-bootstrap";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { Texto } from "../../atoms/Texto/Texto";
import { Boton } from "../../atoms/Boton/Boton";

export function SeccionPresentacion(props){
    return(
        <section className="p-4 p-md-5 my-4 rounded-3 custom-lb-container">
            <Row className="flex-lg-row-reverse align-items-center g-5">
                <Col xs={10} sm={8} lg={4}>
                    <Imagen src={props.imagen} alt={props.alt} className="d-block mx-lg-auto img-fluid rounded-3"/>
                </Col>
                <Col xs={12} lg={8}>
                    <Titulo nivel={1} className="display-4">
                        {props.titulo}
                    </Titulo>
                    <Texto className="lead">{props.texto}</Texto>
                    <hr className="my-4"/>
                    <Boton tamano="lg" onClick={props.onAccion}>
                        {props.textoBoton}
                    </Boton>
                </Col>
            </Row>
        </section>
    )
}