import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { Texto } from "../../components/atoms/Texto/Texto";
import { Titulo } from "../../components/atoms/Titulo/Titulo";
import { AvisoVacio } from "../../components/molecules/AvisoVacio/AvisoVacio";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { PerfilUsuario } from "../../components/organisms/PerfilUsuario/PerfilUsuario";
import { TablaPedidos } from "../../components/organisms/TablaPedidos/TablaPedidos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { useUsuario } from "../../hooks/useUsuario";
import { obtenerMensajeError } from "../../services/errores";
import { pedidosDeUsuario } from "../../services/pedidoService";
import { eliminarUsuario, reactivarUsuario } from "../../services/usuarioService";
import { nombreCompleto } from "../../utils/formato";

export default function VerUsuario() {
  const navigate = useNavigate();
  const params = useParams();
  const pedidosCtx = usePedidos();
  const consulta = useUsuario(params.id);
  const [confirmando, setConfirmando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState("");

  const usuario = consulta.usuario;
  const historial = usuario ? pedidosDeUsuario(pedidosCtx.pedidos, usuario.id) : [];
  useTituloPagina(consulta.noEncontrado ? "Usuario no encontrado" : "Perfil de usuario");

  async function eliminar() {
    setConfirmando(false);
    try {
      await eliminarUsuario(usuario.id);
      navigate("/admin/usuarios");
    } catch (error) {
      setErrorEliminar(obtenerMensajeError(error));
    }
  }

  async function reactivar() {
    setErrorEliminar("");
    try {
      consulta.setUsuario(await reactivarUsuario(usuario));
    } catch (error) {
      setErrorEliminar(obtenerMensajeError(error));
    }
  }

  if (consulta.cargando) {
    return (
      <PlantillaPrivada>
        <MensajeEstado tipo="neutro">Cargando usuario...</MensajeEstado>
      </PlantillaPrivada>
    );
  }

  if (!usuario) {
    return (
      <PlantillaPrivada>
        {consulta.noEncontrado ? (
          <AvisoVacio
            titulo="Usuario no encontrado"
            texto={`No existe un usuario con el ID "${params.id}".`}
            textoBoton="Volver a usuarios"
            onAccion={() => navigate("/admin/usuarios")}
          />
        ) : (
          <MensajeEstado tipo="error">{consulta.error}</MensajeEstado>
        )}
      </PlantillaPrivada>
    );
  }

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <PerfilUsuario
            usuario={usuario}
            onVolver={() => navigate("/admin/usuarios")}
            onEditar={() => navigate(`/admin/usuarios/${usuario.id}/editar`)}
            onEliminar={() => setConfirmando(true)}
            onReactivar={reactivar}
          />
          <MensajeEstado tipo="error">{errorEliminar}</MensajeEstado>
        </Col>
      </Row>
      <section className="mt-5">
        <Titulo nivel={2} className="h4 fw-bold mb-3">Historial de pedidos</Titulo>
        {pedidosCtx.cargandoPedidos ? (
          <MensajeEstado tipo="neutro">Cargando pedidos…</MensajeEstado>
        ) : pedidosCtx.errorPedidos ? (
          <MensajeEstado tipo="error">{pedidosCtx.errorPedidos}</MensajeEstado>
        ) : historial.length > 0 ? (
          <TablaPedidos pedidos={historial} onVer={(pedido) => navigate(`/admin/pedidos/${pedido.id}`)} />
        ) : (
          <Texto className="text-muted">Este usuario aún no tiene pedidos.</Texto>
        )}
      </section>
      <ModalConfirmacion
        visible={confirmando}
        titulo="Confirmar desactivación"
        textoConfirmar="Desactivar"
        variante="danger"
        mensaje={`¿Desactivar la cuenta de "${nombreCompleto(usuario)}"? Podrás reactivarla después.`}
        onConfirmar={eliminar}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPrivada>
  );
}
