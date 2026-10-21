import { Col, Row } from 'react-bootstrap'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { CamposDireccion } from '../CamposDireccion/CamposDireccion'
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
      <CamposDireccion
        formulario={formulario}
        regiones={props.regiones}
        comunasDe={props.comunasDe}
        compacto={props.compacto}
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
