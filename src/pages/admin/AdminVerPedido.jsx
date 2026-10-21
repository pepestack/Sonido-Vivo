import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Boton } from "../../components/atoms/Boton/Boton";
import { Titulo } from "../../components/atoms/Titulo/Titulo";
import { AvisoVacio } from "../../components/molecules/AvisoVacio/AvisoVacio";
import { CampoFormulario } from "../../components/molecules/CampoFormulario/CampoFormulario";
import { DetallePedido } from "../../components/organisms/DetallePedido/DetallePedido";
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
          <Card className="shadow-sm border-0 p-4">
            <Titulo nivel={2} className="h5 fw-bold mb-3">Gestión del pedido</Titulo>
            <CampoFormulario
              id="estado"
              etiqueta="Estado"
              tipo="select"
              opciones={opcionesEstado}
              valor={pedido.estado}
              onChange={(evento) => pedidosCtx.cambiarEstado(pedido.id, evento.target.value)}
            />
            <div className="d-grid gap-2">
              {pedido.usuarioId && (
                <Boton variante="outline-primary" onClick={() => navigate(`/admin/usuarios/${pedido.usuarioId}`)}>
                  Ver cliente
                </Boton>
              )}
              <Boton variante="outline-dark" onClick={() => window.print()}>
                Imprimir boleta
              </Boton>
              <Boton variante="outline-secondary" onClick={() => navigate("/admin/pedidos")}>
                Volver a pedidos
              </Boton>
            </div>
          </Card>
        </Col>
      </Row>
    </PlantillaPrivada>
  );
}
