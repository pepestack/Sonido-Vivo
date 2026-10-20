import { Col, Row } from 'react-bootstrap'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { LARGO_MAXIMO_CLAVE, LARGO_MAXIMO_CORREO } from '../../../utils/validaciones'

// Campos del usuario compartidos por el formulario del admin y el registro público.
// formulario: el resultado de useFormulario (valores, errores, manejarCambio...)
// regiones, comunasDe(region) y roles llegan por props
// ocultarRol: esconde el selector de rol; compacto: un campo por fila, para tarjetas angostas
export function CamposUsuario(props) {
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
            id="rut"
            etiqueta="RUN"
            placeholder="Ej: 19011022K"
            maxLength={9}
            requerido
            valor={valores.rut}
            onChange={formulario.manejarCambio}
            error={errores.rut}
          />
        </Col>
        <Col xs={12} md={ancho}>
          <CampoFormulario
            id="fechaNacimiento"
            etiqueta="Fecha de nacimiento"
            tipo="date"
            valor={valores.fechaNacimiento}
            onChange={formulario.manejarCambio}
          />
        </Col>
        <Col xs={12} md={ancho}>
          <CampoFormulario
            id="nombre"
            etiqueta="Nombre"
            maxLength={50}
            requerido
            valor={valores.nombre}
            onChange={formulario.manejarCambio}
            error={errores.nombre}
          />
        </Col>
        <Col xs={12} md={ancho}>
          <CampoFormulario
            id="apellido"
            etiqueta="Apellido"
            maxLength={100}
            requerido
            valor={valores.apellido}
            onChange={formulario.manejarCambio}
            error={errores.apellido}
          />
        </Col>
      </Row>
      <CampoFormulario
        id="correo"
        etiqueta="Correo electrónico"
        tipo="email"
        placeholder="usuario@duoc.cl"
        maxLength={LARGO_MAXIMO_CORREO}
        requerido
        valor={valores.correo}
        onChange={formulario.manejarCambio}
        error={errores.correo}
      />
      <CampoFormulario
        id="contrasena"
        etiqueta="Contraseña"
        tipo="password"
        placeholder="Entre 4 y 10 caracteres"
        maxLength={LARGO_MAXIMO_CLAVE}
        requerido
        valor={valores.contrasena}
        onChange={formulario.manejarCambio}
        error={errores.contrasena}
      />
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
      {!props.ocultarRol && (
        <CampoFormulario
          id="rol"
          etiqueta="Rol"
          tipo="select"
          placeholder="Selecciona el rol"
          requerido
          opciones={props.roles}
          valor={valores.rol}
          onChange={formulario.manejarCambio}
          error={errores.rol}
        />
      )}
    </>
  )
}
