import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { GrillaEstadisticas } from "../../components/organisms/GrillaEstadisticas/GrillaEstadisticas";
import { PanelAdmin } from "../../components/organisms/PanelAdmin/PanelAdmin";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { useProductos } from "../../context/ProductosContext";
import { useUsuarios } from "../../context/UsuariosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { resumenVentas } from "../../services/pedidoService";
import { productosCriticos } from "../../services/productoService";
import { formatoDinero } from "../../utils/formato";

const accesos = [
  {
    titulo: "Pedidos",
    texto: "Revisa las compras de la tienda online, su comprobante y actualiza su estado de despacho.",
    textoBoton: "Ver Pedidos",
    ruta: "/admin/pedidos",
  },
  {
    titulo: "Reportes",
    texto: "Consulta las ventas totales, el ticket promedio y los productos más vendidos.",
    textoBoton: "Ver Reportes",
    ruta: "/admin/reportes",
  },
  {
    titulo: "Gestión de productos",
    texto:
      "Agrega nuevos instrumentos, edita precios, actualiza stock o elimina referencias del catálogo.",
    textoBoton: "Administrar Productos",
    ruta: "/admin/productos",
  },
  {
    titulo: "Gestión de categorías",
    texto: "Crea nuevas categorías para el catálogo o cambia el nombre de las existentes.",
    textoBoton: "Administrar Categorías",
    ruta: "/admin/categorias",
  },
  {
    titulo: "Gestión de usuarios",
    texto:
      "Administra las cuentas de tus vendedores, crea nuevos accesos o edita permisos del sistema.",
    textoBoton: "Administrar Usuarios",
    ruta: "/admin/usuarios",
  },
];

export default function Admin() {
  const navigate = useNavigate();
  const pedidosCtx = usePedidos();
  const productosCtx = useProductos();
  const usuariosCtx = useUsuarios();
  useTituloPagina("Panel de administración");

  // resumen de pedidos, catálogo y usuarios, calculado desde los contextos en cada render
  const resumen = resumenVentas(pedidosCtx.pedidos);
  const estadisticas = [
    { titulo: "Pedidos", valor: resumen.cantidad, icono: "bi bi-receipt" },
    { titulo: "Ventas", valor: formatoDinero(resumen.totalVendido), icono: "bi bi-cash-stack", color: "text-success" },
    { titulo: "Productos", valor: productosCtx.productos.length, icono: "bi bi-box-seam" },
    { titulo: "Stock crítico", valor: productosCriticos(productosCtx.productos).length, icono: "bi bi-exclamation-triangle", color: "text-danger" },
    { titulo: "Usuarios", valor: usuariosCtx.usuarios.length, icono: "bi bi-people" },
  ];

  return (
    <PlantillaPrivada>
      <Encabezado
        titulo="Bienvenido"
        subtitulo="¿Qué deseas gestionar hoy?"
        claseTitulo="display-6 fw-bold"
      />
      <GrillaEstadisticas estadisticas={estadisticas} />
      <PanelAdmin accesos={accesos} onNavegar={navigate} />
    </PlantillaPrivada>
  );
}
