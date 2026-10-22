import { Encabezado } from '../../molecules/Encabezado/Encabezado'
import { FiltroCategoria } from '../../molecules/FiltroCategoria/FiltroCategoria'

// titulo: lo arma la página según la URL (catálogo, categoría o búsqueda)
export function BarraCatalogo(props) {
  return (
    <Encabezado titulo={props.titulo} claseTitulo="">
      <FiltroCategoria valor={props.categoria} categorias={props.categorias} onCambiar={props.onCambiarCategoria} />
    </Encabezado>
  )
}
