import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { FormularioUsuario } from '../../components/organisms/FormularioUsuario/FormularioUsuario'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { comunasDe, regiones } from '../../data/ubicaciones'
import { crearUsuarioRequestDto } from '../../dto/usuario.dto'
import { obtenerErroresCampos, obtenerMensajeError } from '../../services/errores'
import { crearUsuario } from '../../services/usuarioService'
import { roles } from '../../utils/roles'

export default function AdminNuevoUsuario() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [erroresServidor, setErroresServidor] = useState(null)
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Nuevo usuario')

  async function guardar(usuario) {
    setCargando(true)
    setError('')
    setErroresServidor(null)
    try {
      await crearUsuario(crearUsuarioRequestDto(usuario))
      navigate('/admin/usuarios')
    } catch (error) {
      setError(obtenerMensajeError(error))
      setErroresServidor(obtenerErroresCampos(error))
      setCargando(false)
    }
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
            onEnviar={guardar}
            onCancelar={() => navigate('/admin/usuarios')}
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
