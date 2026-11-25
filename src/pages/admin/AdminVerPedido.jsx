import { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { DetallePedido } from "../../components/organisms/DetallePedido/DetallePedido";
import { GestionPedido } from "../../components/organisms/GestionPedido/GestionPedido";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { useProductos } from "../../context/ProductosContext";
import { useSesion } from "../../context/SesionContext";
import { useDetallePedido } from "../../hooks/useDetallePedido";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { actualizarEstado, cancelarPedido, mensajeErrorPedido, obtenerPedido } from "../../services/pedidoService";
import { esAdministrador, puedeGestionarPedidos } from "../../utils/roles";

export default function AdminVerPedido() {
  const { id } = useParams();
  return <VistaPedido key={id} id={id} />;
}

function VistaPedido(props) {
  const navigate = useNavigate();
  const { usuario } = useSesion();
  const { actualizarListado } = usePedidos();
  const { recargar } = useProductos();
  const { pedido, cargando, error, guardarPedido } = useDetallePedido(props.id, true);
  const [guardando, setGuardando] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [errorAccion, setErrorAccion] = useState("");
  const enCurso = useRef(false);
  useTituloPagina("Comprobante del pedido");

  if (usuario && !puedeGestionarPedidos(usuario)) return <Navigate to="/" replace />;

  async function gestionar(estado) {
    if (enCurso.current) return;
    enCurso.current = true;
    setGuardando(true);
    setConfirmando(false);
    setErrorAccion("");

    try {
      if (estado) {
        guardarPedido(await actualizarEstado(pedido.id, estado));
        actualizarListado();
      } else {
        await cancelarPedido(pedido.id);
        guardarPedido({ ...pedido, estado: "Cancelado" });
        actualizarListado();
        void recargar();
      }
    } catch (error) {
      setErrorAccion(mensajeErrorPedido(error));
      if (error.response?.status === 409) {
        actualizarListado();
        try {
          guardarPedido(await obtenerPedido(pedido.id));
        } catch {
          // Se conserva el mensaje de la operación que provocó el conflicto.
        }
      }
    } finally {
      enCurso.current = false;
      setGuardando(false);
    }
  }

  if (!pedido) {
    return (
      <PlantillaPrivada>
        <MensajeEstado tipo={error ? "error" : "neutro"}>
          {cargando ? "Cargando pedido…" : error}
        </MensajeEstado>
      </PlantillaPrivada>
    );
  }

  const finalizado = ["Entregado", "Cancelado"].includes(pedido.estado);
  const opcionesEstado = finalizado ? [] : ["Despachado", "Entregado"].filter(
    (estado) => estado !== pedido.estado &&
      (estado !== "Despachado" || pedido.entrega.tipo === "despacho"),
  );
  const puedeCancelar = esAdministrador(usuario) && pedido.estado === "En preparación";

  return (
    <PlantillaPrivada>
      <Row className="g-4">
        <Col xs={12} xl={8}>
          <DetallePedido pedido={pedido} nivelTitulo={1} />
        </Col>
        <Col xs={12} xl={4} className="d-print-none">
          <GestionPedido
            estado={pedido.estado}
            opcionesEstado={[pedido.estado, ...opcionesEstado].map((estado) => ({ valor: estado, texto: estado }))}
            onCambiarEstado={opcionesEstado.length ? gestionar : undefined}
            onCancelarPedido={puedeCancelar ? () => setConfirmando(true) : undefined}
            guardando={guardando}
            error={errorAccion}
            onVerCliente={esAdministrador(usuario) && pedido.usuarioId
              ? () => navigate(`/admin/usuarios/${pedido.usuarioId}`)
              : undefined}
            onImprimir={() => window.print()}
            onVolver={() => navigate("/admin/pedidos")}
          />
        </Col>
      </Row>
      <ModalConfirmacion
        visible={confirmando}
        titulo="Cancelar pedido"
        mensaje="¿Quieres cancelar este pedido?"
        textoConfirmar="Cancelar pedido"
        variante="danger"
        onConfirmar={() => gestionar()}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPrivada>
  );
}
