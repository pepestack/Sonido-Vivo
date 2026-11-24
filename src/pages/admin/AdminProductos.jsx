import { useNavigate } from "react-router-dom";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { TablaProductos } from "../../components/organisms/TablaProductos/TablaProductos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useCategorias } from "../../context/CategoriasContext";
import { useProductos } from "../../context/ProductosContext";
import { useSesion } from "../../context/SesionContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { useState } from "react";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";
import { obtenerMensajeError } from "../../services/errores";
import { esAdministrador } from "../../utils/roles";

export default function AdminProductos() {
  const navigate = useNavigate();
  const productosCtx = useProductos();
  const categoriasCtx = useCategorias();
  const sesion = useSesion();
  useTituloPagina("Gestión de Inventario");

  // pendiente se conserva al cerrar el modal para que el mensaje no cambie durante la animación
  const [pendiente, setPendiente] = useState(null)
  const [confirmando, setConfirmando] = useState(false)
  const [error, setError] = useState('')

  function pedirConfirmacion(producto) {
    setPendiente(producto)
    setConfirmando(true)
  }

  async function eliminar() {
    setConfirmando(false)
    setError('')
    try {
      await productosCtx.eliminarProducto(pendiente.id)
    } catch (error) {
      setError(obtenerMensajeError(error))
    }
  }

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Gestión de Inventario"
        subtitulo="Listado de productos"
        textoBoton="Añadir Producto"
        onAccion={() => navigate('/admin/productos/nuevo')}
      />
      <MensajeEstado tipo="error" className="mb-3">{error || productosCtx.error}</MensajeEstado>
      {productosCtx.cargando ? (
        <MensajeEstado tipo="neutro">Cargando productos...</MensajeEstado>
      ) : (
        <TablaProductos
          categorias={categoriasCtx.categorias}
          productos={productosCtx.productos}
          onVer={(producto) => navigate(`/admin/productos/${producto.id}`)}
          onEditar={(producto) => navigate(`/admin/productos/${producto.id}/editar`)}
          onEliminar={esAdministrador(sesion.usuario) ? pedirConfirmacion : undefined}
        />
      )}
      <ModalConfirmacion
        visible={confirmando}
        titulo="Confirmar eliminación"
        textoConfirmar="Eliminar"
        variante="danger"
        mensaje={pendiente && `¿Eliminar "${pendiente.nombre}"?`}
        onConfirmar={eliminar}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPrivada>
  )
}
