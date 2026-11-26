import { useNavigate } from "react-router-dom";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { TablaProductos } from "../../components/organisms/TablaProductos/TablaProductos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { useCategorias } from "../../context/CategoriasContext";
import { useProductos } from "../../context/ProductosContext";
import { useSesion } from "../../context/SesionContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { productosCriticos } from "../../services/productoService";

export default function AdminCriticos() {
  const navigate = useNavigate();
  const productosCtx = useProductos();
  const categoriasCtx = useCategorias();
  const sesion = useSesion();
  useTituloPagina("Productos críticos");

  // se calcula en cada render a partir del contexto, por eso no necesita su propio useState
  const criticos = productosCriticos(productosCtx.productos);

  function refrescar() {
    sesion.verificarSesion();
    productosCtx.recargar();
  }

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Productos críticos"
        subtitulo="Productos con stock bajo o agotados"
        onRefrescar={refrescar}
        refrescando={productosCtx.cargando}
      />
      <MensajeEstado tipo="error" className="mb-3">{productosCtx.error}</MensajeEstado>
      {productosCtx.cargando ? (
        <MensajeEstado tipo="neutro">Cargando productos...</MensajeEstado>
      ) : (
        <TablaProductos
          categorias={categoriasCtx.categorias}
          productos={criticos}
          onVer={(producto) => navigate(`/admin/productos/${producto.id}`)}
          onEditar={(producto) => navigate(`/admin/productos/${producto.id}/editar`)}
        />
      )}
    </PlantillaPrivada>
  );
}
