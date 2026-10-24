import { Card, Col, Form, Row } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { CamposDireccion } from '../CamposDireccion/CamposDireccion'
import { useFormulario } from '../../../hooks/useFormulario'
import { checkoutVacio, TARJETA_RECHAZADA } from '../../../data/pedidos'
import { formatoDinero } from '../../../utils/formato'
import { LARGO_MAXIMO_CORREO, sinEspacios, sinErrores, validarCheckout } from '../../../utils/validaciones'

// Organismo: datos de la persona, entrega y pago simulado.
// valoresIniciales: datos para autocompletar (el usuario con sesión); se mezclan sobre checkoutVacio
// regiones, comunasDe(region) y tiposEntrega llegan por props; total: monto que muestra el botón
// onCambiarEntrega(tipo): avisa a la página para recalcular el despacho
// onEnviar(datos, numeroTarjeta): solo se llama cuando todo es válido
export function FormularioCheckout(props) {
  const formulario = useFormulario({ ...checkoutVacio, ...props.valoresIniciales })
  const valores = formulario.valores
  const errores = formulario.errores
  const conDespacho = valores.tipoEntrega !== 'retiro'

  function manejarEntrega(evento) {
    formulario.manejarCambio(evento)
    props.onCambiarEntrega(evento.target.value)
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = validarCheckout(valores)
    formulario.setErrores(nuevos)
    if (!sinErrores(nuevos)) return

    const entrega = conDespacho
      ? { tipo: 'despacho', region: valores.region, comuna: valores.comuna, direccion: valores.direccion.trim() }
      : { tipo: 'retiro' }
    props.onEnviar(
      {
        cliente: { nombre: valores.nombre.trim(), apellido: valores.apellido.trim(), correo: valores.correo.trim() },
        entrega,
      },
      sinEspacios(valores.numeroTarjeta),
    )
  }

  return (
    <Card className="shadow p-4">
      <Form noValidate onSubmit={manejarEnvio}>
        <Titulo nivel={2} className="h5 fw-bold mb-3">Datos personales</Titulo>
        <Row>
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6}>
            <CampoFormulario
              id="apellido"
              etiqueta="Apellidos"
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
          placeholder="tucorreo@gmail.com"
          maxLength={LARGO_MAXIMO_CORREO}
          requerido
          valor={valores.correo}
          onChange={formulario.manejarCambio}
          error={errores.correo}
        />

        <Titulo nivel={2} className="h5 fw-bold mt-4 mb-3">Entrega</Titulo>
        <CampoFormulario
          id="tipoEntrega"
          etiqueta="¿Cómo quieres recibir tu compra?"
          tipo="select"
          requerido
          opciones={props.tiposEntrega}
          valor={valores.tipoEntrega}
          onChange={manejarEntrega}
          error={errores.tipoEntrega}
        />
        {conDespacho ? (
          <CamposDireccion formulario={formulario} regiones={props.regiones} comunasDe={props.comunasDe} />
        ) : (
          <Texto className="text-muted">
            Retiras en nuestra tienda de Viña del Mar presentando tu número de pedido. El retiro no tiene costo.
          </Texto>
        )}

        <Titulo nivel={2} className="h5 fw-bold mt-4 mb-3">Pago</Titulo>
        <Row>
          <Col xs={12} md={6}>
            <CampoFormulario
              id="numeroTarjeta"
              etiqueta="Número de tarjeta"
              placeholder="4111 1111 1111 1111"
              maxLength={19}
              requerido
              valor={valores.numeroTarjeta}
              onChange={formulario.manejarCambio}
              error={errores.numeroTarjeta}
            />
          </Col>
          <Col xs={6} md={3}>
            <CampoFormulario
              id="vencimiento"
              etiqueta="Vencimiento"
              placeholder="MM/AA"
              maxLength={5}
              requerido
              valor={valores.vencimiento}
              onChange={formulario.manejarCambio}
              error={errores.vencimiento}
            />
          </Col>
          <Col xs={6} md={3}>
            <CampoFormulario
              id="cvv"
              etiqueta="CVV"
              tipo="password"
              placeholder="123"
              maxLength={3}
              requerido
              valor={valores.cvv}
              onChange={formulario.manejarCambio}
              error={errores.cvv}
            />
          </Col>
        </Row>
        <Texto className="small text-muted">
          Pago simulado: cualquier tarjeta de 16 dígitos es aprobada, salvo la {TARJETA_RECHAZADA}, que siempre es rechazada.
        </Texto>

        <Boton variante="success" tipo="submit" className="w-100 mt-2">
          Pagar {formatoDinero(props.total)}
        </Boton>
      </Form>
    </Card>
  )
}
