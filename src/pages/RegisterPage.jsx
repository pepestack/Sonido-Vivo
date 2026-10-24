import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Register } from '../components/organisms/Register/Register'
import { useUsuarios } from '../context/UsuariosContext'
import { comunasDe, regiones } from '../data/ubicaciones'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { existeCorreo } from '../services/usuarioService'

export default function RegisterPage() {
  const navigate = useNavigate()
  const usuariosCtx = useUsuarios()
  useTituloPagina('Registrarse')

  // el registro tiene los mismos campos que crear un usuario en el panel de administración,
  // pero sin elegir rol: quien se registra siempre queda como Cliente
  function registrar(usuario) {
    usuariosCtx.agregarUsuario({ ...usuario, rol: 'Cliente' })
    navigate('/login')
  }

  return (
    <PlantillaPublica>
      <Row as="section" className="justify-content-center">
        <Col as="article" xs={12} md={6} lg={4}>
          <Register
            regiones={regiones}
            comunasDe={comunasDe}
            rutEnUso={(rut) => usuariosCtx.usuarios.some((u) => u.rut === rut)}
            correoEnUso={(correo) => existeCorreo(usuariosCtx.usuarios, correo)}
            onEnviar={registrar}
            onNavegar={navigate}
          />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}
