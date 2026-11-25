import { useLocation, useNavigate } from "react-router-dom";
import { AvisoResultado } from "../components/organisms/AvisoResultado/AvisoResultado";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function CompraErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useSesion();
  useTituloPagina("Error en la compra");

  // el checkout envía el motivo en el state de la navegación
  const { requiereSesion, confirmacionIncierta } = location.state ?? {};
  const motivo = location.state?.motivo ?? (requiereSesion
    ? "Tu sesión venció. Puedes iniciar sesión o volver al checkout para continuar como invitado."
    : "No pudimos procesar tu compra.");

  return (
    <PlantillaPublica>
      <AvisoResultado
        icono="bi bi-x-circle-fill"
        colorIcono="text-danger"
        titulo="No pudimos completar tu compra"
        texto={motivo}
        detalle={confirmacionIncierta
          ? "Tu carrito sigue guardado. El pedido podría haberse registrado. Comprueba el resultado antes de volver a pagar."
          : "Tu carrito sigue guardado."}
        textoSecundario={requiereSesion ? "Continuar como invitado" : "Volver al carrito"}
        onSecundario={() => navigate(requiereSesion ? "/checkout" : "/carrito")}
        textoBoton={requiereSesion ? "Iniciar sesión" : confirmacionIncierta && usuario ? "Ver mis pedidos" : "Volver al checkout"}
        onAccion={() => {
          if (requiereSesion) navigate("/login", { state: { desde: "/checkout" } });
          else navigate(confirmacionIncierta && usuario ? "/mis-pedidos" : "/checkout");
        }}
      />
    </PlantillaPublica>
  );
}
