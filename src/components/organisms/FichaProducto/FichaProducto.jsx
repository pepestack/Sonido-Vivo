import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Icono } from "../../atoms/Icono/Icono";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { MensajeEstado } from "../../atoms/MensajeEstado/MensajeEstado";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";
import { limiteDe, opcionesCantidad } from "../../../services/carritoService";
import { PrecioProducto } from "../../molecules/PrecioProducto/PrecioProducto";
import { SelectorEnLinea } from "../../molecules/SelectorEnLinea/SelectorEnLinea";

// Vista completa de un producto. Es dueña de la cantidad elegida y avisa al padre con onAgregar(producto, cantidad)
// enCarrito: unidades de este producto que ya están en el carrito
export function FichaProducto(props) {
  const producto = props.producto;
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const sinStock = producto.stock < 1;
  const disponible = limiteDe(producto) - (props.enCarrito ?? 0);
  const opciones = opcionesCantidad(disponible);
  const cantidadElegida = Math.min(cantidad, disponible);

  function agregar() {
    props.onAgregar(producto, cantidadElegida);
    setMensaje(`Se agregaron ${cantidadElegida} unidad(es) al carrito.`);
    setCantidad(1);
  }

  return (
    <Row as="section">
      <Col md={6} className="mb-4">
        <Card>
          <Imagen src={producto.imagen} alt={producto.nombre} className="card-img-top" zoom />
          {producto.galeria.length > 0 && (
            <Card.Body className="custom-lb-container">
              <Row className="g-2">
                {producto.galeria.map((imagen, indice) => (
                  <Col xs={3} key={imagen}>
                    <div className="ratio ratio-4x3">
                      <Imagen
                        src={imagen}
                        alt={`Miniatura ${indice + 1} de ${producto.nombre}`}
                        className="img-thumbnail object-fit-cover"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          )}
        </Card>
      </Col>

      <Col md={6}>
        <Titulo nivel={1} className="h2 mb-3">{producto.nombre}</Titulo>
        <Texto className="h4 mb-3">
          <PrecioProducto producto={producto} />
        </Texto>
        <Texto className="mb-4">{producto.descripcion}</Texto>

        {sinStock ? (
          <MensajeEstado tipo="error" className="mb-4">Producto sin stock</MensajeEstado>
        ) : disponible < 1 ? (
          <MensajeEstado tipo="neutro" className="mb-4">Ya tienes el máximo disponible de este producto en el carrito.</MensajeEstado>
        ) : (
          <>
            <SelectorEnLinea
              id="cantidad"
              etiqueta="Cantidad:"
              valor={cantidadElegida}
              opciones={opciones}
              onCambiar={(valor) => setCantidad(Number(valor))}
              className="mb-4"
            />
            <Boton className="w-100 py-3" onClick={agregar}>
              Añadir a carrito
            </Boton>
            <MensajeEstado>{mensaje}</MensajeEstado>
          </>
        )}

        <div className="mt-4">
          <Texto className="d-flex align-items-center mb-2">
            <Icono icono="fas fa-truck" className="text-primary me-2" />
            Despachos a todo Chile
          </Texto>
          <Texto className="d-flex align-items-center">
            <Icono icono="fas fa-shield-alt" className="text-primary me-2" />
            Garantía de 6 meses por problemas de fábrica
          </Texto>
        </div>
      </Col>
    </Row>
  );
}
