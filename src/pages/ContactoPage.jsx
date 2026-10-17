import { Col, Row } from 'react-bootstrap'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'
import { Contacto } from '../components/organisms/Contacto/Contacto'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function ContactoPage() {
  useTituloPagina('Contacto')

  return (
    <PlantillaPublica>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Contacto />
        </Col>
      </Row>
    </PlantillaPublica>
  )
}

