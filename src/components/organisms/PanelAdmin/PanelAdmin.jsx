import { Col, Row } from 'react-bootstrap'
import { TarjetaDestacado } from '../../molecules/TarjetaDestacado/TarjetaDestacado'

// accesos a: [{ titulo, texto, textoBoton, ruta }]
export function PanelAdmin(props) {
  return (
    <Row as="section" className="g-4">
      {props.accesos.map((acceso) => (
        <Col as="article" key={acceso.ruta} xs={12} md={6}>
          <TarjetaDestacado
            titulo={acceso.titulo}
            descripcion={acceso.texto}
            textoBoton={acceso.textoBoton}
            onAccion={() => props.onNavegar(acceso.ruta)}
          />
        </Col>
      ))}
    </Row>
  )
}
