import { Card } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

export function TarjetaAccion({ titulo, texto, textoBoton, ruta }) {
  return (
    <Card className="custom-lb-container h-100 shadow-sm border-0">
      <Card.Body className="text-center p-5">
        <Titulo nivel={2} className="h3 card-title text-primary mb-3">
          {titulo}
        </Titulo>
        <Texto className="card-text text-muted mb-4">{texto}</Texto>
        <Boton tamano="lg" to={ruta} className="w-100">
          {textoBoton}
        </Boton>
      </Card.Body>
    </Card>
  );
}
