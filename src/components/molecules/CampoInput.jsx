import Etiqueta from "../atoms/Etiqueta";
import { Form } from "react-bootstrap";

function CampoInput({ texto, id, type, placeholder, value, onChange }) {
  return (
    <Form.Group className="mb-3">
      <Etiqueta texto={texto} htmlFor={id} />
      <Form.Control />
    </Form.Group >
  );
}

export default CampoInput;
