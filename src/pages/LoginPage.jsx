import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Login } from '../components/organisms/Login/Login'
import { useTituloPagina } from '../hooks/useTituloPagina'


function LoginPage() {
  const navigate = useNavigate()
  useTituloPagina('Iniciar sesión')

  return (
    <PlantillaPublica>
      <Row as="section" className="justify-content-center">
        <Col as="article" xs={12} md={6} lg={4}>
          <Login onEnviar={() => navigate('/')} onNavegar={navigate} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}

export default LoginPage;
