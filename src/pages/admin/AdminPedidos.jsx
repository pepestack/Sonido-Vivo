import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [estado, setEstado] = useState("todos");
  useTituloPagina("Pedidos");

  // la lista filtrada se calcula en cada render a partir del contexto y del filtro elegido
  const filtrados = ordenarRecientes(
    estado === "todos" ? pedidosCtx.pedidos : pedidosCtx.pedidos.filter((pedido) => pedido.estado === estado),
  );

  return (
    <PlantillaPrivada>
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
      <TablaPedidos
        pedidos={filtrados}
        mostrarCliente
        mensajeVacio="No hay pedidos con este estado."
        onVer={(pedido) => navigate(`/admin/pedidos/${pedido.id}`)}
      />
    </PlantillaPrivada>
  );
}
