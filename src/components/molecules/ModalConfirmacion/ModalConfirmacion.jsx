import { Modal } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";

export function ModalConfirmacion(props){
    return(
        <Modal show={props.visible} onHide={props.onCancelar} centered>
            <Modal.Header closeButton>
                <Modal.Title className="h5">{props.titulo ?? 'Confirmar acción'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.mensaje}</Modal.Body>
            <Modal.Footer>
                <Boton variante="outline-secondary" onClick={props.onCancelar}>
                    Cancelar
                </Boton>
                <Boton variante={props.variante ?? 'primary'} onClick={props.onConfirmar}>
                    {props.textoConfirmar ?? 'Confirmar'}
                </Boton>
            </Modal.Footer>
        </Modal>
    )
}