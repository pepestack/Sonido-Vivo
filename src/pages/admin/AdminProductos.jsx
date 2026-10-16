import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { TablaProductos } from "../../components/organisms/TablaProductos/TablaProductos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useProductos } from "../../context/ProductosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";

export default function AdminProductos() {
  const navigate = useNavigate();
  const productosCtx = useProductos();
  useTituloPagina("Gestión de productos");

  return (
    <PlantillaPrivada>
      <Encabezado titulo="Gestión de Productos" subtitulo="Inventario de la tienda" />
      <TablaProductos
        productos={productosCtx.productos}
        onVer={(id) => navigate(`/producto/${id}`)}
        onEliminar={productosCtx.eliminarProducto}
      />
    </PlantillaPrivada>
  );
}
