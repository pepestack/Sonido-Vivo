import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { AvisoVacio } from '../../components/molecules/AvisoVacio/AvisoVacio'
import { Encabezado } from '../../components/molecules/Encabezado/Encabezado'
import { ModalConfirmacion } from '../../components/molecules/ModalConfirmacion/ModalConfirmacion'
import { FichaProductoAdmin } from '../../components/organisms/FichaProductoAdmin/FichaProductoAdmin'
import { VistaImagenProducto } from '../../components/organisms/VistaImagenProducto/VistaImagenProducto'
import { MensajeEstado } from '../../components/atoms/MensajeEstado/MensajeEstado'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useCategorias } from '../../context/CategoriasContext'
import { useProductos } from '../../context/ProductosContext'
import { useSesion } from '../../context/SesionContext'
import { obtenerMensajeError } from '../../services/errores'
import { esAdministrador } from '../../utils/roles'

export default function AdminVerProducto() {
  const navigate = useNavigate()
  const params = useParams()
  const productosCtx = useProductos()
  const categoriasCtx = useCategorias()
  const sesion = useSesion()
  const producto = productosCtx.obtenerProducto(params.id)
  useTituloPagina(producto ? producto.nombre : 'Producto no encontrado')
  const [confirmando, setConfirmando] = useState(false)
  const [error, setError] = useState('')

  if (productosCtx.cargando) {
    return (
      <PlantillaPrivada>
        <MensajeEstado tipo="neutro">Cargando producto...</MensajeEstado>
      </PlantillaPrivada>
    )
  }

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

  async function eliminar() {
    setConfirmando(false)
    setError('')
    try {
      await productosCtx.eliminarProducto(producto.id)
      navigate('/admin/productos')
    } catch (error) {
      setError(obtenerMensajeError(error))
    }
  }

  return (
    <PlantillaPrivada>
      <Encabezado titulo="Detalle Producto" />
      <MensajeEstado tipo="error" className="mb-3">{error}</MensajeEstado>
      <Row className="g-4">
        <Col xs={12} lg={8}>
          <FichaProductoAdmin producto={producto} categorias={categoriasCtx.categorias} onEliminar={esAdministrador(sesion.usuario) ? () => setConfirmando(true) : undefined} onNavegar={navigate} />
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