import { Card } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Enlace } from "../../atoms/Enlace/Enlace";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { PrecioProducto } from "../PrecioProducto/PrecioProducto";

export function TarjetaProducto(props) {
  const producto = props.producto;
  const mostrarDescripcion = props.mostrarDescripcion ?? false;
  const sinStock = producto.stock < 1;
  const rutaDetalle = `/producto/${producto.id}`;

  return (
    <Card className="h-100 shadow-sm">
      <Enlace ruta={rutaDetalle} onNavegar={props.onNavegar}>
        <Imagen
          src={producto.imagen}
          alt={producto.nombre}
          className="card-img-top producto-img object-fit-cover"
        />
      </Enlace>
      <Card.Body className="d-flex flex-column">
        <Titulo nivel={2} className="card-title h5">
          <Enlace ruta={rutaDetalle} onNavegar={props.onNavegar} className="text-reset text-decoration-none">
            {producto.nombre}
          </Enlace>
        </Titulo>
        {mostrarDescripcion && (
          <Texto className="card-text text-muted mb-2">
            {producto.descripcion}
          </Texto>
        )}
        <Texto className="card-text fs-4 fw-bold text-primary mt-auto">
          <PrecioProducto producto={producto} />
        </Texto>
        <Boton className="w-100 mt-2" disabled={sinStock} onClick={() => props.onAgregar(producto)}>
          {sinStock ? "Sin stock" : "Añadir al carrito"}
        </Boton>
      </Card.Body>
    </Card>
  );
}
