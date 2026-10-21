import { useNavigate } from "react-router-dom";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { Encabezado } from "../components/molecules/Encabezado/Encabezado";
import { TablaPedidos } from "../components/organisms/TablaPedidos/TablaPedidos";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { usePedidos } from "../context/PedidosContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { pedidosDeUsuario } from "../services/pedidoService";

export default function MisPedidosPage() {
  const navigate = useNavigate();
  const sesion = useSesion();
  const pedidosCtx = usePedidos();
  useTituloPagina("Mis pedidos");

  if (!sesion.usuario) {
    return (
      <PlantillaPublica>
        <AvisoVacio
          titulo="Inicia sesión para ver tus pedidos"
          textoBoton="Iniciar sesión"
          onAccion={() => navigate("/login", { state: { desde: "/mis-pedidos" } })}
        />
      </PlantillaPublica>
    );
  }

  const pedidos = pedidosDeUsuario(pedidosCtx.pedidos, sesion.usuario.id);

  return (
    <PlantillaPublica>
      {pedidos.length === 0 ? (
        <AvisoVacio
          titulo="Aún no tienes pedidos"
          texto="Cuando compres algo lo verás aquí junto con su estado."
          textoBoton="Ir al catálogo"
          onAccion={() => navigate("/catalogo")}
        />
      ) : (
        <>
          <Encabezado titulo="Mis pedidos" subtitulo="Revisa el estado de tus compras." />
          <TablaPedidos pedidos={pedidos} onVer={(pedido) => navigate(`/mis-pedidos/${pedido.id}`)} />
        </>
      )}
    </PlantillaPublica>
  );
}
