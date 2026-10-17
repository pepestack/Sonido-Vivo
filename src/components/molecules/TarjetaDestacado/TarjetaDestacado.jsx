import { Card } from "react-bootstrap";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

export function TarjetaDestacado(props) {
  const className = props.className ?? "h-100 border-0 shadow-sm custom-lb-container";

  return (
    <Card className={className}>
      <Card.Body className="p-4 text-center">
        <Titulo nivel={3} className="h4 text-primary">
          {props.titulo}
        </Titulo>
        <Texto className="mb-0">{props.descripcion}</Texto>
      </Card.Body>
    </Card>
  );
}
