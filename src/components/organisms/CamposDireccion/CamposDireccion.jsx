import { Col, Row } from 'react-bootstrap'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'

// Región, comuna y dirección: los usan el formulario de usuario, el registro y el checkout.
// formulario: el resultado de useFormulario (debe tener region, comuna y direccion en sus valores)
// regiones y comunasDe(region) llegan por props; compacto: un campo por fila, para tarjetas angostas
export function CamposDireccion(props) {
  const formulario = props.formulario
  const valores = formulario.valores
  const errores = formulario.errores
  const ancho = props.compacto ? 12 : 6

  // la comuna depende de la región: al cambiar de región se borra la comuna elegida
  function manejarRegion(evento) {
    const region = evento.target.value
    formulario.setValores((actuales) => ({ ...actuales, region, comuna: '' }))
    formulario.setErrores((actuales) => ({ ...actuales, region: '', comuna: '' }))
  }

  return (
    <>
      <Row>
        <Col xs={12} md={ancho}>
          <CampoFormulario
            id="region"
            etiqueta="Región"
            tipo="select"
            placeholder="Selecciona la región"
            requerido
            opciones={props.regiones}
            valor={valores.region}
            onChange={manejarRegion}
            error={errores.region}
          />
        </Col>
        <Col xs={12} md={ancho}>
          <CampoFormulario
            id="comuna"
            etiqueta="Comuna"
            tipo="select"
            placeholder={valores.region ? 'Selecciona la comuna' : 'Primero elige una región'}
            requerido
            deshabilitado={!valores.region}
            opciones={props.comunasDe(valores.region)}
            valor={valores.comuna}
            onChange={formulario.manejarCambio}
            error={errores.comuna}
          />
        </Col>
      </Row>
      <CampoFormulario
        id="direccion"
        etiqueta="Dirección"
        tipo="textarea"
        filas={2}
        maxLength={300}
        requerido
        valor={valores.direccion}
        onChange={formulario.manejarCambio}
        error={errores.direccion}
      />
    </>
  )
}
