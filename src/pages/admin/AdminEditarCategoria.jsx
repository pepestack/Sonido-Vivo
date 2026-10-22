import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AvisoVacio } from '../../components/molecules/AvisoVacio/AvisoVacio'
import { FormularioCategoria } from '../../components/organisms/FormularioCategoria/FormularioCategoria'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { useCategorias } from '../../context/CategoriasContext'
import { useTituloPagina } from '../../hooks/useTituloPagina'

export default function AdminEditarCategoria() {
  const navigate = useNavigate()
  const params = useParams()
  const categoriasCtx = useCategorias()
  const categoria = categoriasCtx.obtenerCategoria(params.valor)
  useTituloPagina('Editar categoría')

  if (!categoria) {
    return (
      <PlantillaPrivada>
        <AvisoVacio
          titulo="Categoría no encontrada"
          textoBoton="Volver a categorías"
          onAccion={() => navigate('/admin/categorias')}
        />
      </PlantillaPrivada>
    )
  }

  function guardar(texto) {
    categoriasCtx.actualizarCategoria(categoria.valor, texto)
    navigate('/admin/categorias')
  }

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {/* key: si cambia la categoría, el formulario se vuelve a montar con su nombre */}
          <FormularioCategoria
            key={categoria.valor}
            titulo="Editar categoría"
            textoInicial={categoria.texto}
            valorFijo={categoria.valor}
            valorEnUso={(valor) => valor !== categoria.valor && Boolean(categoriasCtx.obtenerCategoria(valor))}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/categorias')}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
