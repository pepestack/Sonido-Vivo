import { Alert } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Icono } from "../../atoms/Icono/Icono";
import { CampoFormulario } from "../CampoFormulario/CampoFormulario";

export function FormularioComentario(props) {
  return (
    <>
      <Alert
        variant="warning"
        className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4"
      >
        <div>
          <Icono icono="fa-solid fa-lock" className="me-2" />
          Debes iniciar sesión para dejar un comentario.
        </div>

        <div className="d-flex gap-2">
          <Boton
            variante="outline-dark"
            tamano="sm"
            className="fw-bold"
            onClick={() => props.onNavegar("/login")}
          >
            Iniciar sesión
          </Boton>

          <Boton
            variante="naranja"
            tamano="sm"
            className="text-white fw-bold"
            onClick={() => props.onNavegar("/registro")}
          >
            Registrarse
          </Boton>
        </div>
      </Alert>

      <div className="mb-4 bg-light p-3 rounded border">
        <CampoFormulario
          id="nuevo-comentario"
          etiqueta="Escribe tu comentario..."
          tipo="textarea"
          placeholder="Inicia sesión para escribir en la comunidad..."
          claseEtiqueta="small fw-bold text-muted"
          deshabilitado
        />

        <Boton variante="secondary" className="fw-bold" disabled>
          Publicar Comentario
        </Boton>
      </div>
    </>
  );
}
