import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { AvisoVacio } from '../../components/molecules/AvisoVacio/AvisoVacio'
import { FormularioProducto } from '../../components/organisms/FormularioProducto/FormularioProducto'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { categorias } from '../../data/categorias'
import { useProductos } from '../../context/ProductosContext'

export default function AdminEditarProducto() {
  const navigate = useNavigate()
  const params = useParams()
  const productosCtx = useProductos()
  const producto = productosCtx.obtenerProducto(params.id)
  useTituloPagina('Editar producto')

  if (!producto) {
    return (
      <PlantillaPrivada>
        <AvisoVacio
          titulo="Producto no encontrado"
          textoBoton="Volver al inventario"
          onAccion={() => navigate('/admin/productos')}
        />
      </PlantillaPrivada>
    )
  }

  function guardar(cambios) {
    productosCtx.actualizarProducto(params.id, cambios)
    navigate(`/admin/productos/${cambios.id}`)
  }

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {/* key: si cambia el producto, el formulario se vuelve a montar con sus datos */}
          <FormularioProducto
            key={producto.id}
            titulo="Editar producto"
            valoresIniciales={producto}
            categorias={categorias}
            skuEnUso={(sku) => sku !== params.id && Boolean(productosCtx.obtenerProducto(sku))}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/productos')}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}