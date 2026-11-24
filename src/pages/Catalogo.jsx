import { useNavigate, useParams } from "react-router-dom";
import { BarraCatalogo } from "../components/organisms/BarraCatalogo/BarraCatalogo";
import { GrillaProductos } from "../components/organisms/GrillaProductos/GrillaProductos";
import { useCarrito } from "../context/CarritoContext"
import { useProductos } from "../context/ProductosContext"
import { useCategorias } from "../context/CategoriasContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { filtrarProductos } from "../utils/filtrarProductos";
import { PlantillaPublica } from "../components/templates/PlantillaPublica/PlantillaPublica";
import { MensajeEstado } from "../components/atoms/MensajeEstado/MensajeEstado";

export default function Catalogo() {
  const navigate = useNavigate()
  const params = useParams()
  const nombre = params.nombre ?? ''
  const texto = params.texto ?? ''
  const productosCtx = useProductos()
  const categoriasCtx = useCategorias()
  const carrito = useCarrito()

  const visibles = filtrarProductos(productosCtx.productos, { texto, categoria: nombre })

  let titulo = 'Catálogo de Sonido Vivo'
  if (nombre) titulo = categoriasCtx.nombreCategoria(nombre)
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
        categorias={categoriasCtx.categorias}
        onCambiarCategoria={cambiarCategoria}
      />
      <MensajeEstado tipo="error" className="my-4 text-center">{productosCtx.error}</MensajeEstado>
      {productosCtx.cargando ? (
        <MensajeEstado tipo="neutro" className="my-5 text-center">Cargando productos...</MensajeEstado>
      ) : (
        <GrillaProductos
          productos={visibles}
          onAgregar={carrito.agregarAlCarrito}
          onNavegar={navigate}
          mostrarDescripcion
        />
      )}
    </PlantillaPublica>
  )
}
