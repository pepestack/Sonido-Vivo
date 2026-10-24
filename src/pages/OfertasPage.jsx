import { useNavigate } from "react-router-dom";
import { GrillaProductos } from "../components/organisms/GrillaProductos/GrillaProductos";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../context/ProductosContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { productosEnOferta } from "../services/productoService";

export default function OfertasPage() {
  const navigate = useNavigate();
  const productosCtx = useProductos();
  const carrito = useCarrito();
  useTituloPagina("Ofertas");

  // se calcula en cada render a partir del contexto, igual que en AdminCriticos
  const ofertas = productosEnOferta(productosCtx.productos);

  return (
    <PlantillaPublica>
      <GrillaProductos
        titulo="Ofertas"
        nivelTitulo={1}
        productos={ofertas}
        onAgregar={carrito.agregarAlCarrito}
        onNavegar={navigate}
        mostrarDescripcion
      />
    </PlantillaPublica>
  );
}
