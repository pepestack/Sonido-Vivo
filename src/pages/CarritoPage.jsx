import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Boton } from "../components/atoms/Boton/Boton";
import { Titulo } from "../components/atoms/Titulo/Titulo";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { ModalConfirmacion } from "../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { ResumenOrden } from "../components/organisms/ResumenOrden/ResumenOrden";
import { TablaCarrito } from "../components/organisms/TablaCarrito/TablaCarrito";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useCarrito } from "../context/CarritoContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function CarritoPage() {
  const navigate = useNavigate();
  const carrito = useCarrito();
  const [confirmando, setConfirmando] = useState(false);
  useTituloPagina("Carrito");

  function limpiar() {
    carrito.vaciarCarrito();
    setConfirmando(false);
  }

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
      <Titulo nivel={1} className="h2 mb-4">Carrito de compras</Titulo>
      <Row>
        <Col xs={12} lg={8} className="mb-4">
          <TablaCarrito
            items={carrito.items}
            onCambiarCantidad={carrito.cambiarCantidad}
            onQuitar={carrito.quitarDelCarrito}
          />
          <div className="d-flex flex-wrap justify-content-between gap-2 mt-3">
            <Boton variante="outline-secondary" onClick={() => navigate("/catalogo")}>
              Seguir comprando
            </Boton>
            <Boton variante="outline-danger" onClick={() => setConfirmando(true)}>
              Limpiar carrito
            </Boton>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <ResumenOrden
            subtotal={carrito.subtotal}
            despacho={carrito.despacho}
            total={carrito.total}
            onContinuar={() => navigate("/checkout")}
          />
        </Col>
      </Row>
      <ModalConfirmacion
        visible={confirmando}
        titulo="Limpiar carrito"
        textoConfirmar="Limpiar"
        variante="danger"
        mensaje="¿Quitar todos los productos del carrito?"
        onConfirmar={limpiar}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPublica>
  );
}
