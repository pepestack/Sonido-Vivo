import { Form } from "react-bootstrap"

export function Entrada(props){
    const tipo = props.tipo ?? 'text'

    return (
        <Form.Control
            id={props.id}
            name={props.nombre ?? props.id}
            type={tipo}
            value={tipo === 'file' ? undefined : (props.valor ?? '')}
            onChange={props.onChange}
            maxLength={props.maxLength}
            min={props.min}
            accept={props.accept}
            aria-label={props.etiquetaAccesible}
            isInvalid={props.invalido ?? false}
            disabled={props.deshabilitado ?? false}
            size={props.tamano}
            className={props.className ?? ''}
        />
    )
}