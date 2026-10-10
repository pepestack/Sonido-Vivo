import { Card } from "react-bootstrap";
import { Boton } from "../atoms/Boton/Boton";
import { Enlace } from "../atoms/Enlace/Enlace";
import Imagen from "../atoms/Imagen";
import Precio from "../atoms/Precio";
import Texto from "../atoms/Texto";
import Titulo from "../atoms/Titulo";

export default function TarjetaProducto({
  producto,
  onAgregar,
  mostrarDescripcion = false,
}) {
  const rutaDetalle = `/producto/${producto.id}`;

  return (
    <Card className="h-100 shadow-sm">
      <Enlace to={rutaDetalle}>
        <Imagen
          src={producto.imagen}
          alt={producto.nombre}
          className="card-img-top producto-img"
        />
      </Enlace>
      <Card.Body className="d-flex flex-column">
        <Titulo nivel={2} className="card-title h5">
          <Enlace to={rutaDetalle} className="text-reset text-decoration-none">
            {producto.nombre}
          </Enlace>
        </Titulo>
        {mostrarDescripcion && (
          <Texto className="card-text text-muted mb-2">
            {producto.descripcion}
          </Texto>
        )}
        <Texto className="card-text fs-4 fw-bold text-primary mt-auto">
          <Precio monto={producto.precio} />
        </Texto>
        <Boton className="w-100 mt-2" onClick={() => onAgregar(producto)}>
          Añadir al carrito
        </Boton>
      </Card.Body>
    </Card>
  );
}
