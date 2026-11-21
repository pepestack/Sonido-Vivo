import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { TablaUsuarios } from "../../components/organisms/TablaUsuarios/TablaUsuarios";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { obtenerMensajeError } from "../../services/errores";
import { eliminarUsuario, listarUsuarios } from "../../services/usuarioService";
import { nombreCompleto } from "../../utils/formato";

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  useTituloPagina("Gestión de usuarios");

  // pendiente se conserva al cerrar el modal para que el mensaje no cambie durante la animación
  const [pendiente, setPendiente] = useState(null);
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    let vigente = true;
    async function cargar() {
      try {
        const datos = await listarUsuarios();
        // la API desactiva las cuentas eliminadas en vez de borrarlas
        if (vigente) setUsuarios(datos.filter((usuario) => usuario.activo));
      } catch (error) {
        if (vigente) setError(obtenerMensajeError(error));
      } finally {
        if (vigente) setCargando(false);
      }
    }
    cargar();
    return () => {
      vigente = false;
    };
  }, []);

  function pedirConfirmacion(usuario) {
    setPendiente(usuario);
    setConfirmando(true);
  }

  async function eliminar() {
    setConfirmando(false);
    setError("");
    try {
      await eliminarUsuario(pendiente.id);
      setUsuarios((actuales) => actuales.filter((usuario) => usuario.id !== pendiente.id));
    } catch (error) {
      setError(obtenerMensajeError(error));
    }
  }

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Gestión de Usuarios"
        subtitulo="Listado de vendedores"
        textoBoton="Nuevo usuario"
        onAccion={() => navigate("/admin/usuarios/nuevo")}
      />
      <MensajeEstado tipo="error" className="mb-3">{error}</MensajeEstado>
      {cargando ? (
        <MensajeEstado tipo="neutro">Cargando usuarios...</MensajeEstado>
      ) : (
        <TablaUsuarios
          usuarios={usuarios}
          onVer={(usuario) => navigate(`/admin/usuarios/${usuario.id}`)}
          onEditar={(usuario) => navigate(`/admin/usuarios/${usuario.id}/editar`)}
          onEliminar={pedirConfirmacion}
        />
      )}
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
