import { useState } from "react";
import { Form } from "react-bootstrap";
import Etiqueta from "../atoms/Etiqueta";
import Boton from "../atoms/Boton";

export default function Contacto() {
  const [mensaje, setMensaje] = useState("");

  function validarMensaje(e) {
    e.preventDefault();

    const mensajeValido = mensaje.trim() == "";
    setMensaje(!mensajeValido);
  }

  return (
    <Form onSubmit={validarMensaje} noValidate>
      <Etiqueta htmlFor={"contenido"} texto={"Envianos tu comentario"} />
      <textarea
        name="comentario"
        id="contenido"
        className="form-control"
        placeholder="Escribe aqui tu mensaje.."
        required

      ></textarea>
      <div className="text-center mt-3">
        <Boton texto={"Ingresar"} />
      </div>
    </Form>
  );
}
