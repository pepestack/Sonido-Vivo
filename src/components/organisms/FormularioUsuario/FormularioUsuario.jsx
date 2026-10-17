import { Card, Col, Form, Row } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { useFormulario } from '../../../hooks/useFormulario'
import { comunasDe, regiones } from '../../../data/ubicaciones'
import { roles } from '../../../utils/roles'
import {
  sinErrores,
  validarCorreoPermitido,
  validarLargoMaximo,
  validarObligatorio,
  validarRut,
} from '../../../utils/validaciones'

const usuarioVacio = {
  rut: '',
  nombre: '',
  apellido: '',
  fechaNacimiento: '',
  correo: '',
  region: '',
  comuna: '',
  direccion: '',
  rol: '',
}

// Formulario compartido para crear y editar usuarios.
// rutEnUso(rut): indica si el RUT ya pertenece a otro usuario
// onEnviar(usuario): recibe el usuario validado y sin espacios sobrantes
export function FormularioUsuario({
  titulo,
  valoresIniciales = usuarioVacio,
  rutEnUso = () => false,
  onEnviar,
  onCancelar,
  textoCancelar = 'Cancelar',
}) {
  const formulario = useFormulario(valoresIniciales)
  const valores = formulario.valores
  const errores = formulario.errores

  // la comuna depende de la región: al cambiar de región se borra la comuna elegida
  function manejarRegion(evento) {
    const region = evento.target.value
    formulario.setValores((actuales) => ({ ...actuales, region, comuna: '' }))
    formulario.setErrores((actuales) => ({ ...actuales, region: '', comuna: '' }))
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const rut = valores.rut.trim()
    const nuevos = {
      rut: validarRut(rut) || (rutEnUso(rut) ? 'Ya existe un usuario con este RUN' : ''),
      nombre: validarObligatorio(valores.nombre, 'El nombre es requerido') || validarLargoMaximo(valores.nombre, 50),
      apellido: validarObligatorio(valores.apellido, 'El apellido es requerido') || validarLargoMaximo(valores.apellido, 100),
      correo: validarCorreoPermitido(valores.correo),
      region: validarObligatorio(valores.region, 'Selecciona una región'),
      comuna: validarObligatorio(valores.comuna, 'Selecciona una comuna'),
      direccion: validarObligatorio(valores.direccion, 'La dirección es requerida') || validarLargoMaximo(valores.direccion, 300),
      rol: validarObligatorio(valores.rol, 'Selecciona un rol'),
    }
    formulario.setErrores(nuevos)
    if (!sinErrores(nuevos)) return

    onEnviar({
      ...valores,
      rut,
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      correo: valores.correo.trim(),
      direccion: valores.direccion.trim(),
    })
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <Titulo nivel={2} className="h3 fw-bold mb-4 text-primary">
          {titulo}
        </Titulo>
        <Form noValidate onSubmit={manejarEnvio}>
          <Row>
            <Col md={6}>
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
            <Col md={6}>
              <CampoFormulario
                id="fechaNacimiento"
                etiqueta="Fecha de nacimiento"
                tipo="date"
                valor={valores.fechaNacimiento}
                onChange={formulario.manejarCambio}
              />
            </Col>
            <Col md={6}>
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
            <Col md={6}>
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
            requerido
            valor={valores.correo}
            onChange={formulario.manejarCambio}
            error={errores.correo}
          />
          <Row>
            <Col md={6}>
              <CampoFormulario
                id="region"
                etiqueta="Región"
                tipo="select"
                placeholder="Selecciona la región"
                requerido
                opciones={regiones}
                valor={valores.region}
                onChange={manejarRegion}
                error={errores.region}
              />
            </Col>
            <Col md={6}>
              <CampoFormulario
                id="comuna"
                etiqueta="Comuna"
                tipo="select"
                placeholder={valores.region ? 'Selecciona la comuna' : 'Primero elige una región'}
                requerido
                deshabilitado={!valores.region}
                opciones={comunasDe(valores.region)}
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
          <CampoFormulario
            id="rol"
            etiqueta="Rol"
            tipo="select"
            placeholder="Selecciona el rol"
            requerido
            opciones={roles}
            valor={valores.rol}
            onChange={formulario.manejarCambio}
            error={errores.rol}
          />

          <div className="d-flex justify-content-between align-items-center mt-4">
            <Boton variante="outline-secondary" onClick={onCancelar}>
              {textoCancelar}
            </Boton>
            <Boton variante="success" tipo="submit" className="px-4">
              Guardar Usuario
            </Boton>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
