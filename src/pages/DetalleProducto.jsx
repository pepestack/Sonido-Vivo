import { useNavigate, useParams } from "react-router-dom";
import { AvisoVacio } from "../components/molecules/AvisoVacio/AvisoVacio";
import { FichaProducto } from "../components/organisms/FichaProducto/FichaProducto";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../context/ProductosContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function DetalleProducto() {
  const navigate = useNavigate();
  const params = useParams();
  const productosCtx = useProductos();
  const carrito = useCarrito();

  // Los ids de producto ya son strings ("GA001"), igual que useParams, así que no hace falta Number()
  const producto = productosCtx.obtenerProducto(params.id);
  useTituloPagina(producto ? producto.nombre : "Producto no encontrado");

  if (!producto) {
    return (
      <PlantillaPublica>
        <AvisoVacio
          titulo="Producto no encontrado"
          texto={`No existe un producto con el código "${params.id}".`}
          textoBoton="Ir al catálogo"
          onAccion={() => navigate("/catalogo")}
        />
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <FichaProducto
        key={producto.id}
        producto={producto}
        onAgregar={carrito.agregarAlCarrito}
      />
    </PlantillaPublica>
  );
}
