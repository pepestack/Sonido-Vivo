import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Boton } from "../components/atoms/Boton/Boton";
import { Icono } from "../components/atoms/Icono/Icono";
import { Texto } from "../components/atoms/Texto/Texto";
import { Titulo } from "../components/atoms/Titulo/Titulo";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { DetallePedido } from "../components/organisms/DetallePedido/DetallePedido";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { usePedidos } from "../context/PedidosContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { numeroPedido } from "../utils/formato";

export default function CompraExitosaPage() {
  const navigate = useNavigate();
  const params = useParams();
  const pedidosCtx = usePedidos();
  const sesion = useSesion();

  const pedido = pedidosCtx.obtenerPedido(params.id);
  useTituloPagina(pedido ? "Compra exitosa" : "Pedido no encontrado");

  if (!pedido) {
    return (
      <PlantillaPublica>
        <AvisoVacio
          titulo="Pedido no encontrado"
          texto={`No existe un pedido con el número "${params.id}".`}
          textoBoton="Ir al inicio"
          onAccion={() => navigate("/")}
        />
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} lg={9}>
          <section className="text-center mb-4">
            <Icono icono="bi bi-check-circle-fill" className="text-success display-4" />
            <Titulo nivel={1} className="h3 fw-bold mt-3">¡Gracias por tu compra!</Titulo>
            <Texto className="text-muted mb-0">
              Tu pedido {numeroPedido(pedido.id)} quedó registrado. Te avisaremos a {pedido.cliente.correo} cuando cambie su estado.
            </Texto>
          </section>
          <DetallePedido pedido={pedido} />
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
            <Boton variante="outline-secondary" onClick={() => navigate("/catalogo")}>
              Seguir comprando
            </Boton>
            {sesion.usuario && (
              <Boton variante="dark" onClick={() => navigate("/mis-pedidos")}>
                Ver mis pedidos
              </Boton>
            )}
          </div>
        </Col>
      </Row>
    </PlantillaPublica>
  );
}
