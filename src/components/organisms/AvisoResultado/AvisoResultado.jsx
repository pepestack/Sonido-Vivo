import { Boton } from '../../atoms/Boton/Boton'
import { Icono } from '../../atoms/Icono/Icono'
import { Texto } from '../../atoms/Texto/Texto'
import { Titulo } from '../../atoms/Titulo/Titulo'

// Organismo: pantalla completa de resultado (compra rechazada, página no encontrada, etc.)
// icono y colorIcono son opcionales (ej. "bi bi-x-circle-fill" y "text-danger")
// detalle: segunda línea en gris, opcional
// textoBoton + onAccion: acción principal; textoSecundario + onSecundario: acción opcional a la izquierda
export function AvisoResultado(props) {
  return (
    <section className="text-center py-5">
      {props.icono && <Icono icono={props.icono} className={`${props.colorIcono ?? ''} display-4 d-block mb-3`} />}
      <Titulo nivel={1} className="h3 fw-bold">
        {props.titulo}
      </Titulo>
      <Texto className={`fs-5 ${props.detalle ? 'mb-2' : 'mb-4'}`}>{props.texto}</Texto>
      {props.detalle && <Texto className="text-muted mb-4">{props.detalle}</Texto>}
      <div className="d-flex flex-wrap justify-content-center gap-2">
        {props.textoSecundario && (
          <Boton variante="outline-secondary" onClick={props.onSecundario}>
            {props.textoSecundario}
          </Boton>
        )}
        <Boton onClick={props.onAccion}>{props.textoBoton}</Boton>
      </div>
    </section>
  )
}
