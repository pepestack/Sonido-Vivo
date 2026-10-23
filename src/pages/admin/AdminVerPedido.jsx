import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AvisoVacio } from "../../components/molecules/AvisoVacio/AvisoVacio";
import { DetallePedido } from "../../components/organisms/DetallePedido/DetallePedido";
import { GestionPedido } from "../../components/organisms/GestionPedido/GestionPedido";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { ESTADOS_PEDIDO } from "../../data/pedidos";
import { useTituloPagina } from "../../hooks/useTituloPagina";

const opcionesEstado = ESTADOS_PEDIDO.map((estado) => ({ valor: estado, texto: estado }));

export default function AdminVerPedido() {
  const navigate = useNavigate();
  const params = useParams();
  const pedidosCtx = usePedidos();

  // params.id llega como string; obtenerPedido lo convierte con Number()
  const pedido = pedidosCtx.obtenerPedido(params.id);
  useTituloPagina(pedido ? "Comprobante del pedido" : "Pedido no encontrado");

  if (!pedido) {
    return (
      <PlantillaPrivada>
        <AvisoVacio
          titulo="Pedido no encontrado"
          texto={`No existe un pedido con el número "${params.id}".`}
          textoBoton="Volver a pedidos"
          onAccion={() => navigate("/admin/pedidos")}
        />
      </PlantillaPrivada>
    );
  }

  return (
    <PlantillaPrivada>
      <Row className="g-4">
        <Col xs={12} xl={8}>
          <DetallePedido pedido={pedido} />
        </Col>
        {/* d-print-none: al imprimir la boleta solo sale el comprobante */}
        <Col xs={12} xl={4} className="d-print-none">
          <GestionPedido
            estado={pedido.estado}
            opcionesEstado={opcionesEstado}
            onCambiarEstado={(estado) => pedidosCtx.cambiarEstado(pedido.id, estado)}
            onVerCliente={pedido.usuarioId ? () => navigate(`/admin/usuarios/${pedido.usuarioId}`) : undefined}
            onImprimir={() => window.print()}
            onVolver={() => navigate("/admin/pedidos")}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  );
}
