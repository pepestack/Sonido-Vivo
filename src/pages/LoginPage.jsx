import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Login } from '../components/organisms/Login/Login'
import { useSesion } from '../context/SesionContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { esCliente } from '../utils/roles'


function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const sesion = useSesion()
  const [error, setError] = useState('')
  useTituloPagina('Iniciar sesión')

  function ingresar(credenciales) {
    const usuario = sesion.iniciarSesion(credenciales.email, credenciales.contrasena)
    if (!usuario) {
      setError('Correo o contraseña incorrectos')
      return
    }
    // si llegó desde otra página (ej. el checkout) vuelve ahí; si no, el personal va al panel y el cliente al inicio
    const destino = location.state?.desde ?? (esCliente(usuario) ? '/' : '/admin')
    navigate(destino, { replace: true })
  }

  return (
    <PlantillaPublica>
      <Row as="section" className="justify-content-center">
        <Col as="article" xs={12} md={6} lg={4}>
          <Login onEnviar={ingresar} onNavegar={navigate} error={error} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}

export default LoginPage;
