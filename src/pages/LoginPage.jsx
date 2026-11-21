import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Login } from '../components/organisms/Login/Login'
import { useSesion } from '../context/SesionContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { obtenerMensajeError } from '../services/errores'
import { esCliente } from '../utils/roles'


function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const sesion = useSesion()
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  useTituloPagina('Iniciar sesión')

  async function ingresar(credenciales) {
    setCargando(true)
    setError('')
    let usuario
    try {
      usuario = await sesion.iniciarSesion(credenciales.email, credenciales.contrasena)
    } catch (error) {
      setError(obtenerMensajeError(error))
      setCargando(false)
      return
    }
    // si llegó desde otra página (ej. el checkout) vuelve ahí; si no, el personal va al panel y el cliente al inicio.
    // un cliente no vuelve a una página del panel, porque no tiene acceso
    const inicio = esCliente(usuario) ? '/' : '/admin'
    const desde = location.state?.desde
    const puedeVolver = desde && !(esCliente(usuario) && desde.startsWith('/admin'))
    navigate(puedeVolver ? desde : inicio, { replace: true })
  }

  return (
    <PlantillaPublica>
      <Row as="section" className="justify-content-center">
        <Col as="article" xs={12} md={6} lg={4}>
          <Login onEnviar={ingresar} onNavegar={navigate} error={error} cargando={cargando} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}

export default LoginPage;
