import { useSesion } from "../../context/SesionContext";
import { puedeGestionarPedidos } from "../../utils/roles";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { GrillaEstadisticas } from "../../components/organisms/GrillaEstadisticas/GrillaEstadisticas";
import { PanelAdmin } from "../../components/organisms/PanelAdmin/PanelAdmin";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { useProductos } from "../../context/ProductosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { resumenVentas } from "../../services/pedidoService";
import { productosCriticos } from "../../services/productoService";
import { listarUsuarios } from "../../services/usuarioService";
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

export default function AdminHome() {
  const navigate = useNavigate();
  const pedidosCtx = usePedidos();
  const { usuario } = useSesion();
  const mostrarPedidos = puedeGestionarPedidos(usuario);
  const productosCtx = useProductos();
  const [cantidadUsuarios, setCantidadUsuarios] = useState("…");
  useTituloPagina("Panel de administración");

  // solo el administrador puede listar usuarios: si la API lo rechaza, la tarjeta muestra un guion
  useEffect(() => {
    let vigente = true;
    listarUsuarios()
      .then((usuarios) => {
        if (vigente) setCantidadUsuarios(usuarios.filter((usuario) => usuario.activo).length);
      })
      .catch(() => {
        if (vigente) setCantidadUsuarios("—");
      });
    return () => {
      vigente = false;
    };
  }, []);

  // resumen de pedidos y catálogo, calculado desde los contextos en cada render
  const resumen = resumenVentas(pedidosCtx.pedidos);
  const estadisticas = [
    { titulo: "Pedidos", valor: pedidosCtx.cargandoPedidos || pedidosCtx.errorPedidos ? "—" : resumen.cantidad, icono: "bi bi-receipt" },
    { titulo: "Ventas", valor: pedidosCtx.cargandoPedidos || pedidosCtx.errorPedidos ? "—" : formatoDinero(resumen.totalVendido), icono: "bi bi-cash-stack", color: "text-success" },
    { titulo: "Productos", valor: productosCtx.productos.length, icono: "bi bi-box-seam" },
    { titulo: "Stock crítico", valor: productosCriticos(productosCtx.productos).length, icono: "bi bi-exclamation-triangle", color: "text-danger" },
    { titulo: "Usuarios", valor: cantidadUsuarios, icono: "bi bi-people" },
  ];

  return (
    <PlantillaPrivada>
      <MensajeEstado tipo={pedidosCtx.errorPedidos ? "error" : "neutro"}>
        {pedidosCtx.cargandoPedidos ? "Cargando pedidos…" : pedidosCtx.errorPedidos}
      </MensajeEstado>
      <Encabezado
        titulo="Bienvenido"
        subtitulo="¿Qué deseas gestionar hoy?"
        claseTitulo="display-6 fw-bold"
      />
      <GrillaEstadisticas estadisticas={mostrarPedidos ? estadisticas : estadisticas.slice(2)} />
      <PanelAdmin accesos={mostrarPedidos ? accesos : accesos.slice(2)} onNavegar={navigate} />
    </PlantillaPrivada>
  );
}
