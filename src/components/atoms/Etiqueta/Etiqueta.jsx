import {Form} from "react-bootstrap";

export function Etiqueta({ texto, htmlFor,requerido = false, className = 'fw-semibold' }) {
  return <Form.Label htmlFor={htmlFor} className={className}>
    {texto}
    {requerido && <span className="text-danger">*</span>}
  </Form.Label>;
}

