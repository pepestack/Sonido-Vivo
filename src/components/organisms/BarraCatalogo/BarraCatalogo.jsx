import { Encabezado } from '../../molecules/Encabezado/Encabezado'
import { FiltroCategoria } from '../../molecules/FiltroCategoria/FiltroCategoria'

export function BarraCatalogo({ categoria, categorias, onCambiarCategoria }) {
  return (
    <Encabezado titulo="Catálogo de Sonido Vivo" claseTitulo="">
      <FiltroCategoria valor={categoria} categorias={categorias} onCambiar={onCambiarCategoria} />
    </Encabezado>
  )
}
