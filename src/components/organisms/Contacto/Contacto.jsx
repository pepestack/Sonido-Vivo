import { useState } from "react";
import { Form } from "react-bootstrap";
import { Etiqueta } from "../../atoms/Etiqueta/Etiqueta";
import { Boton } from "../../atoms/Boton/Boton";

export function Contacto() {
  const [mensaje, setMensaje] = useState("");
  const [errorMensaje, setErrorMensaje] = useState(false);
  const [exito, setExito] = useState(false);

  function validarMensaje(e) {
    e.preventDefault();

    const mensajeValido = mensaje.trim() !== "";
    setErrorMensaje(!mensajeValido);

    setExito(mensajeValido);
  }

  return (
    <Form onSubmit={validarMensaje} noValidate>
      <Etiqueta htmlFor={"contenido"} texto={"Envianos tu comentario"} />
      <Form.Control
        as={"textarea"}
        name="comentario"
        id="contenido"
        className="form-control"
        placeholder="Escribe aqui tu mensaje.."
        value={mensaje}
        onChange={(a) => setMensaje(a.target.value)}
        isInvalid={errorMensaje}
        required
      ></Form.Control>
      <div className="text-center mt-3">
        <Boton tipo="submit">Enviar</Boton>
      </div>
      <div className="text-center mt-3">
        {exito ? (
          <strong className="text-center">¡Enviado!</strong>
        ) : (
          ""
        )}
        {errorMensaje ? (
          <strong>Enviar un mensaje valido</strong>
        ) : (
          ""
        )}
      </div>
    </Form>
  );
}
