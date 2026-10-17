import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Register } from '../components/organisms/Register/Register'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function RegisterPage() {
  const navigate = useNavigate()
  useTituloPagina('Registrarse')

  return (
    <PlantillaPublica>
      <Row as="section" className="justify-content-center">
        <Col as="article" xs={12} md={6} lg={4}>
          <Register onEnviar={() => navigate('/login')} onNavegar={navigate} />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}

