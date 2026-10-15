import { useNavigate, useParams } from "react-router-dom";
import { BarraCatalogo } from "../components/organisms/BarraCatalogo/BarraCatalogo";
import { GrillaProductos } from "../components/organisms/GrillaProductos/GrillaProductos";
import { useCarrito } from "../context/CarritoContext"
import { useProductos } from "../context/ProductosContext"
import { categorias } from "../data/categorias";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { filtrarProductos } from "../utils/filtrarProductos";
import { nombreCategoria } from "../utils/formato";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";

export default function Catalogo() {
  const navigate = useNavigate()
  const params = useParams()
  const nombre = params.nombre ?? ''
  const texto = params.texto ?? ''
  const productosCtx = useProductos()
  const carrito = useCarrito()

  const visibles = filtrarProductos(productosCtx.productos, { texto, categoria: nombre })

  let titulo = 'Catálogo de Sonido Vivo'
  if (nombre) titulo = nombreCategoria(nombre)
  if (texto) titulo = `Resultados para "${texto}"`
  useTituloPagina(titulo)

  function cambiarCategoria(valor) {
    navigate(valor === 'todos' ? '/catalogo' : `/categoria/${valor}`)
  }

  return (
    <PlantillaPublica>
      <BarraCatalogo
        titulo={titulo}
        categoria={nombre || 'todos'}
        categorias={categorias}
        onCambiarCategoria={cambiarCategoria}
      />
      <GrillaProductos
        productos={visibles}
        onAgregar={carrito.agregarAlCarrito}
        onNavegar={navigate}
        mostrarDescripcion
      />
    </PlantillaPublica>
  )
}
