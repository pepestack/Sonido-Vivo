import { Encabezado } from '../../molecules/Encabezado/Encabezado'
import { FiltroCategoria } from '../../molecules/FiltroCategoria/FiltroCategoria'

export function BarraCatalogo(props) {
  return (
    <Encabezado titulo="Catálogo de Sonido Vivo" claseTitulo="">
      <FiltroCategoria valor={props.categoria} categorias={props.categorias} onCambiar={props.onCambiarCategoria} />
    </Encabezado>
  )
}
