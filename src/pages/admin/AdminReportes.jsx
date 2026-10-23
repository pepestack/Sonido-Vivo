import { Col, Row } from "react-bootstrap";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { GrillaEstadisticas } from "../../components/organisms/GrillaEstadisticas/GrillaEstadisticas";
import { PedidosPorEstado } from "../../components/organisms/PedidosPorEstado/PedidosPorEstado";
import { TablaMasVendidos } from "../../components/organisms/TablaMasVendidos/TablaMasVendidos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { resumenVentas } from "../../services/pedidoService";
import { formatoDinero } from "../../utils/formato";

export default function AdminReportes() {
  const pedidosCtx = usePedidos();
  useTituloPagina("Reportes");

  const resumen = resumenVentas(pedidosCtx.pedidos);
  const unidades = resumen.masVendidos.reduce((total, producto) => total + producto.unidades, 0);

  const estadisticas = [
    { titulo: "Ventas totales", valor: formatoDinero(resumen.totalVendido), icono: "bi bi-cash-stack", color: "text-success" },
    { titulo: "Pedidos", valor: resumen.cantidad, icono: "bi bi-receipt" },
    { titulo: "Ticket promedio", valor: formatoDinero(resumen.ticketPromedio), icono: "bi bi-graph-up" },
    { titulo: "Unidades vendidas", valor: unidades, icono: "bi bi-box-seam" },
  ];

  return (
    <PlantillaPrivada>
      <Encabezado titulo="Reportes" subtitulo="Resumen de las ventas registradas en la tienda online" />
      <GrillaEstadisticas estadisticas={estadisticas} />
      <Row className="g-4">
        <Col xs={12} lg={4}>
          <PedidosPorEstado porEstado={resumen.porEstado} />
        </Col>
        <Col xs={12} lg={8}>
          <TablaMasVendidos productos={resumen.masVendidos.slice(0, 5)} />
        </Col>
      </Row>
    </PlantillaPrivada>
  );
}
