import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AvisoVacio } from "../../components/molecules/AvisoVacio/AvisoVacio";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { PerfilUsuario } from "../../components/organisms/PerfilUsuario/PerfilUsuario";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useUsuarios } from "../../context/UsuariosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { nombreCompleto } from "../../utils/formato";

export default function VerUsuario() {
  const navigate = useNavigate();
  const params = useParams();
  const usuariosCtx = useUsuarios();
  const [confirmando, setConfirmando] = useState(false);

  // params.id llega como string; obtenerUsuario lo convierte con Number()
  const usuario = usuariosCtx.obtenerUsuario(params.id);
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
