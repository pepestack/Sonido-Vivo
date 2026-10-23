import { Encabezado } from '../../molecules/Encabezado/Encabezado'
import { SelectorEnLinea } from '../../molecules/SelectorEnLinea/SelectorEnLinea'

// titulo: lo arma la página según la URL (catálogo, categoría o búsqueda)
// categoria 'todos' = sin filtro
export function BarraCatalogo(props) {
  const opciones = [{ valor: 'todos', texto: 'Todas las categorias' }, ...props.categorias]

  return (
    <Encabezado titulo={props.titulo} claseTitulo="">
      <SelectorEnLinea
        id="filtro-categoria"
        etiqueta="Filtrar:"
        valor={props.categoria}
        opciones={opciones}
        onCambiar={props.onCambiarCategoria}
        className="justify-content-md-end"
      />
    </Encabezado>
  )
}
