import { Card } from "react-bootstrap";
import Texto from "../atoms/Texto";
import Titulo from "../atoms/Titulo";

export default function CajaComentarios({ comentario }) {
  return (
    <Card
      as="article"
      className="mb-4 border-0 border-bottom rounded-0"
    >
      <Card.Body className="d-flex gap-3">

        <div className="flex-shrink-0">
          <div className="perfil-comentario bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold">
            {comentario.iniciales}
          </div>
        </div>

        <div className="flex-grow-1 overflow-hidden">
          <Titulo nivel={5} className="fw-bold mb-1 fs-6">
            {comentario.usuario}
          </Titulo>

          <Texto className="text-muted small mb-2">
            {comentario.fecha}
          </Texto>

          {comentario.tipo === "ascii" ? (
            <pre className="mb-0 text-dark overflow-auto">
              {comentario.texto}
            </pre>
          ) : (
            <Texto className="mb-0 text-dark">
              {comentario.texto}
            </Texto>
          )}
        </div>

      </Card.Body>
    </Card>
  );
}