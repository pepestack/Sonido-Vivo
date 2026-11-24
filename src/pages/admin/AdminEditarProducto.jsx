import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { AvisoVacio } from '../../components/molecules/AvisoVacio/AvisoVacio'
import { MensajeEstado } from '../../components/atoms/MensajeEstado/MensajeEstado'
import { FormularioProducto } from '../../components/organisms/FormularioProducto/FormularioProducto'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useCategorias } from '../../context/CategoriasContext'
import { useProductos } from '../../context/ProductosContext'
import { erroresProductoDesdeApi } from '../../dto/producto.dto'
import { obtenerErroresCampos, obtenerMensajeError } from '../../services/errores'

export default function AdminEditarProducto() {
  const navigate = useNavigate()
  const params = useParams()
  const productosCtx = useProductos()
  const categoriasCtx = useCategorias()
  const [error, setError] = useState('')
  const [erroresServidor, setErroresServidor] = useState(null)
  const [cargando, setCargando] = useState(false)
  const producto = productosCtx.obtenerProducto(params.id)
  useTituloPagina('Editar producto')

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

  async function guardar(cambios) {
    setCargando(true)
    setError('')
    setErroresServidor(null)
    try {
      const actualizado = await productosCtx.actualizarProducto(params.id, cambios)
      navigate(`/admin/productos/${actualizado.id}`)
    } catch (error) {
      setError(obtenerMensajeError(error))
      setErroresServidor(erroresProductoDesdeApi(obtenerErroresCampos(error)))
      setCargando(false)
    }
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
            categorias={categoriasCtx.categorias}
            skuEnUso={(sku) => sku !== params.id && Boolean(productosCtx.obtenerProducto(sku))}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/productos')}
            error={error}
            erroresServidor={erroresServidor}
            cargando={cargando}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
