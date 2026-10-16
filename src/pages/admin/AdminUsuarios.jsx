import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { TablaUsuarios } from "../../components/organisms/TablaUsuarios/TablaUsuarios";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useUsuarios } from "../../context/UsuariosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const usuariosCtx = useUsuarios();
  useTituloPagina("Gestión de usuarios");

  return (
    <PlantillaPrivada>
      <Encabezado titulo="Gestión de Usuarios" subtitulo="Listado de vendedores" />
      <TablaUsuarios
        usuarios={usuariosCtx.usuarios}
        onVer={(id) => navigate(`/admin/usuarios/${id}`)}
        onEliminar={usuariosCtx.eliminarUsuario}
      />
    </PlantillaPrivada>
  );
}
