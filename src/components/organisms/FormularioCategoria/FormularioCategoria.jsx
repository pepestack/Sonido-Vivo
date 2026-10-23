import { Form } from 'react-bootstrap'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { TarjetaFormulario } from '../../molecules/TarjetaFormulario/TarjetaFormulario'
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
    <TarjetaFormulario
      titulo={props.titulo}
      textoGuardar="Guardar Categoría"
      onEnviar={manejarEnvio}
      onCancelar={props.onCancelar}
    >
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
      <Form.Text className="d-block text-muted">
        Dirección en la tienda: /categoria/{valor || '...'}
        {props.valorFijo && ' (no cambia al editar, para no romper los productos ni los enlaces)'}
      </Form.Text>
    </TarjetaFormulario>
  )
}
