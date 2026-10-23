import { FilaCategoriaAdmin } from '../../molecules/FilaCategoriaAdmin/FilaCategoriaAdmin'
import { TablaAdmin } from '../TablaAdmin/TablaAdmin'

const columnas = [
  { texto: 'Nombre', className: 'ps-4' },
  { texto: 'Dirección' },
  { texto: 'Productos' },
  { texto: 'Acciones', className: 'text-end pe-4' },
]

// categorias: [{ valor, texto, cantidad }]; onEditar y onEliminar reciben la categoría completa
export function TablaCategorias(props) {
  return (
    <TablaAdmin columnas={columnas} vacia={props.categorias.length === 0} mensajeVacio="No hay categorías registradas.">
      {props.categorias.map((categoria) => (
        <FilaCategoriaAdmin
          key={categoria.valor}
          categoria={categoria}
          onEditar={props.onEditar}
          onEliminar={props.onEliminar}
        />
      ))}
    </TablaAdmin>
  )
}
