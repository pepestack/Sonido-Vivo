import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { AvisoVacio } from '../../components/molecules/AvisoVacio/AvisoVacio'
import { FormularioUsuario } from '../../components/organisms/FormularioUsuario/FormularioUsuario'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useUsuarios } from '../../context/UsuariosContext'
import { comunasDe, regiones } from '../../data/ubicaciones'
import { roles } from '../../utils/roles'

export default function AdminEditarUsuario() {
  const navigate = useNavigate()
  const params = useParams()
  const usuariosCtx = useUsuarios()
  const usuario = usuariosCtx.obtenerUsuario(params.id)
  useTituloPagina('Editar usuario')

  if (!usuario) {
    return (
      <PlantillaPrivada>
        <AvisoVacio
          titulo="Usuario no encontrado"
          texto={`No existe un usuario con el ID "${params.id}".`}
          textoBoton="Volver a usuarios"
          onAccion={() => navigate('/admin/usuarios')}
        />
      </PlantillaPrivada>
    )
  }

  function guardar(cambios) {
    usuariosCtx.actualizarUsuario(usuario.id, cambios)
    navigate(`/admin/usuarios/${usuario.id}`)
  }

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          {/* key: si cambia el usuario, el formulario se vuelve a montar con sus datos */}
          <FormularioUsuario
            key={usuario.id}
            titulo="Editar usuario"
            regiones={regiones}
            comunasDe={comunasDe}
            roles={roles}
            valoresIniciales={usuario}
            rutEnUso={(rut) => usuariosCtx.usuarios.some((u) => u.rut === rut && u.id !== usuario.id)}
            onEnviar={guardar}
            onCancelar={() => navigate(`/admin/usuarios/${usuario.id}`)}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
