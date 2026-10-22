import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { TablaProductos } from "../../components/organisms/TablaProductos/TablaProductos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useCategorias } from "../../context/CategoriasContext";
import { useProductos } from "../../context/ProductosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { useState } from "react";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";

export default function AdminProductos() {
  const navigate = useNavigate();
  const productosCtx = useProductos();
  const categoriasCtx = useCategorias();
  useTituloPagina("Gestión de Inventario");

  // pendiente se conserva al cerrar el modal para que el mensaje no cambie durante la animación
  const [pendiente, setPendiente] = useState(null)
  const [confirmando, setConfirmando] = useState(false)

  function pedirConfirmacion(producto) {
    setPendiente(producto)
    setConfirmando(true)
  }

  function eliminar() {
    productosCtx.eliminarProducto(pendiente.id)
    setConfirmando(false)
  }

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Gestión de Inventario"
        subtitulo="Listado de productos"
        textoBoton="Añadir Producto"
        onAccion={() => navigate('/admin/productos/nuevo')}
      />
      <TablaProductos
        categorias={categoriasCtx.categorias}
        productos={productosCtx.productos}
        onVer={(producto) => navigate(`/admin/productos/${producto.id}`)}
        onEditar={(producto) => navigate(`/admin/productos/${producto.id}/editar`)}
        onEliminar={pedirConfirmacion}
      />
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
