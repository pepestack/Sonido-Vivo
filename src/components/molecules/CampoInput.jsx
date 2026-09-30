import Etiqueta from "../atoms/Etiqueta";
import { Form } from "react-bootstrap";

function CampoInput({ texto, id, type, placeholder, value, onChange, validar }) {
  return (
    <Form.Group className="mb-3">
      <Etiqueta texto={texto} htmlFor={id} />
      <Form.Control
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={validar}
      />
    </Form.Group>
  );
}

export default CampoInput;
