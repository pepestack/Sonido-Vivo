import { Card } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

// Tarjeta centrada con título y descripción. El botón solo se muestra si viene textoBoton
export function TarjetaDestacado(props) {
  const className = props.className ?? "h-100 border-0 shadow-sm custom-lb-container";

  return (
    <Card className={className}>
      <Card.Body className="p-4 text-center">
        <Titulo nivel={2} className="h4 text-primary">
          {props.titulo}
        </Titulo>
        <Texto className="mb-0">{props.descripcion}</Texto>
        {props.textoBoton && (
          <Boton tamano="lg" onClick={props.onAccion} className="w-100 mt-4">
            {props.textoBoton}
          </Boton>
        )}
      </Card.Body>
    </Card>
  );
}
