import { Col, Row } from 'react-bootstrap'
import { TarjetaAccion } from '../../molecules/TarjetaAccion/TarjetaAccion'

// accesos a: [{ titulo, texto, textoBoton, ruta }]
export function PanelAdmin({ accesos }) {
  return (
    <Row as="section" className="g-4">
      {accesos.map((acceso) => (
        <Col as="article" key={acceso.ruta} xs={12} md={6}>
          <TarjetaAccion {...acceso} />
        </Col>
      ))}
    </Row>
  )
}
