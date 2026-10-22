import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { AvisoVacio } from '../../components/molecules/AvisoVacio/AvisoVacio'
import { Encabezado } from '../../components/molecules/Encabezado/Encabezado'
import { ModalConfirmacion } from '../../components/molecules/ModalConfirmacion/ModalConfirmacion'
import { FichaProductoAdmin } from '../../components/organisms/FichaProductoAdmin/FichaProductoAdmin'
import { VistaImagenProducto } from '../../components/organisms/VistaImagenProducto/VistaImagenProducto'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useCategorias } from '../../context/CategoriasContext'
import { useProductos } from '../../context/ProductosContext'

export default function AdminVerProducto() {
  const navigate = useNavigate()
  const params = useParams()
  const productosCtx = useProductos()
  const categoriasCtx = useCategorias()
  const producto = productosCtx.obtenerProducto(params.id)
  useTituloPagina(producto ? producto.nombre : 'Producto no encontrado')
  const [confirmando, setConfirmando] = useState(false)

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

  function eliminar() {
    productosCtx.eliminarProducto(producto.id)
    navigate('/admin/productos')
  }

  return (
    <PlantillaPrivada>
      <Encabezado titulo="Detalle Producto" />
      <Row className="g-4">
        <Col xs={12} lg={8}>
          <FichaProductoAdmin producto={producto} categorias={categoriasCtx.categorias} onEliminar={() => setConfirmando(true)} onNavegar={navigate} />
        </Col>
        <Col xs={12} lg={4}>
          <VistaImagenProducto imagen={producto.imagen} nombre={producto.nombre} />
        </Col>
      </Row>
      <ModalConfirmacion
        visible={confirmando}
        titulo="Confirmar eliminación"
        textoConfirmar="Eliminar"
        variante="danger"
        mensaje={`¿Eliminar "${producto.nombre}"?`}
        onConfirmar={eliminar}
        onCancelar={() => setConfirmando(false)}
      />
    </PlantillaPrivada>
  )
}