import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FormularioCategoria } from '../../components/organisms/FormularioCategoria/FormularioCategoria'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { useCategorias } from '../../context/CategoriasContext'
import { useTituloPagina } from '../../hooks/useTituloPagina'

export default function AdminNuevaCategoria() {
  const navigate = useNavigate()
  const categoriasCtx = useCategorias()
  useTituloPagina('Nueva categoría')

  function guardar(texto) {
    categoriasCtx.agregarCategoria(texto)
    navigate('/admin/categorias')
  }

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <FormularioCategoria
            titulo="Registrar nueva categoría"
            valorEnUso={(valor) => Boolean(categoriasCtx.obtenerCategoria(valor))}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/categorias')}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
