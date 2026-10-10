import {Form} from "react-bootstrap";

export function Etiqueta(props){
  return (
    <Form.Label htmlFor={props.htmlFor} className={props.className ?? 'fw-semibold'}>
      {props.children}
      {props.requerido && <span className="text-danger">*</span>}
    </Form.Label>
  )
}

