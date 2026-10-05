import EncabezadoPagina from '../molecules/Encabezado'
import FiltroCategoria from '../molecules/FiltroCategoria'

export default function BarraCatalogo({ categoria, categorias, onCambiarCategoria }) {
  return (
    <EncabezadoPagina titulo="Catálogo de Sonido Vivo" claseTitulo="">
      <FiltroCategoria valor={categoria} categorias={categorias} onCambiar={onCambiarCategoria} />
    </EncabezadoPagina>
  )
}
