import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { TablaUsuarios } from "../../components/organisms/TablaUsuarios/TablaUsuarios";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useUsuarios } from "../../context/UsuariosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { nombreCompleto } from "../../utils/formato";

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const usuariosCtx = useUsuarios();
  useTituloPagina("Gestión de usuarios");

  // pendiente se conserva al cerrar el modal para que el mensaje no cambie durante la animación
  const [pendiente, setPendiente] = useState(null);
  const [confirmando, setConfirmando] = useState(false);

  function pedirConfirmacion(usuario) {
    setPendiente(usuario);
    setConfirmando(true);
  }

  function eliminar() {
    usuariosCtx.eliminarUsuario(pendiente.id);
    setConfirmando(false);
  }

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Gestión de Usuarios"
        subtitulo="Listado de vendedores"
        textoBoton="Nuevo usuario"
        onAccion={() => navigate("/admin/usuarios/nuevo")}
      />
      <TablaUsuarios
        usuarios={usuariosCtx.usuarios}
        onVer={(usuario) => navigate(`/admin/usuarios/${usuario.id}`)}
        onEditar={(usuario) => navigate(`/admin/usuarios/${usuario.id}/editar`)}
        onEliminar={pedirConfirmacion}
      />
      <ModalConfirmacion
        visible={confirmando}
        titulo="Confirmar eliminación"
        textoConfirmar="Eliminar"
        variante="danger"
        mensaje={pendiente && `¿Eliminar a "${nombreCompleto(pendiente)}"?`}
        onConfirmar={eliminar}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPrivada>
  );
}
