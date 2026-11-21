import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { MensajeEstado } from '../../components/atoms/MensajeEstado/MensajeEstado'
import { PlantillaPrivada } from '../../components/templates/PlantillaPrivada/PlantillaPrivada'
import { AvisoVacio } from '../../components/molecules/AvisoVacio/AvisoVacio'
import { FormularioUsuario } from '../../components/organisms/FormularioUsuario/FormularioUsuario'
import { useTituloPagina } from '../../hooks/useTituloPagina'
import { useUsuario } from '../../hooks/useUsuario'
import { comunasDe, regiones } from '../../data/ubicaciones'
import { actualizarUsuarioRequestDto } from '../../dto/usuario.dto'
import { obtenerErroresCampos, obtenerMensajeError } from '../../services/errores'
import { actualizarUsuario } from '../../services/usuarioService'
import { roles } from '../../utils/roles'

export default function AdminEditarUsuario() {
  const navigate = useNavigate()
  const params = useParams()
  const consulta = useUsuario(params.id)
  const [error, setError] = useState('')
  const [erroresServidor, setErroresServidor] = useState(null)
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Editar usuario')

  const usuario = consulta.usuario

  if (consulta.cargando) {
    return (
      <PlantillaPrivada>
        <MensajeEstado tipo="neutro">Cargando usuario...</MensajeEstado>
      </PlantillaPrivada>
    )
  }

  if (!usuario) {
    return (
      <PlantillaPrivada>
        {consulta.noEncontrado ? (
          <AvisoVacio
            titulo="Usuario no encontrado"
            texto={`No existe un usuario con el ID "${params.id}".`}
            textoBoton="Volver a usuarios"
            onAccion={() => navigate('/admin/usuarios')}
          />
        ) : (
          <MensajeEstado tipo="error">{consulta.error}</MensajeEstado>
        )}
      </PlantillaPrivada>
    )
  }

  async function guardar(cambios) {
    setCargando(true)
    setError('')
    setErroresServidor(null)
    try {
      await actualizarUsuario(usuario.id, actualizarUsuarioRequestDto(cambios))
      navigate(`/admin/usuarios/${usuario.id}`)
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
          {/* key: si cambia el usuario, el formulario se vuelve a montar con sus datos */}
          <FormularioUsuario
            key={usuario.id}
            titulo="Editar usuario"
            regiones={regiones}
            comunasDe={comunasDe}
            roles={roles}
            valoresIniciales={usuario}
            onEnviar={guardar}
            onCancelar={() => navigate(`/admin/usuarios/${usuario.id}`)}
            error={error}
            erroresServidor={erroresServidor}
            cargando={cargando}
          />
        </Col>
      </Row>
    </PlantillaPrivada>
  )
}
