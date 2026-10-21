import { useLocation, useNavigate } from "react-router-dom";
import { Boton } from "../components/atoms/Boton/Boton";
import { Icono } from "../components/atoms/Icono/Icono";
import { Texto } from "../components/atoms/Texto/Texto";
import { Titulo } from "../components/atoms/Titulo/Titulo";
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
      <section className="text-center py-5">
        <Icono icono="bi bi-x-circle-fill" className="text-danger display-4" />
        <Titulo nivel={1} className="h3 fw-bold mt-3">No pudimos completar tu compra</Titulo>
        <Texto className="fs-5 mb-2">{motivo}</Texto>
        <Texto className="text-muted mb-4">No se realizó ningún cargo y tu carrito sigue guardado.</Texto>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <Boton variante="outline-secondary" onClick={() => navigate("/carrito")}>
            Volver al carrito
          </Boton>
          <Boton onClick={() => navigate("/checkout")}>Reintentar</Boton>
        </div>
      </section>
    </PlantillaPublica>
  );
}
