import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Boton } from "../../atoms/Boton/Boton";
import { Etiqueta } from "../../atoms/Etiqueta/Etiqueta";
import { Icono } from "../../atoms/Icono/Icono";
import { Imagen } from "../../atoms/Imagen/Imagen";
import { MensajeEstado } from "../../atoms/MensajeEstado/MensajeEstado";
import { Precio } from "../../atoms/Precio/Precio";
import { Selector } from "../../atoms/Selector/Selector";
import { Texto } from "../../atoms/Texto/Texto";
import { Titulo } from "../../atoms/Titulo/Titulo";

const MAXIMO_POR_COMPRA = 5;

// Vista completa de un producto. Es dueña de la cantidad elegida y avisa al padre con onAgregar(producto, cantidad)
export function FichaProducto({ producto, onAgregar }) {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  const sinStock = producto.stock < 1;
  const tope = Math.min(MAXIMO_POR_COMPRA, producto.stock);
  const opciones = Array.from({ length: tope }, (_, i) => ({ valor: i + 1, texto: i + 1 }));

  function agregar() {
    onAgregar(producto, cantidad);
    setMensaje(`Se agregaron ${cantidad} unidad(es) al carrito.`);
  }

  return (
    <Row as="section">
      <Col md={6} className="mb-4">
        <Card>
          <Imagen src={producto.imagen} alt={producto.nombre} className="card-img-top" />
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
          <Precio monto={producto.precio} />
        </Texto>
        <Texto className="mb-4">{producto.descripcion}</Texto>

        {sinStock ? (
          <MensajeEstado tipo="error" className="mb-4">Producto sin stock</MensajeEstado>
        ) : (
          <>
            <div className="d-flex align-items-center mb-4">
              <Etiqueta htmlFor="cantidad" className="me-2 mb-0">Cantidad:</Etiqueta>
              <Selector
                id="cantidad"
                valor={cantidad}
                opciones={opciones}
                onChange={(evento) => setCantidad(Number(evento.target.value))}
                className="w-auto"
              />
            </div>
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
