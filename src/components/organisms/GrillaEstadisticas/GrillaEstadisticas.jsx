import { Col, Row } from 'react-bootstrap'
import { TarjetaEstadistica } from '../../molecules/TarjetaEstadistica/TarjetaEstadistica'

// estadisticas: [{ titulo, valor, icono, color? }]
// Una por fila en móvil, dos en tableta y todas en una fila en pantallas grandes
export function GrillaEstadisticas(props) {
  return (
    <Row as="section" className="g-3 mb-4">
      {props.estadisticas.map((estadistica) => (
        <Col key={estadistica.titulo} xs={12} sm={6} xl>
          <TarjetaEstadistica {...estadistica} />
        </Col>
      ))}
    </Row>
  )
}
