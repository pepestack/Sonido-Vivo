import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Texto } from "../../components/atoms/Texto/Texto";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { FiltroEstado } from "../../components/molecules/FiltroEstado/FiltroEstado";
import { TablaPedidos } from "../../components/organisms/TablaPedidos/TablaPedidos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { ESTADOS_PEDIDO } from "../../data/pedidos";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { ordenarRecientes } from "../../services/pedidoService";

export default function AdminPedidos() {
  const navigate = useNavigate();
  const pedidosCtx = usePedidos();
  const [estado, setEstado] = useState("todos");
  useTituloPagina("Pedidos");

  // la lista filtrada se calcula en cada render a partir del contexto y del filtro elegido
  const filtrados = ordenarRecientes(
    estado === "todos" ? pedidosCtx.pedidos : pedidosCtx.pedidos.filter((pedido) => pedido.estado === estado),
  );

  return (
    <PlantillaPrivada>
      <Encabezado titulo="Pedidos" subtitulo={`${filtrados.length} pedido(s), del más reciente al más antiguo`}>
        <FiltroEstado valor={estado} estados={ESTADOS_PEDIDO} onCambiar={setEstado} />
      </Encabezado>
      {filtrados.length > 0 ? (
        <TablaPedidos
          pedidos={filtrados}
          mostrarCliente
          onVer={(pedido) => navigate(`/admin/pedidos/${pedido.id}`)}
        />
      ) : (
        <Texto className="text-muted text-center py-5">No hay pedidos con este estado.</Texto>
      )}
    </PlantillaPrivada>
  );
}
