import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Boton } from "../components/atoms/Boton/Boton";
import { MensajeEstado } from "../components/atoms/MensajeEstado/MensajeEstado";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { DetallePedido } from "../components/organisms/DetallePedido/DetallePedido";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useDetallePedido } from "../hooks/useDetallePedido";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function MiPedidoPage() {
  const navigate = useNavigate();
  const params = useParams();
  const sesion = useSesion();
  const { pedido, error, cargando } = useDetallePedido(params.id);
  const esPropio = Boolean(sesion.usuario && pedido && pedido.usuarioId === sesion.usuario.id);
  useTituloPagina("Detalle del pedido");

  if (!sesion.usuario) {
    return (
      <PlantillaPublica>
        <AvisoVacio
          titulo="Inicia sesión para ver tus pedidos"
          textoBoton="Iniciar sesión"
          onAccion={() => navigate("/login", { state: { desde: `/mis-pedidos/${params.id}` } })}
        />
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      {cargando ? (
        <MensajeEstado tipo="neutro">Cargando pedido…</MensajeEstado>
      ) : error ? (
        <MensajeEstado tipo="error">{error}</MensajeEstado>
      ) : esPropio ? (
        <Row className="justify-content-center">
          <Col xs={12} lg={9}>
            <DetallePedido pedido={pedido} nivelTitulo={1} />
            <Boton variante="outline-secondary" className="mt-4" onClick={() => navigate("/mis-pedidos")}>
              Volver a mis pedidos
            </Boton>
          </Col>
        </Row>
      ) : (
        <AvisoVacio
          titulo="Pedido no encontrado"
          texto={`No tienes un pedido con el número "${params.id}".`}
          textoBoton="Volver a mis pedidos"
          onAccion={() => navigate("/mis-pedidos")}
        />
      )}
    </PlantillaPublica>
  );
}
