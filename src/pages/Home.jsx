import { CarruselHero } from "../components/organisms/CarruselHero/CarruselHero";
import { SeccionPresentacion } from "../components/organisms/SeccionPresentacion/SeccionPresentacion";
import { imagenesCarrusel } from "../data/carrusel";
import imgTienda from "../assets/images/tienda-fisica.jpg"
import { idsDestacados } from "../data/listaProductos";
import { useCarrito } from "../context/CarritoContext"
import { useCategorias } from "../context/CategoriasContext"
import { useProductos } from "../context/ProductosContext"
import { useTituloPagina } from "../hooks/useTituloPagina"
import { GrillaProductos } from '../components/organisms/GrillaProductos/GrillaProductos'
import { GrillaCategorias } from '../components/organisms/GrillaCategorias/GrillaCategorias'
import { conCantidades } from '../services/categoriaService'
import { useNavigate } from "react-router-dom";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";

export default function Home(){
    const navigate = useNavigate()
    const productosCtx = useProductos()
    const carrito = useCarrito()
    const categoriasCtx = useCategorias()
    useTituloPagina('Inicio')

    const destacados = idsDestacados.map((id) => productosCtx.obtenerProducto(id)).filter(Boolean)
    const categorias = conCantidades(categoriasCtx.categorias, productosCtx.productos)

    return (
    <PlantillaPublica>
      <CarruselHero imagenes={imagenesCarrusel}/>
      <SeccionPresentacion
        titulo="Sonido Vivo"
        tituloAnimado
        texto="Visítanos en nuestra tienda en Viña del Mar o explora nuestro catálogo con más de 300 productos. Hacemos envíos y entregas a todo el país para que tu sonido no se detenga."
        imagen={imgTienda}
        alt="Interior de tienda física Sonido Vivo"
        textoBoton="Ver más"
        onAccion={() => navigate('/catalogo')}
      />
      <GrillaCategorias
        titulo="Explora por categoría"
        categorias={categorias}
        onNavegar={navigate}
        className="mt-5"
      />
      <GrillaProductos
        titulo="Productos destacados"
        productos={destacados}
        animado
        onAgregar={carrito.agregarAlCarrito}
        onNavegar={navigate}
        className="my-5 py-5"
      />
    </PlantillaPublica>
  )
}