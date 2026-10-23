import { Boton } from '../../atoms/Boton/Boton'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'

// Aviso centrado cuando no hay nada que mostrar. titulo y botón son opcionales:
// el botón solo aparece si llega onAccion (ej. listas vacías: solo el texto)
export function AvisoVacio(props) {
  return (
    <div className="text-center py-5">
      {props.titulo && (
        <Titulo nivel={1} className="h3 fw-bold mb-3">
          {props.titulo}
        </Titulo>
      )}
      {props.texto && <Texto className={`text-muted ${props.onAccion ? 'mb-4' : 'mb-0'}`}>{props.texto}</Texto>}
      {props.onAccion && <Boton onClick={props.onAccion}>{props.textoBoton ?? 'Volver'}</Boton>}
    </div>
  )
}
