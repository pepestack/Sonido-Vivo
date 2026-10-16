import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Titulo } from "../components/atoms/Titulo/Titulo";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { ResumenOrden } from "../components/organisms/ResumenOrden/ResumenOrden";
import { TablaCarrito } from "../components/organisms/TablaCarrito/TablaCarrito";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useCarrito } from "../context/CarritoContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function CarritoPage() {
  const navigate = useNavigate();
  const carrito = useCarrito();
  useTituloPagina("Carrito");

  if (carrito.items.length === 0) {
    return (
      <PlantillaPublica>
        <AvisoVacio
          titulo="Tu carrito está vacío"
          texto="Agrega productos desde el catálogo para comenzar tu compra."
          textoBoton="Ir al catálogo"
          onAccion={() => navigate("/catalogo")}
        />
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <Titulo nivel={2} className="mb-4">Carrito de compras</Titulo>
      <Row>
        <Col xs={12} lg={8} className="mb-4">
          <TablaCarrito
            items={carrito.items}
            onCambiarCantidad={carrito.cambiarCantidad}
            onQuitar={carrito.quitarDelCarrito}
          />
        </Col>
        <Col xs={12} lg={4}>
          {/* onContinuar queda pendiente hasta tener el flujo de pedido -> confirmación (G13, semana 10) */}
          <ResumenOrden
            subtotal={carrito.subtotal}
            despacho={carrito.despacho}
            total={carrito.total}
          />
        </Col>
      </Row>
    </PlantillaPublica>
  );
}
