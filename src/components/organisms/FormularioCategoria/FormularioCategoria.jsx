import { Card, Form } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { useFormulario } from '../../../hooks/useFormulario'
import { generarValor } from '../../../utils/formato'
import { LARGO_MAXIMO_CATEGORIA, validarCategoria } from '../../../utils/validaciones'

// Formulario compartido para crear y editar categorías.
// textoInicial: el nombre actual (al editar); valorFijo: el valor que no cambia al editar
// valorEnUso(valor): indica si ese valor ya pertenece a otra categoría
// onEnviar(texto): recibe el nombre validado y sin espacios sobrantes
export function FormularioCategoria(props) {
  const formulario = useFormulario({ texto: props.textoInicial ?? '' })
  const texto = formulario.valores.texto

  // al crear, la dirección se arma con el nombre; al editar, se mantiene la original
  const valor = props.valorFijo ?? generarValor(texto)

  function manejarEnvio(evento) {
    evento.preventDefault()
    const error = validarCategoria(texto, props.valorEnUso)
    formulario.setErrores({ texto: error })
    if (error !== '') return
    props.onEnviar(texto.trim())
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <Titulo nivel={2} className="h3 fw-bold mb-4 text-primary">
          {props.titulo}
        </Titulo>
        <Form noValidate onSubmit={manejarEnvio}>
          <CampoFormulario
            id="texto"
            etiqueta="Nombre de la categoría"
            placeholder="Ej: Instrumentos de viento"
            maxLength={LARGO_MAXIMO_CATEGORIA}
            requerido
            valor={texto}
            onChange={formulario.manejarCambio}
            error={formulario.errores.texto}
            className="mb-1"
          />
          <Form.Text className="d-block mb-4 text-muted">
            Dirección en la tienda: /categoria/{valor || '...'}
            {props.valorFijo && ' (no cambia al editar, para no romper los productos ni los enlaces)'}
          </Form.Text>

          <div className="d-flex justify-content-between align-items-center">
            <Boton variante="outline-secondary" onClick={props.onCancelar}>
              Cancelar
            </Boton>
            <Boton variante="success" tipo="submit" className="px-4">
              Guardar Categoría
            </Boton>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
