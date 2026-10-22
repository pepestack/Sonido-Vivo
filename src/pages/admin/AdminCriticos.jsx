import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { TablaProductos } from "../../components/organisms/TablaProductos/TablaProductos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useCategorias } from "../../context/CategoriasContext";
import { useProductos } from "../../context/ProductosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { productosCriticos } from "../../services/productoService";

export default function AdminCriticos() {
  const navigate = useNavigate();
  const productosCtx = useProductos();
  const categoriasCtx = useCategorias();
  useTituloPagina("Productos críticos");

  // se calcula en cada render a partir del contexto, por eso no necesita su propio useState
  const criticos = productosCriticos(productosCtx.productos);

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Productos críticos"
        subtitulo="Productos con stock bajo o agotados"
      />
      <TablaProductos
        categorias={categoriasCtx.categorias}
        productos={criticos}
        onVer={(producto) => navigate(`/admin/productos/${producto.id}`)}
        onEditar={(producto) => navigate(`/admin/productos/${producto.id}/editar`)}
      />
    </PlantillaPrivada>
  );
}
