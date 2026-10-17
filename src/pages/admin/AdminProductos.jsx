import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { TablaProductos } from "../../components/organisms/TablaProductos/TablaProductos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useProductos } from "../../context/ProductosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { useState } from "react";
import { ModalConfirmacion } from "../../components/molecules/ModalConfirmacion/ModalConfirmacion";

export default function AdminProductos() {
  const navigate = useNavigate();
  const productosCtx = useProductos();
  useTituloPagina("Gestión de Inventario");

  const [pendiente, setPendiente] = useState(null)

  function eliminar() {
    productosCtx.eliminarProducto(pendiente.id)
    setPendiente(null)
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
        productos={productosCtx.productos}
        onVer={(producto) => navigate(`/admin/productos/${producto.id}`)}
        onEditar={(producto) => navigate(`/admin/productos/${producto.id}/editar`)}
        onEliminar={setPendiente}
      />
      <ModalConfirmacion
        visible={pendiente !== null}
        titulo="Confirmar eliminación"
        textoConfirmar="Eliminar"
        variante="danger"
        mensaje={`¿Eliminar "${pendiente?.nombre}"?`}
        onConfirmar={eliminar}
        onCancelar={() => setPendiente(null)}
      />
    </PlantillaPrivada>
  )
}
