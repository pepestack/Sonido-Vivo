import { Form } from "react-bootstrap";

export function Selector(props){
  const opciones = props.opciones ?? []

  return(
    <Form.Select
      id={props.id}
      name={props.nombre ?? props.id}
      value={props.valor ?? ''}
      onChange={props.onChange}
      isInvalid={props.invalido ?? false}
      disabled={props.deshabilitado ?? false}
      className={props.className ?? ''}
    >
      {props.placeholder && (
        <option value="" disabled>
          {props.placeholder}
        </option>
      )}
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </Form.Select>
  )
}