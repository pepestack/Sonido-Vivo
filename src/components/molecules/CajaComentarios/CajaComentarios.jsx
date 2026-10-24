import { Card } from "react-bootstrap";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

export function CajaComentarios(props) {
  const comentario = props.comentario

  return (
    <Card
      as="article"
      className="mb-4 border-0 border-bottom rounded-0"
    >
      <Card.Body className="d-flex gap-3">

        <div className="flex-shrink-0">
          <Avatar>{comentario.iniciales}</Avatar>
        </div>

        <div className="flex-grow-1 overflow-hidden">
          <Titulo nivel={5} className="fw-bold mb-1 fs-6">
            {comentario.usuario}
          </Titulo>

          <Texto className="text-muted small mb-2">
            {comentario.fecha}
          </Texto>

          {comentario.tipo === "ascii" ? (
            <Texto como="pre" className="mb-0 text-dark overflow-auto">
              {comentario.texto}
            </Texto>
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