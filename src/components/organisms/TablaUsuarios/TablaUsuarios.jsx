import { FilaUsuarioAdmin } from "../../molecules/FilaUsuarioAdmin/FilaUsuarioAdmin";
import { TablaAdmin } from "../TablaAdmin/TablaAdmin";
import { esAdministrador } from "../../../utils/roles";

const columnas = [
  { texto: "ID", className: "ps-4" },
  { texto: "Nombre completo" },
  { texto: "Correo electrónico" },
  { texto: "Rol/Cargo" },
  { texto: "Acciones", className: "text-end pe-4" },
];

// onVer, onEditar y onEliminar reciben el usuario completo
export function TablaUsuarios(props) {
  return (
    <TablaAdmin columnas={columnas} vacia={props.usuarios.length === 0} mensajeVacio="No hay usuarios registrados.">
      {/* el administrador no se puede eliminar (igual que en la versión HTML) */}
      {props.usuarios.map((usuario) => (
        <FilaUsuarioAdmin
          key={usuario.id}
          usuario={usuario}
          puedeEliminar={!esAdministrador(usuario)}
          onVer={props.onVer}
          onEditar={props.onEditar}
          onEliminar={props.onEliminar}
        />
      ))}
    </TablaAdmin>
  );
}
