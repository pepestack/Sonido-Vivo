import {Form} from "react-bootstrap";

function Etiqueta({ texto, htmlFor }) {
  return <Form.Label htmlFor={htmlFor}>{texto}</Form.Label>;
}

export default Etiqueta;
