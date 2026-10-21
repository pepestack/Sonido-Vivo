import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Texto } from "../../components/atoms/Texto/Texto";
import { Titulo } from "../../components/atoms/Titulo/Titulo";
import { AvisoVacio } from "../../components/molecules/AvisoVacio/AvisoVacio";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { PerfilUsuario } from "../../components/organisms/PerfilUsuario/PerfilUsuario";
import { TablaPedidos } from "../../components/organisms/TablaPedidos/TablaPedidos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { useUsuarios } from "../../context/UsuariosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { pedidosDeUsuario } from "../../services/pedidoService";
import { nombreCompleto } from "../../utils/formato";

export default function VerUsuario() {
  const navigate = useNavigate();
  const params = useParams();
  const usuariosCtx = useUsuarios();
  const pedidosCtx = usePedidos();
  const [confirmando, setConfirmando] = useState(false);

  // params.id llega como string; obtenerUsuario lo convierte con Number()
  const usuario = usuariosCtx.obtenerUsuario(params.id);
  const historial = usuario ? pedidosDeUsuario(pedidosCtx.pedidos, usuario.id) : [];
  useTituloPagina(usuario ? "Perfil de usuario" : "Usuario no encontrado");

  function eliminar() {
    usuariosCtx.eliminarUsuario(usuario.id);
    navigate("/admin/usuarios");
  }

  return (
    <PlantillaPrivada>
      {usuario ? (
        <>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <PerfilUsuario
                usuario={usuario}
                onVolver={() => navigate("/admin/usuarios")}
                onEditar={() => navigate(`/admin/usuarios/${usuario.id}/editar`)}
                onEliminar={() => setConfirmando(true)}
              />
            </Col>
          </Row>
          <section className="mt-5">
            <Titulo nivel={2} className="h4 fw-bold mb-3">Historial de pedidos</Titulo>
            {historial.length > 0 ? (
              <TablaPedidos pedidos={historial} onVer={(pedido) => navigate(`/admin/pedidos/${pedido.id}`)} />
            ) : (
              <Texto className="text-muted">Este usuario aún no tiene pedidos.</Texto>
            )}
          </section>
          <ModalConfirmacion
            visible={confirmando}
            titulo="Confirmar eliminación"
            textoConfirmar="Eliminar"
            variante="danger"
            mensaje={`¿Eliminar a "${nombreCompleto(usuario)}"?`}
            onConfirmar={eliminar}
            onCancelar={() => setConfirmando(false)}
          />
        </>
      ) : (
        <AvisoVacio
          titulo="Usuario no encontrado"
          texto={`No existe un usuario con el ID "${params.id}".`}
          textoBoton="Volver a usuarios"
          onAccion={() => navigate("/admin/usuarios")}
        />
      )}
    </PlantillaPrivada>
  );
}
