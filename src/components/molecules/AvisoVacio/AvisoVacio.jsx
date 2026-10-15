import { Boton } from '../../atoms/Boton/Boton'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'

export function AvisoVacio(props) {
  return (
    <div className="text-center py-5">
      <Titulo nivel={1} className="h3 fw-bold mb-3">
        {props.titulo}
      </Titulo>
      {props.texto && <Texto className="text-muted mb-4">{props.texto}</Texto>}
      <Boton onClick={props.onAccion}>{props.textoBoton ?? 'Volver'}</Boton>
    </div>
  )
}
