import { FilaProductoAdmin } from '../../molecules/FilaProductoAdmin/FilaProductoAdmin'
import { TablaAdmin } from '../TablaAdmin/TablaAdmin'

const columnas = [
  { texto: 'Código producto (SKU)', className: 'ps-4' },
  { texto: 'Nombre' },
  { texto: 'Precio' },
  { texto: 'Stock' },
  { texto: 'Categoría' },
  { texto: 'Acciones', className: 'text-end pe-4' },
]

// categorias: las actuales, para mostrar el nombre de la categoría de cada producto
export function TablaProductos(props) {
  return (
    <TablaAdmin columnas={columnas} vacia={props.productos.length === 0} mensajeVacio="No hay productos registrados.">
      {props.productos.map((producto) => (
        <FilaProductoAdmin
          key={producto.id}
          producto={producto}
          categorias={props.categorias}
          onVer={props.onVer}
          onEditar={props.onEditar}
          onEliminar={props.onEliminar}
        />
      ))}
    </TablaAdmin>
  )
}
