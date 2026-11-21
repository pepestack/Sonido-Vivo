import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Register } from '../components/organisms/Register/Register'
import { comunasDe, regiones } from '../data/ubicaciones'
import { crearRegistroRequestDto } from '../dto/usuario.dto'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerErroresCampos, obtenerMensajeError } from '../services/errores'
import { registrar } from '../services/sesionService'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [erroresServidor, setErroresServidor] = useState(null)
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Registrarse')

  // la API asigna siempre el rol Cliente y revisa que el RUN y el correo no estén en uso
  async function registrarUsuario(usuario) {
    setCargando(true)
    setError('')
    setErroresServidor(null)
    try {
      await registrar(crearRegistroRequestDto(usuario))
      navigate('/login')
    } catch (error) {
      setError(obtenerMensajeError(error))
      setErroresServidor(obtenerErroresCampos(error))
      setCargando(false)
    }
  }

  return (
    <PlantillaPublica>
      <Row as="section" className="justify-content-center">
        <Col as="article" xs={12} md={6} lg={4}>
          <Register
            regiones={regiones}
            comunasDe={comunasDe}
            onEnviar={registrarUsuario}
            onNavegar={navigate}
            error={error}
            erroresServidor={erroresServidor}
            cargando={cargando}
          />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}
