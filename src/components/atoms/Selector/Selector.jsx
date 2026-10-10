import { Form } from "react-bootstrap";

// opciones: [{ valor, texto }]. placeholder: primera opción deshabilitada (opcional)
export function Selector({
  id,
  nombre,
  valor,
  onChange,
  opciones = [],
  placeholder,
  invalido = false,
  deshabilitado = false,
  className = "",
}) {
  return (
    <Form.Select
      id={id}
      name={nombre ?? id}
      value={valor ?? ""}
      onChange={onChange}
      isInvalid={invalido}
      disabled={deshabilitado}
      className={className}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </Form.Select>
  );
}
