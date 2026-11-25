import { useSesion } from "../../context/SesionContext";
import { puedeGestionarPedidos } from "../../utils/roles";
import { MensajeEstado } from "../../components/atoms/MensajeEstado/MensajeEstado";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Encabezado } from "../../components/molecules/Encabezado/Encabezado";
import { SelectorEnLinea } from "../../components/molecules/SelectorEnLinea/SelectorEnLinea";
import { TablaPedidos } from "../../components/organisms/TablaPedidos/TablaPedidos";
import { PlantillaPrivada } from "../../components/templates/PlantillaPrivada/PlantillaPrivada";
import { usePedidos } from "../../context/PedidosContext";
import { ESTADOS_PEDIDO } from "../../data/pedidos";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { ordenarRecientes } from "../../services/pedidoService";

// valor 'todos' = sin filtro
const opcionesEstado = [
  { valor: "todos", texto: "Todos los estados" },
  ...ESTADOS_PEDIDO.map((estado) => ({ valor: estado, texto: estado })),
];

export default function AdminPedidos() {
  const navigate = useNavigate();
  const pedidosCtx = usePedidos();
  const { usuario } = useSesion();
  const [estado, setEstado] = useState("todos");
  useTituloPagina("Pedidos");

  // la lista filtrada se calcula en cada render a partir del contexto y del filtro elegido
  const filtrados = ordenarRecientes(
    estado === "todos" ? pedidosCtx.pedidos : pedidosCtx.pedidos.filter((pedido) => pedido.estado === estado),
  );

  if (usuario && !puedeGestionarPedidos(usuario)) return <Navigate to="/" replace />;

  return (
    <PlantillaPrivada>
      <MensajeEstado tipo={pedidosCtx.errorPedidos ? "error" : "neutro"}>
        {pedidosCtx.cargandoPedidos ? "Cargando pedidos…" : pedidosCtx.errorPedidos}
      </MensajeEstado>
      <Encabezado titulo="Pedidos" subtitulo={`${filtrados.length} pedido(s), del más reciente al más antiguo`}>
        <SelectorEnLinea
          id="filtro-estado"
          etiqueta="Estado:"
          valor={estado}
          opciones={opcionesEstado}
          onCambiar={setEstado}
          className="justify-content-md-end"
        />
      </Encabezado>
      {!pedidosCtx.cargandoPedidos && !pedidosCtx.errorPedidos && (
        <TablaPedidos
          pedidos={filtrados}
          mostrarCliente
          mensajeVacio="No hay pedidos con este estado."
          onVer={(pedido) => navigate(`/admin/pedidos/${pedido.id}`)}
        />
      )}
    </PlantillaPrivada>
  );
}
