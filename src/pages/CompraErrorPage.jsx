import { useLocation, useNavigate } from "react-router-dom";
import { AvisoResultado } from "../components/organisms/AvisoResultado/AvisoResultado";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function CompraErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  useTituloPagina("Error en la compra");

  // el checkout envía el motivo en el state de la navegación
  const motivo = location.state?.motivo ?? "No pudimos procesar tu compra.";

  return (
    <PlantillaPublica>
      <AvisoResultado
        icono="bi bi-x-circle-fill"
        colorIcono="text-danger"
        titulo="No pudimos completar tu compra"
        texto={motivo}
        detalle="No se realizó ningún cargo y tu carrito sigue guardado."
        textoSecundario="Volver al carrito"
        onSecundario={() => navigate("/carrito")}
        textoBoton="Reintentar"
        onAccion={() => navigate("/checkout")}
      />
    </PlantillaPublica>
  );
}
