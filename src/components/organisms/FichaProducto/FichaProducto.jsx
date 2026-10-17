import { Card, Table } from 'react-bootstrap'
import { Imagen } from '../../atoms/Imagen/Imagen'
import { Precio } from '../../atoms/Precio/Precio'
import { Texto } from '../../atoms/Texto/Texto'
import { FilaDetalle } from '../../atoms/FilaDetalle/FilaDetalle'
import { BarraAcciones } from '../../molecules/BarraAcciones/BarraAcciones'
import { nombreCategoria } from '../../../utils/formato'
import codigoBarras from '../../../assets/images/dummy-upc.jpg'

function estadoStock(producto) {
  if (producto.stock <= 0) return { texto: 'Agotado', clase: 'text-danger' }
  if (producto.stock <= producto.stockCritico) return { texto: 'Stock crítico', clase: 'text-warning' }
  return { texto: 'Disponible', clase: 'text-success' }
}

export function FichaProducto(props) {
  const producto = props.producto
  const estado = estadoStock(producto)

  return (
    <Card className="border-0 shadow-sm p-4">
      <div className="d-inline-flex border rounded p-2 mb-4 col-6 col-md-4">
        <Imagen src={codigoBarras} alt="UPC de prueba" className="img-thumbnail w-auto" />
      </div>
      <Table responsive bordered className="align-middle mb-0">
        <tbody>
          <FilaDetalle etiqueta="Producto">
            <span className="fw-semibold">{producto.nombre}</span>
          </FilaDetalle>
          <FilaDetalle etiqueta="Categoría">{nombreCategoria(producto.categoria)}</FilaDetalle>
          <FilaDetalle etiqueta="Marca">{producto.marca || '—'}</FilaDetalle>
          <FilaDetalle etiqueta="Modelo">{producto.modelo || '—'}</FilaDetalle>
          <FilaDetalle etiqueta="SKU">{producto.id}</FilaDetalle>
          <FilaDetalle etiqueta="Stock Crítico">{producto.stockCritico}</FilaDetalle>
          <FilaDetalle etiqueta="Stock">{producto.stock}</FilaDetalle>
          <FilaDetalle etiqueta="Precio">
            <Precio monto={producto.precio} />
          </FilaDetalle>
          <FilaDetalle etiqueta="Estado">
            <Texto como="span" className={estado.clase}>
              {estado.texto}
            </Texto>
          </FilaDetalle>
          <FilaDetalle etiqueta="Descripción">{producto.descripcion || '—'}</FilaDetalle>
        </tbody>
      </Table>
      <BarraAcciones
        onVolver={() => props.onNavegar('/admin/productos')}
        onEditar={() => props.onNavegar(`/admin/productos/${producto.id}/editar`)}
        onEliminar={props.onEliminar}
      />
    </Card>
  )
}
