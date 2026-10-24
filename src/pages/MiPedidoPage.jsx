import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Boton } from "../components/atoms/Boton/Boton";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { DetallePedido } from "../components/organisms/DetallePedido/DetallePedido";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { usePedidos } from "../context/PedidosContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function MiPedidoPage() {
  const navigate = useNavigate();
  const params = useParams();
  const sesion = useSesion();
  const pedidosCtx = usePedidos();

  // solo se muestra si el pedido es del usuario con sesión
  const pedido = pedidosCtx.obtenerPedido(params.id);
  const esPropio = Boolean(sesion.usuario && pedido && pedido.usuarioId === sesion.usuario.id);
  useTituloPagina(esPropio ? "Detalle del pedido" : "Pedido no encontrado");

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
      {esPropio ? (
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
