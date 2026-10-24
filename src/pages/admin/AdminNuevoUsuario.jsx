import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { FormularioUsuario } from '../../components/organisms/FormularioUsuario/FormularioUsuario'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useUsuarios } from '../../context/UsuariosContext'
import { comunasDe, regiones } from '../../data/ubicaciones'
import { roles } from '../../utils/roles'
import { existeCorreo } from '../../services/usuarioService'

export default function AdminNuevoUsuario() {
  const navigate = useNavigate()
  const usuariosCtx = useUsuarios()
  useTituloPagina('Nuevo usuario')

  function guardar(usuario) {
    usuariosCtx.agregarUsuario(usuario)
    navigate('/admin/usuarios')
  }

  return (
    <PlantillaPrivada>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <FormularioUsuario
            titulo="Registrar nuevo usuario"
            regiones={regiones}
            comunasDe={comunasDe}
            roles={roles}
            rutEnUso={(rut) => usuariosCtx.usuarios.some((u) => u.rut === rut)}
            correoEnUso={(correo) => existeCorreo(usuariosCtx.usuarios, correo)}
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/usuarios')}
            textoCancelar="Cancelar registro"
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
