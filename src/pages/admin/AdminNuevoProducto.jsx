import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { FormularioProducto } from '../../components/organisms/FormularioProducto/FormularioProducto'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useCategorias } from '../../context/CategoriasContext'
import { useProductos } from '../../context/ProductosContext'

export default function AdminNuevoProducto() {
  const navigate = useNavigate()
  const productosCtx = useProductos()
  const categoriasCtx = useCategorias()
  useTituloPagina('Nuevo producto')

  function guardar(producto) {
    productosCtx.agregarProducto(producto)
    navigate('/admin/productos')
  }

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <FormularioProducto
            titulo="Registrar nuevo producto"
            categorias={categoriasCtx.categorias}
            skuEnUso={(sku) => Boolean(productosCtx.obtenerProducto(sku))}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/productos')}
            textoCancelar="Cancelar registro"
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
