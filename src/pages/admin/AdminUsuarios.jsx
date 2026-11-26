import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { TablaUsuarios } from "../../components/organisms/TablaUsuarios/TablaUsuarios";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useSesion } from "../../context/SesionContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { obtenerMensajeError } from "../../services/errores";
import { eliminarUsuario, listarUsuarios, reactivarUsuario } from "../../services/usuarioService";
import { nombreCompleto } from "../../utils/formato";

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [verInactivos, setVerInactivos] = useState(false);
  const sesion = useSesion();
  useTituloPagina("Gestión de usuarios");

  // pendiente se conserva al cerrar el modal para que el mensaje no cambie durante la animación
  const [pendiente, setPendiente] = useState(null);
  const [confirmando, setConfirmando] = useState(false);

  // vigente(): false si la página se desmontó antes de que respondiera la API
  const cargar = useCallback(async (vigente = () => true) => {
    try {
      const datos = await listarUsuarios();
      if (vigente()) setUsuarios(datos);
    } catch (error) {
      if (vigente()) setError(obtenerMensajeError(error));
    } finally {
      if (vigente()) setCargando(false);
    }
  }, []);

  useEffect(() => {
    let vigente = true;
    cargar(() => vigente);
    return () => {
      vigente = false;
    };
  }, [cargar]);

  function refrescar() {
    setCargando(true);
    setError("");
    sesion.verificarSesion();
    cargar();
  }

  // la API desactiva las cuentas en vez de borrarlas; por defecto solo se listan las activas
  const visibles = verInactivos ? usuarios : usuarios.filter((usuario) => usuario.activo);

  function marcarActivo(id, activo) {
    setUsuarios((actuales) => actuales.map((usuario) => (usuario.id === id ? { ...usuario, activo } : usuario)));
  }

  function pedirConfirmacion(usuario) {
    setPendiente(usuario);
    setConfirmando(true);
  }

  async function desactivar() {
    setConfirmando(false);
    setError("");
    try {
      await eliminarUsuario(pendiente.id);
      marcarActivo(pendiente.id, false);
    } catch (error) {
      setError(obtenerMensajeError(error));
    }
  }

  async function reactivar(usuario) {
    setError("");
    try {
      await reactivarUsuario(usuario);
      marcarActivo(usuario.id, true);
    } catch (error) {
      setError(obtenerMensajeError(error));
    }
  }

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Gestión de Usuarios"
        subtitulo="Listado de vendedores"
        onRefrescar={refrescar}
        refrescando={cargando}
        textoBoton="Nuevo usuario"
        onAccion={() => navigate("/admin/usuarios/nuevo")}
      />
      <Form.Check
        type="switch"
        id="ver-inactivos"
        label="Ver cuentas inactivas"
        className="mb-3"
        checked={verInactivos}
        onChange={(evento) => setVerInactivos(evento.target.checked)}
      />
      <MensajeEstado tipo="error" className="mb-3">{error}</MensajeEstado>
      {cargando ? (
        <MensajeEstado tipo="neutro">Cargando usuarios...</MensajeEstado>
      ) : (
        <TablaUsuarios
          usuarios={visibles}
          onVer={(usuario) => navigate(`/admin/usuarios/${usuario.id}`)}
          onEditar={(usuario) => navigate(`/admin/usuarios/${usuario.id}/editar`)}
          onEliminar={pedirConfirmacion}
          onReactivar={reactivar}
        />
      )}
      <ModalConfirmacion
        visible={confirmando}
        titulo="Confirmar desactivación"
        textoConfirmar="Desactivar"
        variante="danger"
        mensaje={pendiente && `¿Desactivar la cuenta de "${nombreCompleto(pendiente)}"? Podrás reactivarla después.`}
        onConfirmar={desactivar}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPrivada>
  );
}
