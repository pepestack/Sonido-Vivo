import { Form } from "react-bootstrap";

export function AreaTexto(props) {
  return (
    <Form.Control
      as="textarea"
      id={props.id}
      name={props.nombre ?? props.id}
      rows={props.filas ?? 3}
      value={props.valor ?? ''}
      onChange={props.onChange}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      isInvalid={props.invalido ?? false}
      disabled={props.deshabilitado ?? false}
    />
  )
}