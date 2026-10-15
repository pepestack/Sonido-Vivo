import { CarruselHero } from "../components/organisms/CarruselHero/CarruselHero";
import { SeccionPresentacion } from "../components/organisms/SeccionPresentacion/SeccionPresentacion";
import { imagenesCarrusel } from "../data/carrusel";
import imgTienda from "../assets/images/tienda-fisica.jpg"
import { idsDestacados } from "../data/listaProductos";
import { useCarrito } from "../context/CarritoContext"
import { useProductos } from "../context/ProductosContext"
import { useTituloPagina } from "../hooks/useTituloPagina"
import { GrillaProductos } from '../components/organisms/GrillaProductos/GrillaProductos'
import { useNavigate } from "react-router-dom";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";

export default function Home(){
    const navigate = useNavigate()
    const productosCtx = useProductos()
    const carrito = useCarrito()
    useTituloPagina('Inicio')

    const destacados = idsDestacados.map((id) => productosCtx.obtenerProducto(id)).filter(Boolean)

    return (
    <PlantillaPublica>
      <CarruselHero imagenes={imagenesCarrusel}/>
      <SeccionPresentacion
        titulo="Sonido Vivo"
        texto="Visítanos en nuestra tienda en Viña del Mar o explora nuestro catálogo con más de 300 productos. Hacemos envíos y entregas a todo el país para que tu sonido no se detenga."
        imagen={imgTienda}
        alt="Interior de tienda física Sonido Vivo"
        textoBoton="Ver más"
        onAccion={() => navigate('/catalogo')}
      />
      <GrillaProductos
        titulo="Productos destacados"
        productos={destacados}
        onAgregar={carrito.agregarAlCarrito}
        onNavegar={navigate}
        className="my-5 py-5"
      />
    </PlantillaPublica>
  )
}