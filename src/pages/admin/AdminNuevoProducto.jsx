import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { FormularioProducto } from '../../components/organisms/FormularioProducto/FormularioProducto'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useCategorias } from '../../context/CategoriasContext'
import { useProductos } from '../../context/ProductosContext'
import { erroresProductoDesdeApi } from '../../dto/producto.dto'
import { obtenerErroresCampos, obtenerMensajeError } from '../../services/errores'

export default function AdminNuevoProducto() {
  const navigate = useNavigate()
  const productosCtx = useProductos()
  const categoriasCtx = useCategorias()
  const [error, setError] = useState('')
  const [erroresServidor, setErroresServidor] = useState(null)
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Nuevo producto')

  async function guardar(producto) {
    setCargando(true)
    setError('')
    setErroresServidor(null)
    try {
      await productosCtx.agregarProducto(producto)
      navigate('/admin/productos')
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
          <FormularioProducto
            titulo="Registrar nuevo producto"
            categorias={categoriasCtx.categorias}
            skuEnUso={(sku) => Boolean(productosCtx.obtenerProducto(sku))}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/productos')}
            textoCancelar="Cancelar registro"
            error={error}
            erroresServidor={erroresServidor}
            cargando={cargando}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
