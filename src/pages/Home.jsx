import { CarruselHero } from "../components/organisms/CarruselHero/CarruselHero";
import { SeccionPresentacion } from "../components/organisms/SeccionPresentacion/SeccionPresentacion";
import { imagenesCarrusel } from "../data/carrusel";
import imgTienda from "../assets/images/tienda-fisica.jpg"
import { idsDestacados } from "../data/listaProductos";
import { useCarrito, useProducto} from '../context/useContexto'
import { GrillaProductos } from '../components/organisms/GrillaProductos/GrillaProductos'

export default function Home(){
    const {obtenerProducto} = useProducto()
    const {agregarAlCarrito} = useCarrito()
    const destacados = idsDestacados.map(obtenerProducto).filter(Boolean)
    return(
        <>
            <CarruselHero imagenes={imagenesCarrusel}/>

            <SeccionPresentacion
                titulo="Sonido Vivo"
                texto="Visítanos en nuestra tienda en Viña del Mar o explora nuestro catálogo con más de 300 productos. Hacemos envíos y entregas a todo el país para que tu sonido no se detenga."
                imagen={imgTienda}
                alt="Interior de tienda física Sonido Vivo"
                textoBoton="Ver más"
                rutaBoton="/catalogo"
            />
            <GrillaProductos
                titulo="Productos destacados"
                productos={destacados}
                onAgregar={agregarAlCarrito}
                className="my-5 py-5"
            />
        </>
    )
}