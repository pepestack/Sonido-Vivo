import { Col, Row } from "react-bootstrap";
import { SplittingText } from "@animate-ui/react/primitives/texts/splitting";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { Texto } from "../../atoms/Texto/Texto";
import { Boton } from "../../atoms/Boton/Boton";

// children: contenido extra bajo el texto principal (ej. más párrafos)
// El botón solo se muestra si viene textoBoton
// tituloAnimado: las letras del título entran una a una (solo se usa en el Home)
export function SeccionPresentacion(props){
    const className = props.className ?? "p-4 p-md-5 my-4 rounded-3 custom-lb-container shadow-sm"
    const claseTitulo = props.claseTitulo ?? "display-4"
    const claseImagen = props.claseImagen ?? "d-block mx-lg-auto img-fluid rounded-3"
    const anchoImagen = props.anchoImagen ?? 4

    return(
        <section className={className}>
            <Row className="flex-lg-row-reverse align-items-center g-5">
                <Col xs={10} sm={8} lg={anchoImagen}>
                    <Imagen src={props.imagen} alt={props.alt} className={claseImagen}/>
                </Col>
                <Col xs={12} lg={12 - anchoImagen}>
                    {/* overflow-hidden: las letras parten desplazadas y no deben generar scroll horizontal en móvil */}
                    <Titulo nivel={1} className={props.tituloAnimado ? `${claseTitulo} overflow-hidden` : claseTitulo}>
                        {props.tituloAnimado ? <SplittingText text={props.titulo} inView /> : props.titulo}
                    </Titulo>
                    <Texto className="lead">{props.texto}</Texto>
                    {props.children}
                    {props.textoBoton && (
                        <>
                            <hr className="my-4"/>
                            <Boton tamano="lg" onClick={props.onAccion}>
                                {props.textoBoton}
                            </Boton>
                        </>
                    )}
                </Col>
            </Row>
        </section>
    )
}
