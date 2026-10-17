import { Alert, Form } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";

export function FormularioComentario({ onNavegar }) {
  return (
    <>
      <Alert
        variant="warning"
        className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4"
      >
        <div>
          <i className="fa-solid fa-lock me-2"></i>
          Debes iniciar sesión para dejar un comentario.
        </div>

        <div className="d-flex gap-2">
          <Boton
            variante="outline-dark"
            tamano="sm"
            className="fw-bold"
            onClick={() => onNavegar("/login")}
          >
            Iniciar sesión
          </Boton>

          <Boton
            variante="naranja"
            tamano="sm"
            className="text-white fw-bold"
            onClick={() => onNavegar("/registro")}
          >
            Registrarse
          </Boton>
        </div>
      </Alert>

      <div className="mb-4 bg-light p-3 rounded border">
        <Form.Group className="mb-3" controlId="nuevo-comentario">
          <Form.Label className="small fw-bold text-muted">
            Escribe tu comentario...
          </Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Inicia sesión para escribir en la comunidad..."
            disabled
          />
        </Form.Group>

        <Boton variante="secondary" className="fw-bold" disabled>
          Publicar Comentario
        </Boton>
      </div>
    </>
  );
}